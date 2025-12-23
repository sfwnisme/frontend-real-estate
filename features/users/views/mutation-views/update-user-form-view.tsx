"use client";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { USER_ROLES, USER_ROLES_READABLE } from "@/constants/enums";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import FieldSet from "@/components/custom/field-set";
import useUpdateUserFormValidation from "../../hooks/use-update-user-form-validation";
import useErrorMessage from "@/features/dashboard/hooks/use-error-message";
import { User } from "@/types/types";

type Props = {
  user: User
}

const UpdateUserFormView = ({user}: Props) => {
  const t = useTranslations("common.form.labels");
  const tActions = useTranslations("common.actions");
  const tDescs = useTranslations("common.form.descriptions");
  const tSections = useTranslations("common.form.sections");
  const tPlaceholders = useTranslations("common.form.placeholders");
  const { form, onSubmit, isPending } = useUpdateUserFormValidation(user);
  const formErrors = form.formState.errors;
  const globalError = useErrorMessage(form.formState.errors.root?.message);

  return (
    <div className="">
      <form onSubmit={onSubmit} className="grid w-full lg:min-w-[500px]">
        <FieldSet
          title={tSections("userDetails")}
          description={tDescs("updateUserDetails")}
          childrenClassName="grid gap-4 grid-cols-2"
        >
          <InputWrapper
            title={t("name")}
            error={formErrors.name?.message}
            className="col-span-full"
            name="name"
          >
            <Input type="text" {...form.register("name")} />
          </InputWrapper>

          <InputWrapper
            title={t("email")}
            description={tDescs("email")}
            error={formErrors.email?.message}
            className="col-span-full"
          >
            <Input type="email" id="email" {...form.register("email")} />
          </InputWrapper>
          <InputWrapper
            title={t("password")}
            error={formErrors.password?.message}
            className="max-md:col-span-full"
          >
            <Input
              type="password"
              id="password"
              {...form.register("password")}
            />
          </InputWrapper>

          <InputWrapper
            title={t("role")}
            error={formErrors.role?.message}
            className="max-md:col-span-full"
          >
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name="role"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={tPlaceholders("role")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(USER_ROLES).map((role) => (
                      <SelectItem
                        value={role}
                        key={role}
                        className="capitalize"
                      >
                        {USER_ROLES_READABLE[role]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </InputWrapper>
        </FieldSet>
        {globalError}
        <Button
          type="submit"
          className="w-full col-span-full"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? tActions("updating") : tActions("update")}
        </Button>
        <DevTool control={form.control} />
      </form>
    </div>
  );
};
export default UpdateUserFormView;
