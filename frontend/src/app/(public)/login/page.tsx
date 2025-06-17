"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/user-types";
import { login } from "@/services/user-service";




type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [authError, setAuthError] = useState('');

  const [visiblePass, setVisiblePass] = useState(false);
  const changeVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      return await login(data);
    }catch(err) {
      setAuthError('Usuário ou senha incorretos!');
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-zinc-100">
      <div className="bg-white w-80 rounded-md p-5">
        <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <label className="text-sm" htmlFor="email">
              E-mail
            </label>
            <Input type="email" {...register("email")} id="email" />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-3">
            <label className="text-sm" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={visiblePass ? 'text' : 'password'}
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
            {authError && (
                <p className="text-red-500 text-sm">
                  {authError}
                </p>
              )}
          </div>
          <Button
            type="submit"
            className="w-full mt-5 hover:cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white border-t-primary rounded-full animate-spin"></div>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <div className="flex items-center justify-between mb-5">
          <div className="bg-zinc-300 h-0.5 w-28 rounded-2xl"></div>
          <p className="text-sm">Ou</p>
          <div className="bg-zinc-300 h-0.5 w-28 rounded-2xl"></div>
        </div>
        <Link href="/register">
          <Button className="w-full  bg-white hover:bg-zinc-100 text-black shadow-none hover:cursor-pointer">
            Criar uma conta
          </Button>
        </Link>
      </div>
    </section>
  );
}
