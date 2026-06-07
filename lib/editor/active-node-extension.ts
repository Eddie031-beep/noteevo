import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

const activeNodeKey = new PluginKey('activeNodeHighlight')

export const ActiveNodeHighlight = Extension.create({
  name: 'activeNodeHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: activeNodeKey,
        props: {
          decorations(state) {
            const { selection, doc } = state
            const { from } = selection
            const decorations: Decoration[] = []

            try {
              const resolved = doc.resolve(from)
              if (resolved.depth >= 1) {
                const nodePos = resolved.before(1)
                const node = doc.nodeAt(nodePos)
                if (node) {
                  decorations.push(
                    Decoration.node(nodePos, nodePos + node.nodeSize, {
                      class: 'is-active-node',
                    })
                  )
                }
              }
            } catch {
              // ignorar
            }

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
