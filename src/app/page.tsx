import AuthForm from '@/componentes/authForm'

export default function LoginPage() {
  return (
    <main className="bg-gray-100 min-h-screen font-[Montserrat]">
      <div className="flex w-full h-screen">

    
        <div className="w-full flex items-center justify-center p-8">
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
