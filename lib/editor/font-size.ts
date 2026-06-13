import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /** Aplica un tamaño de fuente (p. ej. "18px") SOLO a la selección actual. */
      setFontSize: (size: string) => ReturnType
      /** Quita el override de tamaño; el texto vuelve a heredar el tamaño base. */
      unsetFontSize: () => ReturnType
    }
  }
}

/**
 * Marca de tamaño de fuente POR SELECCIÓN (Phase 17 id:61, capa override).
 *
 * Registra un atributo `fontSize` sobre `textStyle` (que ya está en el editor por
 * FontFamily/Color). El tamaño se serializa como `style="font-size: NNpx"` dentro
 * del content JSON de la nota. Convive con la capa base global (--editor-font-size
 * de Configuración): el span con tamaño explícito gana por estilo inline sobre el
 * font-size heredado de .ProseMirror, sin necesidad de !important.
 */
export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types as string[],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el: HTMLElement) => el.style.fontSize || null,
            renderHTML: (attrs: { fontSize?: string | null }) => {
              if (!attrs.fontSize) return {}
              return { style: `font-size: ${attrs.fontSize}` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})
