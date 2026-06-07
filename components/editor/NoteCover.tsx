'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Trash2, RefreshCw, Loader2, X } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { updateCover } from '@/lib/supabase/notes'
import { uploadNoteCover } from '@/lib/supabase/storage'

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
]

type Tab = 'gradients' | 'upload'

interface NoteCoverProps {
  noteId: string
  coverUrl: string | null | undefined
  coverGradient: string | null | undefined
  editable: boolean
}

export default function NoteCover({ noteId, coverUrl, coverGradient, editable }: NoteCoverProps) {
  const { updateNote } = useNoteStore()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('gradients')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const hasCover = Boolean(coverUrl || coverGradient)

  const apply = async (data: { cover_url: string | null; cover_gradient: string | null }) => {
    const prev = { cover_url: coverUrl ?? null, cover_gradient: coverGradient ?? null }
    updateNote(noteId, data) // optimista
    try {
      await updateCover(noteId, data)
    } catch {
      updateNote(noteId, prev) // rollback
    }
  }

  const handleGradient = (g: string) => {
    setPickerOpen(false)
    apply({ cover_gradient: g, cover_url: null })
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const url = await uploadNoteCover(file, noteId)
      await apply({ cover_url: url, cover_gradient: null })
      setPickerOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo subir la imagen')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemove = () => {
    apply({ cover_url: null, cover_gradient: null })
  }

  const openPicker = () => {
    setError(null)
    setTab('gradients')
    setPickerOpen(true)
  }

  return (
    <>
      {hasCover ? (
        <div
          className="relative w-full h-[180px] rounded-t-lg bg-cover bg-center mb-3 group/cover"
          style={
            coverUrl
              ? { backgroundImage: `url(${coverUrl})` }
              : { background: coverGradient ?? undefined }
          }
        >
          {editable && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-0 group-hover/cover:opacity-100 transition">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-1 text-xs bg-panel/90 backdrop-blur border border-border text-foreground px-2.5 py-1.5 rounded-md hover:bg-panel transition cursor-pointer shadow-md"
              >
                <RefreshCw size={12} /> Cambiar portada
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs bg-panel/90 backdrop-blur border border-border text-danger px-2.5 py-1.5 rounded-md hover:bg-danger/10 transition cursor-pointer shadow-md"
              >
                <Trash2 size={12} /> Quitar portada
              </button>
            </div>
          )}
        </div>
      ) : (
        editable && (
          <div className="h-12 flex items-center mb-1">
            <button
              type="button"
              onClick={openPicker}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground opacity-0 group-hover/head:opacity-100 transition px-2 py-1 -mx-2 rounded-md hover:bg-surface cursor-pointer"
            >
              <ImagePlus size={14} /> Añadir portada
            </button>
          </div>
        )
      )}

      {pickerOpen && editable && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con tabs */}
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTab('gradients')}
                  className={`text-xs px-3 py-1.5 rounded-md transition cursor-pointer ${
                    tab === 'gradients'
                      ? 'bg-surface text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  Gradientes
                </button>
                <button
                  type="button"
                  onClick={() => setTab('upload')}
                  className={`text-xs px-3 py-1.5 rounded-md transition cursor-pointer ${
                    tab === 'upload'
                      ? 'bg-surface text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  Subir imagen
                </button>
              </div>
              <button
                type="button"
                title="Cerrar"
                onClick={() => setPickerOpen(false)}
                className="p-1 rounded-md text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-4">
              {tab === 'gradients' ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGradient(g)}
                      style={{ background: g }}
                      className="h-[60px] w-full rounded-lg cursor-pointer ring-1 ring-border hover:ring-2 hover:ring-accent transition"
                      aria-label="Aplicar gradiente"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    title="Seleccionar imagen de portada"
                    className="hidden"
                    onChange={handleFile}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 text-sm bg-surface hover:bg-elevated text-foreground px-4 py-2.5 rounded-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
                    {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
                  </button>
                  <p className="text-[11px] text-subtle">PNG, JPG o GIF · máximo 5MB</p>
                  {error && <p className="text-xs text-danger text-center">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
