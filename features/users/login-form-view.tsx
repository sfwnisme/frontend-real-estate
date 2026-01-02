"use client";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "@/components/custom/title";
import { login } from "@/lib/actions";
import InputWrapper from "@/components/custom/input-wrapper";
import useFormErrors from "@/hooks/use-form-errors";

type Props = {};
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(5, "Minimum required characters is 6"),
});
type UserLoginType = z.infer<typeof loginSchema>;

export default function LoginFormView({}: Props) {
  const [isLogin, startLogin] = useTransition();
  const form = useForm<UserLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    criteriaMode: "all",
  });

  const rootErrors = useFormErrors(form.formState.errors.root, true);

  const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
    startLogin(async () => {
      const { email, password } = values;
      const loginResponse = await login(email, password);
      console.log("login resonse :", loginResponse);
      if (!loginResponse.data) {
        form.setError("root", { message: loginResponse.msg });
      } else {
        window.location.pathname = "/dashboard";
      }
    });
  };
  console.log(form.formState.errors.root?.message);
  const formErrors = form.formState.errors;
  const canLogin = form.formState.isValid;
  return (
    <div>
      <Title title="Login"></Title>
      <div className="pb-4" />
      <div className="w-full max-w-md border p-8 rounded mx-auto shadow-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-5">
          <InputWrapper
            title="Email"
            error={form.formState.errors.email?.message}
          >
            <Input
              type="email"
              placeholder="safwanmabdo@gmail.com"
              {...form.register("email")}
            />
          </InputWrapper>
          <InputWrapper
            title="Password"
            error={form.formState.errors.password?.message}
          >
            <Input
              type="password"
              placeholder="******"
              {...form.register("password")}
            />
          </InputWrapper>
          <Button type="submit" className="w-full mt-4" disabled={!canLogin}>
            {isLogin && <LoadingSpinner />}Login
          </Button>
          {rootErrors}
        </form>
      </div>
    </div>
  );
}
