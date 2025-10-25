'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { loginSchema } from '@/schemas/LoginSchemas'

export default function CadastroCliente() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [step, setStep] = useState<'first' | 'finished'>('first')
  const [open, setOpen] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const registerSchema = Yup.object({
    nome: Yup.string().required('nome é obrigatório'),
    email: Yup.string().email('email inválido').required('email é obrigatório'),
    senha: Yup.string().min(6, 'mínimo 6 caracteres').required('senha é obrigatória'),
    confirmarSenha: Yup.string()
      .oneOf([Yup.ref('senha')], 'senhas não coincidem')
      .required('confirmação obrigatória'),
  })

  const schema = mode === 'login' ? loginSchema : registerSchema

  // Uma única instância do formik, re-inicializa quando `mode` muda
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      mode === 'login'
        ? { username: '', password: '' }
        : { nome: '', email: '', senha: '', confirmarSenha: '' },
    validationSchema: schema,
    onSubmit: (v: any) => {
      console.log('Dados enviados:', JSON.stringify(v, null, 2))

      if (mode === 'login' && v.username === 'admin' && v.password === 'admin123') {
        router.push('/home')
      } else {
        setStep('finished')
      }
    },
  })

  const input = (name: string, type = 'text', label: string, placeholder: string) => (
    <div className="text-left w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={(formik.values as any)[name] ?? ''}
        onChange={formik.handleChange}
        placeholder={placeholder}
        aria-invalid={!!(formik.errors as any)[name]}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-700 text-gray-800"
      />
      {(formik.errors as any)[name] && (
        <p className="text-red-500 text-sm mt-1">{(formik.errors as any)[name]}</p>
      )}
    </div>
  )

  return (
    <main className="bg-gray-100 min-h-screen font-[Montserrat]">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto p-4 items-center gap-8">
        <div className="w-full relative rounded-lg overflow-hidden">
          {/* imagem responsiva: altura menor em mobile e maior em md+ */}
          <div className="relative w-full h-[300px] md:h-[600px]">
            <Image src="/assets/image9.png" alt="planta" fill className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-600">
            Lab<span className="text-green-700">Invest</span>
          </h1>
          <p className="text-sm text-gray-500 font-bold mt-2">Simples, claro e eficiente.</p>
          <p className="text-sm text-black mt-2">Bem-vindo ao Lab Invest</p>
          <p className="text-xs text-gray-600 mt-1">usuario: admin e senha: admin123</p>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login')
              setStep('first')
              formik.resetForm()
            }}
            className="relative w-56 md:w-60 h-10 bg-gray-300 rounded-full mt-6"
            aria-pressed={mode === 'register'}
            aria-label="Alternar entre login e registro"
          >
            <span className="absolute inset-0 flex justify-between px-6 text-sm text-gray-700">
              <span>Login</span>
              <span>Registrar</span>
            </span>
            <span
              className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full flex items-center justify-center transition transform ${
                mode === 'login' ? '' : 'translate-x-full'
              }`}
            >
              <span className="text-white font-semibold">{mode === 'login' ? 'Login' : 'Registrar'}</span>
            </span>
          </button>

          {mode === 'login' && (
            <form onSubmit={formik.handleSubmit} className="mt-10 w-full md:w-[400px] space-y-4">
              {input('username', 'text', 'Nome de usuário', 'Digite seu nome de usuário')}
              {input('password', 'password', 'Senha', 'Digite sua senha')}
              <button type="submit" className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-sm text-green-700 hover:underline text-left"
              >
                Esqueci minha senha
              </button>
            </form>
          )}

          {mode === 'register' && step === 'first' && (
            <form onSubmit={formik.handleSubmit} className="mt-10 w-full md:w-[400px] space-y-4">
              {input('nome', 'text', 'Nome completo', 'Digite seu nome')}
              {input('email', 'email', 'Email', 'Digite seu email')}
              {input('senha', 'password', 'Senha', 'Crie uma senha')}
              {input('confirmarSenha', 'password', 'Confirmar senha', 'Confirme sua senha')}
              <button type="submit" className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
                Registrar
              </button>
            </form>
          )}

          {mode === 'register' && step === 'finished' && (
            <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg shadow-lg w-full md:w-[400px]">
              <h2 className="text-lg font-bold">Registro Concluído!</h2>
              <p className="mt-2 text-sm">Cadastro finalizado com sucesso.</p>
              <button
                type="button"
                onClick={() => {
                  setMode('login')
                  setStep('first')
                  formik.resetForm()
                }}
                className="mt-4 w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              >
                Voltar ao Login
              </button>
            </div>
          )}

          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                <h2 className="text-green-700 font-semibold text-lg mb-4">Recuperação de Senha</h2>
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full p-3 border rounded-lg mb-4 text-gray-800"
                />
                <button
                  type="button"
                  onClick={() => {
                    setEmailSent(true)
                    setOpen(false)
                  }}
                  className="w-full p-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  Enviar link
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 text-sm text-gray-500 hover:underline"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {emailSent && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" aria-live="polite">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                <h2 className="text-green-700 font-semibold text-lg mb-4">E-mail enviado!</h2>
                <p className="text-gray-600">Verifique sua caixa de entrada.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

