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

import { USER_ROLES, USER_ROLES_READABLE } from "@/constants/enums";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FieldSet from "@/components/custom/field-set";
import useCreateUserFormValidation from "../../hooks/use-create-user-form-validation";
import useErrorMessage from "@/features/dashboard/hooks/use-error-message";

const CreateUserFormView = () => {
  const { form, onSubmit, isPending } = useCreateUserFormValidation();
  const formErrors = form.formState.errors;
  const globalFormError = formErrors.root?.message;
  console.log(globalFormError);
  const globalError = useErrorMessage(form.formState.errors.root?.message);

  return (
    <div className="">
      <form onSubmit={onSubmit} className="grid w-full lg:min-w-[500px]">
        <FieldSet
          title="User details"
          description="Update the details of the user"
          childrenClassName="grid gap-4 grid-cols-2"
        >
          <InputWrapper
            title="Name"
            error={formErrors.name?.message}
            className="col-span-full"
            name="name"
          >
            <Input type="text" {...form.register("name")} />
          </InputWrapper>

          <InputWrapper
            title="Email"
            description="user email at lease 5 characters"
            error={formErrors.email?.message}
            className="col-span-full"
          >
            <Input type="email" id="email" {...form.register("email")} />
          </InputWrapper>
          <InputWrapper
            title="Password"
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
            title="Type"
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
                    <SelectValue placeholder="Role" />
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
          {isPending ? "Creating..." : "Create"}
        </Button>
        <DevTool control={form.control} />
      </form>
    </div>
  );
};
export default CreateUserFormView;
