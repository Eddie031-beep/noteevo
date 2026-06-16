'use client'

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react'
import { X, Upload, BookOpen, Search, Check, Loader2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import type { Note } from '@/types'

interface ImportModalProps {
  onClose: () => void
}

type ImportState = 'idle' | 'importing' | 'done' | 'error'

export default function ImportModal({ onClose }: ImportModalProps) {
  const { notebooks } = useNotebookStore()
  const { addNote } = useNoteStore()

  const [files, setFiles] = useState<File[]>([])
  const [notebookId, setNotebookId] = useState<string>(notebooks[0]?.id ?? '')
  const [notebookQuery, setNotebookQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [state, setState] = useState<ImportState>('idle')
  const [importedCount, setImportedCount] = useState(0)
  const [failed, setFailed] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredNotebooks = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(notebookQuery.toLowerCase())
  )
  const selectedNotebook = notebooks.find((nb) => nb.id === notebookId)

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter((f) => {
      const n = f.name.toLowerCase()
      return n.endsWith('.md') || n.endsWith('.enex')
    })
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      return [...prev, ...valid.filter((f) => !existingNames.has(f.name))]
    })
  }, [])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }
  const onDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)
  const removeFile = (name: string) => setFiles((prev) => prev.filter((f) => f.name !== name))

  const handleImport = async () => {
    if (!files.length || !notebookId) return
    setState('importing')
    setFailed([])

    const fd = new FormData()
    fd.append('notebookId', notebookId)
    files.forEach((f) => fd.append('files', f))

    try {
      const res = await fetch('/api/import', { method: 'POST', body: fd })
      if (!res.ok) { setState('error'); return }
      const json = await res.json() as { imported: number; notes: Note[]; failed: string[] }
      json.notes.forEach((n) => addNote(n))
      setImportedCount(json.imported)
      setFailed(json.failed ?? [])
      setState('done')
    } catch {
      setState('error')
    }
  }

  const isImporting = state === 'importing'
  const canImport = files.length > 0 && !!notebookId && !isImporting

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Upload size={16} className="text-accent" />
            <span className="font-semibold text-foreground text-sm">Importar notas</span>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {/* Done state */}
          {state === 'done' && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {importedCount} nota{importedCount !== 1 ? 's' : ''} importada{importedCount !== 1 ? 's' : ''}
                </p>
                {failed.length > 0 && (
                  <p className="text-xs text-muted mt-1">
                    {failed.length} elemento{failed.length !== 1 ? 's' : ''} no pudo importarse
                  </p>
                )}
              </div>
              {failed.length > 0 && (
                <div className="w-full text-left bg-danger/5 border border-danger/20 rounded-xl p-3">
                  <p className="text-xs font-medium text-danger mb-1.5">Con errores:</p>
                  <ul className="space-y-0.5">
                    {failed.map((f) => (
                      <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                        <AlertCircle size={11} className="text-danger shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-light transition cursor-pointer font-medium"
              >
                Listo
              </button>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                <AlertCircle size={24} className="text-danger" />
              </div>
              <p className="text-sm text-foreground font-medium">Error al importar</p>
              <p className="text-xs text-muted">Intenta de nuevo</p>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="px-5 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-light transition cursor-pointer font-medium"
              >
                Reintentar
              </button>
            </div>
          )}

          {(state === 'idle' || state === 'importing') && (
            <>
              {/* Drop zone */}
              <div>
                <p className="text-xs font-medium text-muted mb-2">
                  Archivos <span className="text-subtle">.md · .enex</span>
                </p>
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition ${
                    isDragging
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50 hover:bg-surface'
                  }`}
                >
                  <Upload size={20} className={isDragging ? 'text-accent' : 'text-muted'} />
                  <p className="text-sm text-foreground font-medium">
                    {isDragging ? 'Suelta aquí' : 'Arrastra archivos o haz click'}
                  </p>
                  <p className="text-xs text-muted">Markdown (.md) o exportación de Evernote (.enex)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.enex"
                    multiple
                    className="sr-only"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
                  />
                </div>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted">
                    {files.length} archivo{files.length !== 1 ? 's' : ''} seleccionado{files.length !== 1 ? 's' : ''}
                  </p>
                  {files.map((f) => (
                    <div key={f.name} className="flex items-center gap-2.5 px-3 py-2 bg-surface border border-border rounded-lg">
                      <FileText size={13} className="text-accent shrink-0" />
                      <span className="text-sm text-foreground flex-1 truncate">{f.name}</span>
                      <span className="text-xs text-muted shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                      <button
                        type="button"
                        onClick={() => removeFile(f.name)}
                        className="text-muted hover:text-danger transition cursor-pointer shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Notebook picker */}
              <div>
                <p className="text-xs font-medium text-muted mb-2">Libreta destino</p>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border focus-within:border-accent/50 transition mb-2">
                  <Search size={12} className="text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar libreta..."
                    value={notebookQuery}
                    onChange={(e) => setNotebookQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-subtle"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>
                <div className="max-h-44 overflow-y-auto rounded-xl border border-border">
                  {filteredNotebooks.length === 0 ? (
                    <p className="text-xs text-muted text-center py-4">Sin resultados</p>
                  ) : (
                    filteredNotebooks.map((nb) => {
                      const isSelected = nb.id === notebookId
                      return (
                        <button
                          key={nb.id}
                          type="button"
                          onClick={() => setNotebookId(nb.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition cursor-pointer border-b border-border last:border-b-0 ${
                            isSelected ? 'bg-accent/10' : 'hover:bg-surface'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${isSelected ? 'bg-accent/20' : 'bg-elevated'}`}>
                            <BookOpen size={12} className={isSelected ? 'text-accent' : 'text-muted'} />
                          </div>
                          <span className={`text-sm flex-1 truncate ${isSelected ? 'text-accent font-medium' : 'text-foreground'}`}>
                            {nb.name}
                          </span>
                          {isSelected && <Check size={13} className="text-accent shrink-0" />}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {(state === 'idle' || state === 'importing') && (
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border shrink-0">
            <p className="text-xs text-subtle truncate">
              {selectedNotebook ? `→ ${selectedNotebook.name}` : 'Selecciona una libreta'}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer rounded-lg hover:bg-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!canImport}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
              >
                {isImporting && <Loader2 size={13} className="animate-spin" />}
                {isImporting ? 'Importando...' : 'Importar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
