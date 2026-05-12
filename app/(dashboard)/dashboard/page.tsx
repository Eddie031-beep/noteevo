import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import NoteList from '@/components/notes/NoteList'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex h-full">
      <NoteList />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Selecciona o crea una nota</p>
      </div>
    </div>
  )
}
