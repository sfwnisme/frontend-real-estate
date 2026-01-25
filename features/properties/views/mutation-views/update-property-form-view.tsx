"use client";
import { memo, useCallback } from "react";
import { DevTool } from "@hookform/devtools";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Property, PropertyStatus, PropertyType } from "@/types/types";
import useUpdatePropertyFormValidation from "../../hooks/use-update-property-form-validation";
import FieldSet from "@/components/custom/field-set";
import LoadingSpinner from "@/components/custom/loading-spinner";
import RichTextEditor from "@/components/rich-text-editor";

type Props = {
  property: Property;
};

const UpdatePropertyFormView = (props: Props) => {
  const { property } = props;
  const t = useTranslations("common.form.labels");
  const tActions = useTranslations("common.actions");
  const tDescs = useTranslations("common.form.descriptions");
  const tSections = useTranslations("common.form.sections");
  const tPlaceholders = useTranslations("common.form.placeholders");
  const tPropertyTypes = useTranslations("common.propertyTypes");
  const tPropertyStatus = useTranslations("common.propertyStatus");
  const { form, onSubmit, isPending } =
    useUpdatePropertyFormValidation(property);
  const formErrors = form.formState.errors;
  const globalError = form.formState.errors.root?.message;

  const isValueChanged = form.formState.isDirty;
  const isValid = form.formState.isValid;
  const canUpdate = isValueChanged && isValid && !isPending;
  console.log("TRIGGER: property-form");

  const content = form.getValues("description") ?? "";
  const onRichTextEditorChange = useCallback(
    (value: string) => {
      form.setValue("description", value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form.setValue],
  );

  return (
    <div>
      <form onSubmit={onSubmit} className="grid lg:gap-4">
        <div
          className="grid grid-cols-2 gap-4"
          group-data="main-property-information"
        >
          <div className="col-span-full">
            <FieldSet
              title={tSections("propertyDetails")}
              description={tDescs("updatePropertyDetails")}
              childrenClassName="grid gap-4 grid-cols-2"
            >
              <InputWrapper
                title={t("title")}
                error={formErrors.title?.message}
                className="col-span-full"
                name="title"
              >
                <Input type="text" {...form.register("title")} />
              </InputWrapper>
              <div className="col-span-full">
                <RichTextEditor
                  content={content}
                  onChange={onRichTextEditorChange}
                />
              </div>
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
          </div>
          <div className="col-span-full sm:col-span-1">
            <FieldSet
              title={tSections("specifications")}
              description={tDescs("updateSpecifications")}
              childrenClassName="grid grid-cols-2 gap-4"
            >
              <InputWrapper
                title={t("bedrooms")}
                error={formErrors.bedrooms?.message}
              >
                <Input
                  type="number"
                  id="bedrooms"
                  {...form.register("bedrooms")}
                />
              </InputWrapper>
              <InputWrapper
                title={t("bathrooms")}
                error={formErrors.bathrooms?.message}
              >
                <Input
                  type="number"
                  id="bathrooms"
                  {...form.register("bathrooms")}
                />
              </InputWrapper>
              <InputWrapper
                title={t("garage")}
                error={formErrors.garage?.message}
              >
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
          </div>
          <FieldSet
            title={tSections("classification")}
            description={tDescs("updateClassification")}
            childrenClassName="grid gap-4"
            className="col-span-full sm:col-span-1"
          >
            <InputWrapper
              title={t("type")}
              error={formErrors.propertyType?.message}
            >
              <Select
                value={form.getValues("propertyType")}
                onValueChange={(v: PropertyType) => {
                  form.setValue("propertyType", v, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
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
            </InputWrapper>
            <InputWrapper
              title={t("status")}
              error={formErrors.propertyStatus?.message}
            >
              <Select
                value={form.getValues("propertyStatus")}
                onValueChange={(v: PropertyStatus) => {
                  form.setValue("propertyStatus", v, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
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
            </InputWrapper>
            <Label className="flex items-start gap-3 rounded-lg cursor-pointer">
              <Checkbox
                name="hide"
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                onCheckedChange={(value: boolean) =>
                  form.setValue("hide", value)
                }
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  {t("hidePropertyListing")}
                </p>
                <small className="text-muted-foreground">
                  {tDescs("hidePropertyFormPublicListing")}
                </small>
              </div>
            </Label>
          </FieldSet>
          <FieldSet
            title={tSections("address")}
            description={tDescs("updateAddress")}
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
            <InputWrapper
              title={t("city")}
              error={formErrors.address?.city?.message}
            >
              <Input
                type="text"
                id="address.city"
                {...form.register("address.city")}
              />
            </InputWrapper>
            <InputWrapper
              title={t("area")}
              error={formErrors.address?.area?.message}
            >
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
            description={tDescs("updateMoreInformation")}
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
        </div>
        <Alert
          variant="destructive"
          className={cn(
            "invisible",
            typeof globalError === "string" && globalError !== "" && "visible",
          )}
        >
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
        <Button type="submit" className="w-full" disabled={!canUpdate}>
          {isPending && <LoadingSpinner />}
          {tActions("updatePropertyDetails")}
        </Button>
        <DevTool control={form.control} />
      </form>
    </div>
  );
};
export default memo(UpdatePropertyFormView);
