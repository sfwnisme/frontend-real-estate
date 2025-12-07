import { create } from "domain";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserSchema, CreateUserType } from "../schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_TEXT, USER_ROLES } from "@/constants/enums";
import { createUser } from "../lib/requests";
import { toast } from "sonner";

export default function useCreateUserFormValidation() {
  const [isCreating, startCreating] = useTransition();
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: USER_ROLES.VIEW_ONLY,
    },
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<CreateUserType> = (values) => {
    startCreating(async () => {
      try {
        const createUserRes = await createUser(values);
        if (createUserRes.statusText !== STATUS_TEXT.SUCCESS) {
          form.setError(createUserRes.msg.field || "root", {
            message: createUserRes.msg.msg || createUserRes.msg,
          });
          toast.error(
            typeof createUserRes.msg === "string"
              ? createUserRes.msg
              : createUserRes.msg?.msg || "Something went wrong"
          );
          return;
        }
        toast.success(createUserRes.msg);
        form.reset();
      } catch (error) {
        console.error(error);
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending: isCreating,
  };
}
