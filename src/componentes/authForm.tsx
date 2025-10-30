"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { loginSchema, registerSchema } from "@/schemas/authSchemas";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"first" | "finished">("first");
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState("");

  const schema = mode === "login" ? loginSchema : registerSchema;

  const formik = useFormik({
    initialValues:
      mode === "login"
        ? { username: "", password: "" }
        : { nome: "", email: "", senha: "", confirmarSenha: "" },
    validationSchema: schema,
    onSubmit: (v) => {
      if (mode === "login") {
        if (v.username === "admin" && v.password === "admin123") {
          setLoginError("");
          router.push("/home");
        } else {
          setLoginError("Usuário ou senha incorretos!");
        }
      } else {
        setStep("finished");
      }
    },
  });

  const input = (
    name: string,
    type = "text",
    label: string,
    placeholder: string
  ) => (
    <div className="text-left w-full font-sans">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={(formik.values as any)[name]}
        onChange={formik.handleChange}
        placeholder={placeholder}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-700 text-gray-800 font-sans"
      />
      {formik.errors[name as keyof typeof formik.errors] && (
        <p className="text-red-500 text-sm mt-1 font-sans">
          {formik.errors[name as keyof typeof formik.errors]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="flex flex-col items-center text-center px-6 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-600 font-sans">
          Lab<span className="text-green-700">Invest</span>
        </h1>
        <p className="text-sm text-gray-500 font-extrabold mt-2 font-sans">
          Simples, claro e eficiente.
        </p>
        <p className="text-sm text-black mt-2 font-sans">
          Bem-vindo ao Lab Invest
        </p>
        <h1 className="text-sm text-pink-600 font-semibold mt-4 font-sans">
          Usuário: admin | Senha: admin123
        </h1>

        <button
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setStep("first");
            formik.resetForm();
            setLoginError("");
          }}
          className="relative w-60 h-10 bg-gray-300 rounded-full mt-6 font-sans"
        >
          <span className="absolute inset-0 flex items-center justify-between px-6 text-base text-gray-700 z-0 font-sans">
            <span>Login</span>
            <span>Registrar</span>
          </span>
          <span
            className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full flex items-center justify-center transition font-sans ${
              mode === "login" ? "" : "translate-x-full"
            }`}
          >
            <span className="text-white font-semibold">
              {mode === "login" ? "Login" : "Registrar"}
            </span>
          </span>
        </button>

        {mode === "login" && (
          <form
            onSubmit={formik.handleSubmit}
            className="mt-12 w-[400px] space-y-4 font-sans"
          >
            {input(
              "username",
              "text",
              "Nome de usuário",
              "Digite seu nome de usuário"
            )}
            {input("password", "password", "Senha", "Digite sua senha")}

            {loginError && (
              <p className="text-red-600 text-sm mb-2 font-semibold font-sans">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-sans"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-sm text-green-700 hover:underline text-left font-sans"
            >
              Esqueci minha senha
            </button>
          </form>
        )}

        {mode === "register" && step === "first" && (
          <form
            onSubmit={formik.handleSubmit}
            className="mt-12 w-[400px] space-y-4 font-sans"
          >
            {input("nome", "text", "Nome completo", "Digite seu nome")}
            {input("email", "email", "Email", "Digite seu email")}
            {input("senha", "password", "Senha", "Crie uma senha")}
            {input(
              "confirmarSenha",
              "password",
              "Confirmar senha",
              "Confirme sua senha"
            )}
            <button
              type="submit"
              className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-sans"
            >
              Registrar
            </button>
          </form>
        )}

        {mode === "register" && step === "finished" && (
          <div className="mt-12 bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg shadow-lg w-[400px] font-sans">
            <h2 className="text-lg font-bold font-sans">Registro Concluído!</h2>
            <p className="mt-2 text-sm font-sans">
              Cadastro finalizado com sucesso.
            </p>
            <button
              onClick={() => {
                setMode("login");
                setStep("first");
                formik.resetForm();
                setLoginError("");
              }}
              className="mt-4 w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-sans"
            >
              Voltar ao Login
            </button>
          </div>
        )}

        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 font-sans">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
              <h2 className="text-green-700 font-semibold text-lg mb-4 font-sans">
                Recuperação de Senha
              </h2>
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full p-3 border rounded-lg mb-4 text-gray-800 font-sans"
              />
              <button
                onClick={() => setOpen(false)}
                className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-sans"
              >
                Enviar link
              </button>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-sm text-gray-500 hover:underline font-sans"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}