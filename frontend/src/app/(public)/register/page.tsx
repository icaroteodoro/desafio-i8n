"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { registerSchema } from "@/types/user-types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/services/user-service";

import { useRouter } from 'next/compat/router';


type LoginFormData = z.infer<typeof registerSchema>;

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [errorPass, setErrorPass] = useState(false);
  const [emailAlredyExists, setEmailAlredyExists] = useState(false);

  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleConfirmPass, setVisibleConfirmPass] = useState(false);
  const changeVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  const changeVisibleConfirmPass = () => {
    setVisibleConfirmPass(!visibleConfirmPass);
  };

  const onSubmit = async (data: LoginFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorPass(true);
      return;
    }

    const result = await createUser(data);

    if (result.success) {
      router?.push("/home");
    } else {
      setEmailAlredyExists(true);
      return;
    }

    window.location.href = "/home";
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-zinc-100">
      <div className="bg-white w-80 rounded-md p-5">

        <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <label className="text-sm" htmlFor="email">
              Nome
            </label>
            <Input type="text" {...register("name")} id="name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-sm" htmlFor="email">
              E-mail
            </label>
            <Input type="email" {...register("email")} id="email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {emailAlredyExists ? (
              <p className="text-red-500 text-sm">
                O e-mail já foi cadastrado!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-sm" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={visiblePass ? "text" : "password"}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <Button
                type="button"
                onClick={() => changeVisiblePass()}
                className="bg-transparent hover:bg-transparent absolute right-1 top-[50%] translate-y-[-50%] text-zinc-400"
              >
                {visiblePass ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="confirmPassword">
              Confirme sua senha
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={visibleConfirmPass ? "text" : "password"}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
              {errorPass ? (
                <p className="text-red-500 text-sm">
                  As senhas devem ser iguais
                </p>
              ) : (
                ""
              )}
              <Button
                type="button"
                onClick={() => changeVisibleConfirmPass()}
                className="bg-transparent hover:bg-transparent absolute right-1 top-[50%] translate-y-[-50%] text-zinc-400"
              >
                {visibleConfirmPass ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full mt-5 hover:cursor-pointer">
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white border-t-primary rounded-full animate-spin"></div>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>

        <div className="flex items-center justify-between mb-5">
          <div className="bg-zinc-300 h-0.5 w-28 rounded-2xl"></div>
          <p className="text-sm">Ou</p>
          <div className="bg-zinc-300 h-0.5 w-28 rounded-2xl"></div>
        </div>
        <Link href="/login">
          <Button className="w-full  bg-white hover:bg-zinc-100 text-black shadow-none hover:cursor-pointer">
            Fazer login
          </Button>
        </Link>
      </div>
    </section>
  );
}
