"use client";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import useCreatePropertyWithImagesFormValidation from "../../hooks/use-create-property-with-images-form-validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CreatePropertyImagesFormView from "./create-property-images-form-view";
import FieldSet from "@/components/custom/field-set";
import { useTranslations } from "next-intl";

const CreatePropertyWithImagesFormView = () => {
  const t = useTranslations("common.form.labels")
  const tSections = useTranslations("common.form.sections")
  const tDescs = useTranslations("common.form.descriptions")
  const tActions = useTranslations("common.actions")
  const { form, onSubmit, isPending } =
    useCreatePropertyWithImagesFormValidation();
  const formErrors = form.formState.errors;
  const globalFormError = formErrors.root?.message;

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-4 flex-1 w-full lg:min-w-[500px]"
      >
        <FieldSet
          title={tSections("propertyDetails")}
          description={tDescs("propertyDetails")}
          childrenClassName="grid gap-4 grid-cols-2"
          className="col-span-full"
        >
          <InputWrapper
            title={t("title")}
            error={formErrors.title?.message}
            className="col-span-full"
            name="title"
          >
            <Input type="text" {...form.register("title")} />
          </InputWrapper>

          <InputWrapper
            title={t("description")}
            description="property description at lease 5 characters"
            error={formErrors.description?.message}
            className="col-span-full"
          >
            <Textarea id="description" {...form.register("description")} />
          </InputWrapper>
          <InputWrapper
            title={t("price")}
            error={formErrors.price?.message}
            className=""
          >
            <Input type="number" id="price" {...form.register("price")} />
          </InputWrapper>
          <InputWrapper
            title={t("propertySize")}
            error={formErrors.propertySize?.message}
          >
            <Input
              type="number"
              id="propertySize"
              {...form.register("propertySize")}
            />
          </InputWrapper>
        </FieldSet>
        <FieldSet
          title={tSections("specifications")}
          description={tDescs("specifications")}
          childrenClassName="grid grid-cols-2 gap-4"
          className="col-span-full sm:col-span-1"
        >
          <InputWrapper title={t("bedrooms")} error={formErrors.bedrooms?.message}>
            <Input type="number" id="bedrooms" {...form.register("bedrooms")} />
          </InputWrapper>
          <InputWrapper title={t("bathrooms")} error={formErrors.bathrooms?.message}>
            <Input
              type="number"
              id="bathrooms"
              {...form.register("bathrooms")}
            />
          </InputWrapper>
          <InputWrapper title={t("garage")} error={formErrors.garage?.message}>
            <Input type="number" id="garage" {...form.register("garage")} />
          </InputWrapper>
          <InputWrapper
            title={t("garageSize")}
            error={formErrors.garageSize?.message}
          >
            <Input
              type="number"
              id="garageSize"
              {...form.register("garageSize")}
            />
          </InputWrapper>
          <InputWrapper
            title={t("yearBuilt")}
            error={formErrors.yearBuilt?.message}
            className="col-span-full"
          >
            <Input
              type="number"
              id="yearBuilt"
              {...form.register("yearBuilt")}
            />
          </InputWrapper>
        </FieldSet>
        <FieldSet
          title={tSections("classification")}
          description={tDescs("classification")}
          childrenClassName="grid gap-4"
          className="col-span-full sm:col-span-1"
        >
          <InputWrapper title={t("type")} error={formErrors.propertyType?.message}>
            <Controller
              name="propertyType"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name="propertyType"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PROPERTY_TYPE).map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </InputWrapper>
          <InputWrapper
            title={t("status")}
            error={formErrors.propertyStatus?.message}
          >
            <Controller
              name="propertyStatus"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name="propertyStatus"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("status")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PROPERTY_STATUS).map((status) => (
                      <SelectItem value={status} key={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </InputWrapper>
          <Label className="flex items-start gap-3 rounded-lg cursor-pointer">
            <Checkbox
              name="hide"
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
              onCheckedChange={(value: boolean) => form.setValue("hide", value)}
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                Hide property listing
              </p>
              <small className="text-muted-foreground">
                Hide this property form public listing
              </small>
            </div>
          </Label>
        </FieldSet>
        <FieldSet
          title={tSections("address")}
          description={tDescs("address")}
          className="col-span-full"
          childrenClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
        >
          <InputWrapper
            title={t("state")}
            error={formErrors.address?.state?.message}
          >
            <Input
              type="text"
              id="address.state"
              {...form.register("address.state")}
            />
          </InputWrapper>
          <InputWrapper title={t("city")} error={formErrors.address?.city?.message}>
            <Input
              type="text"
              id="address.city"
              {...form.register("address.city")}
            />
          </InputWrapper>
          <InputWrapper title={t("area")} error={formErrors.address?.area?.message}>
            <Input
              type="text"
              id="address.area"
              {...form.register("address.area")}
            />
          </InputWrapper>
          <InputWrapper
            title={t("zipCode")}
            error={formErrors.address?.zipCode?.message}
          >
            <Input
              type="text"
              id="address.zipCode"
              {...form.register("address.zipCode")}
            />
          </InputWrapper>
          <InputWrapper
            title={t("other")}
            error={formErrors.address?.other?.message}
            className="col-span-full sm:col-span-2 lg:col-span-2"
          >
            <Input
              type="text"
              id="address.other"
              {...form.register("address.other")}
            />
          </InputWrapper>
        </FieldSet>
        <FieldSet
          title={tSections("moreInformation")}
          description={tDescs("moreInformation")}
          childrenClassName="grid gap-4"
          className="col-span-full"
        >
          <InputWrapper
            title={t("features")}
            description={tDescs("features")}
            disableError
          >
            <Input type="text" id="features" {...form.register("features")} />
          </InputWrapper>
          <InputWrapper
            title={t("video")}
            error={formErrors.video?.message}
            disableError
            description={tDescs("video")}
          >
            <Input
              type="text"
              id="video"
              {...form.register("video")}
              placeholder="https://www.youtube.com/embed/videoCodeHere"
            />
          </InputWrapper>
        </FieldSet>
        <Alert
          variant="destructive"
          className={cn(
            "invisible col-span-full",
            typeof globalFormError === "string" &&
              globalFormError !== "" &&
              "visible"
          )}
        >
          <AlertDescription>{globalFormError}</AlertDescription>
        </Alert>
        <Button
          type="submit"
          className="w-full col-span-full hidden lg:block"
          disabled={isPending || !form.formState.isValid}
        >
        {isPending ? tActions("creating") : tActions("create")}
        </Button>
        <DevTool control={form.control} />
      </form>
      <div className="w-full lg:max-w-[400px]">
        <FieldSet
          title={tSections("images")}
          description={tDescs("images")}
          childrenClassName="grid gap-4"
          className="col-span-full"
        >
          <CreatePropertyImagesFormView form={form} />
        </FieldSet>
      </div>
      <Button
        type="submit"
        className="w-full block lg:hidden"
        disabled={isPending || !form.formState.isValid}
        onClick={onSubmit}
      >
        {isPending ? tActions("creating") : tActions("create")}
      </Button>
    </div>
  );
};
export default CreatePropertyWithImagesFormView;
