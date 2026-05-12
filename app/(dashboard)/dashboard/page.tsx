import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex h-full">
      <NoteList />
      <NoteEditor />
    </div>
  )
}
