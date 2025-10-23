import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export function cadastroCliente() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [step, setStep] = useState<'first' | 'finished'>('first')
  const [open, setOpen] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  return (
    <>
      <Head>
        <title>Tela de Registro Cliente</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main className="bg-gray-100 min-h-screen font-[Montserrat]">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto p-4">
          {/* Imagem */}
          <div className="flex justify-center items-center">
            <Image
              src="/assets/image9.png"
              alt="planta"
              width={800}
              height={600}
              className="rounded-lg shadow-sm"
            />
          </div>

          {/* Formulário */}
          <div className="flex flex-col justify-center items-center text-center mt-[-560px] ml-[60px]">
            <h1 className="text-5xl font-bold">
              <span className="text-gray-600">Lab</span>
              <span className="text-green-700">Invest</span>
            </h1>
            <p className="text-sm text-gray-500 font-bold mt-2">Simples, claro e eficiente.</p>
            <p className="text-sm text-black mt-2">Bem-vindo ao Lab Invest</p>

            {/* Botão alternar modo */}
            <div className="mt-6">
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setStep('first')
                }}
                className="relative w-60 h-10 bg-gray-300 rounded-full transition duration-200 focus:outline-none"
              >
                <span className="absolute inset-0 flex items-center justify-between px-6 text-sm font-medium text-gray-700">
                  <span>Login</span>
                  <span>Registrar</span>
                </span>
                <span
                  className={`absolute top-0 left-0 w-1/2 h-full bg-green-700 rounded-full shadow transition duration-300 flex items-center justify-center ${
                    mode === 'login' ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <span className="text-white font-semibold">{mode === 'login' ? 'Login' : 'Registrar'}</span>
                </span>
              </button>
            </div>

            {/* Login */}
            {mode === 'login' && (
              <div className="mt-12 w-[400px] space-y-4">
                <input type="text" placeholder="Usuário" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <input type="password" placeholder="Senha" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <button
                  onClick={() => window.location.href = '/telaInicial'}
                  className="w-full p-2 bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:bg-green-800 transition"
                >
                  Entrar
                </button>
                <button onClick={() => setOpen(true)} className="text-sm text-green-700 hover:underline mt-2 text-left">
                  Esqueci minha senha
                </button>
              </div>
            )}

            {/* Modal recuperação */}
            {open && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                  <h2 className="text-green-700 font-semibold text-lg mb-4">Recuperação de Senha</h2>
                  <p className="text-gray-600 mb-4">Digite seu e-mail para receber um link de redefinição de senha.</p>
                  <input type="email" placeholder="Seu e-mail" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 mb-4" />
                  <button onClick={() => { setEmailSent(true); setOpen(false); }} className="w-full p-2 bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:bg-green-800 transition">
                    Enviar link de redefinição
                  </button>
                  <button onClick={() => setOpen(false)} className="mt-4 text-sm text-gray-500 hover:underline">
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Confirmação de envio */}
            {emailSent && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-center">
                  <h2 className="text-green-700 font-semibold text-lg mb-4">E-mail enviado!</h2>
                  <p className="text-gray-600">Verifique sua caixa de entrada para redefinir sua senha.</p>
                </div>
              </div>
            )}

            {/* Registro */}
            {mode === 'register' && step === 'first' && (
              <form className="mt-12 w-[400px] space-y-4" onSubmit={(e) => { e.preventDefault(); setStep('finished'); }}>
                <input type="text" placeholder="Nome Completo" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <input type="password" placeholder="Senha" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <input type="password" placeholder="Confirmar Senha" className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
                <button type="submit" className="w-full p-2 bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:bg-green-800 transition">
                  Registrar
                </button>
              </form>
            )}

            {/* Registro concluído */}
            {mode === 'register' && step === 'finished' && (
              <div className="mt-12 flex flex-col justify-center items-center text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg max-w-md">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-lg font-bold">Registro Concluído!</h2>
                  <p className="mt-2 text-sm">Seu cadastro foi finalizado com sucesso. Obrigado por se registrar!</p>
                  <button
                    onClick={() => { setMode('login'); setStep('first'); }}
                    className="mt-4 w-full px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:bg-green-800 transition"
                  >
                    Voltar ao Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
