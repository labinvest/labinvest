"use client";
import { registerSchema } from '@/schemas/authSchemas';
import { loginSchema } from '@/schemas/LoginSchemas';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchAPI } from '@/services/api';


export default function LoginPage() {

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
    onSubmit: async (v) => {
      try {
        if (mode === "login") {
          const data = await fetchAPI('/auth/login', {
            method: 'POST',
            body: {
              email: v.username,
              senha: v.password,
            },
          });

          const token = data?.dados?.token;
          const role = data?.dados?.usuario?.role;

          if (token) localStorage.setItem('token', token);
          if (role) localStorage.setItem('perfil', role.toLowerCase());

          setLoginError("");
          router.push("/home");
        } else {
          const data = await fetchAPI('/auth/signup', {
            method: 'POST',
            body: {
              nome: v.nome,
              email: v.email,
              senha: v.senha,
              role: 'CLIENTE',
            },
          });

          const token = data?.dados?.token;
          if (token) localStorage.setItem('token', token);
          localStorage.setItem('perfil', 'cliente');

          setStep("finished");
        }
      } catch (error: any) {
        const msg = error?.message || 'Erro ao processar autenticação';
        setLoginError(msg);
      }
    },
  });

   const { handleSubmit, values, handleChange, errors, touched, handleBlur } = formik;



  return (
    <main className="bg-gray-100 min-h-screen font-[Montserrat]">
      <div className="flex w-full min-h-screen">
        <div className="w-full flex items-center justify-center p-4 md:p-8">
          <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans px-4">
            <div className="flex flex-col items-center text-center px-4 sm:px-6 py-8 sm:py-12 bg-white rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-3xl sm:text-5xl font-bold text-gray-600 font-sans">
                Lab<span className="text-green-700">Invest</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-extrabold mt-2 font-sans">
                Simples, claro e eficiente.
              </p>
              <p className="text-xs sm:text-sm text-black mt-2 font-sans">
                Bem-vindo ao Lab Invest
              </p>
              <h1 className="text-xs sm:text-sm text-gray-300 font-semibold mt-4 font-sans">
                Usuário: admin | Senha: admin123
              </h1>
              <h1 className="text-xs sm:text-sm text-gray-300 font-semibold mt-1 font-sans">
                Usuário: user | Senha: user123
              </h1>
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setStep("first");
                  formik.resetForm();
                  setLoginError("");
                }}
                aria-label={`Alternar para modo ${mode === "login" ? "registrar" : "login"}`}
                className="relative w-full max-w-60 h-10 bg-gray-300 rounded-full mt-6 font-sans"
              >
                <span className="absolute inset-0 flex items-center justify-between px-6 text-base text-gray-700 z-0 font-sans">
                  <span>Login</span>
                  <span>Registrar</span>
                </span>
                <span
                  className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full flex items-center justify-center transition duration-700 font-sans ${mode === "login" ? "" : "translate-x-full"
                    }`}
                >
                  <span className="text-white font-semibold">
                    {mode === "login" ? "Login" : "Registrar"}
                  </span>
                </span>
              </button>

              {mode === "login" && (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 sm:mt-12 w-full max-w-[400px] space-y-4 font-sans px-4 sm:px-0"
                >
                  <TextField label="Email"  onBlur={handleBlur} onChange={handleChange}  id='username' name='username' variant="outlined" size='small' margin='normal' fullWidth error={touched.username && !!errors.username} helperText={touched.username && errors.username} />
                  <TextField label="Senha" id='password' name='password'  onBlur={handleBlur} onChange={handleChange}  variant="outlined" type="password" size='small' margin='normal' fullWidth error={touched.password && !!errors.password} helperText={touched.password && errors.password} />

                  {loginError && (
                    <p role="alert" 
                    aria-live="assertive" 
                    className="text-red-600 text-sm mb-2 font-semibold font-sans">
                      {loginError}
                    </p>
                  )}
                  <div className='flex flex-col gap-4'>
                  <Button
                    type="submit"
                    color='success'
                    variant='contained'
                    fullWidth
                    aria-label="Entrar na conta"
                  >
                    Entrar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setOpen(true)}
                    color='success'
                    variant='text'
                    fullWidth
                    aria-label="Abrir modal de recuperação de senha"
                  >
                    Esqueci minha senha
                  </Button>
                  </div>
                </form>
              )}

              {mode === "register" && step === "first" && (
                <form
                  onSubmit={formik.handleSubmit}
                  className="mt-12 w-[400px] space-y-4 font-sans"
                  aria-label="Formulário de registro"
                >
                  <TextField label="Nome completo" id="nome" name="nome" onBlur={handleBlur} onChange={handleChange} variant="outlined" size='small' margin='normal' fullWidth error={touched.nome && !!errors.nome} helperText={touched.nome && errors.nome} />
                  <TextField label="Email" id="email" name="email" type="email" onBlur={handleBlur} onChange={handleChange} variant="outlined" size='small' margin='normal' fullWidth error={touched.email && !!errors.email} helperText={touched.email && errors.email} />
                  <TextField label="Senha" id="senha" name="senha" onBlur={handleBlur} onChange={handleChange} variant="outlined" type="password" size='small' margin='normal' fullWidth error={touched.senha && !!errors.senha} helperText={touched.senha && errors.senha} />
                  <TextField
                    label="Confirmar senha"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    type="password"
                    size='small'
                    margin='normal'
                    fullWidth
                    error={touched.confirmarSenha && !!errors.confirmarSenha}
                    helperText={touched.confirmarSenha && errors.confirmarSenha}
                  />
                  <Button
                    type="submit"
                    color='success'
                    variant='contained'
                    fullWidth
                    aria-label="Criar nova conta"
                  >
                    Registrar
                  </Button>
                </form>
              )}

              {mode === "register" && step === "finished" && (
                <div role="status" aria-live="polite" className="mt-12 bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg shadow-lg w-[400px] font-sans">
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
                    aria-label="Voltar para a tela de login"
                    className="mt-4 w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800 font-sans"
                  >
                    Voltar ao Login
                  </button>
                </div>
              )}

              {open && (
                <div role="dialog" aria-modal="true" aria-labelledby="password-recovery-title" className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 font-sans">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                    <h2 id="password-recovery-title" className="text-green-700 font-semibold text-lg mb-4 font-sans">
                      Recuperação de Senha
                    </h2>
                    <TextField
                      label="Digite seu email"
                      id="recovery-email"
                      name="recovery-email"
                      type="email"
                      variant="outlined"
                      size='small'
                      margin='normal'
                      fullWidth
                      autoFocus
                    />
                    <Button onClick={() => setOpen(false)} color="success" aria-label="Enviar link de recuperação de senha">
                      Enviar link
                    </Button>
                    <Button
                      onClick={() => setOpen(false)}
                      aria-label="Fechar modal de recuperação de senha"
                      className="mt-4 text-sm text-gray-500 hover:underline font-sans"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


