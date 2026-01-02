
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserSchema, UpdateUserInputType, UpdateUserType } from "../schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATUS_TEXT } from "@/constants/enums";
import { updateUser } from "../lib/actions";
import { toast } from "sonner";
import { User } from "@/types/types";

export default function useUpdateUserFormValidation(user: User) {
  const {_id: userId, name, email, role} = user;
  const [isCreating, startCreating] = useTransition();
  const form = useForm<UpdateUserInputType, unknown, UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name,
      email,
      role,
    },
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<UpdateUserType> = (values) => {
    startCreating(async () => {
      try {
        const updateUserRes = await updateUser(values,userId);
        if (updateUserRes.statusText !== STATUS_TEXT.SUCCESS) {
          form.setError(updateUserRes.msg.field || "root", {
            message: updateUserRes.msg.msg || updateUserRes.msg,
          });
          toast.error(
            typeof updateUserRes.msg === "string"
              ? updateUserRes.msg
              : updateUserRes.msg?.msg || "Something went wrong"
          );
          return;
        }
        toast.success(updateUserRes.msg);
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
