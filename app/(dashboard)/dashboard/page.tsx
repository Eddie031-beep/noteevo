import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">¡Bienvenido a NoteEvo!</h1>
        <p className="text-gray-500 mt-2">{user.email}</p>
      </div>
    </div>
  )
}
