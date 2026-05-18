import { useSpaceStore } from '@/store/spaceStore'
import type { SpaceRole } from '@/types'

export function useSpaceRole(spaceId: string): SpaceRole | 'owner' | null {
  const spaces = useSpaceStore((s) => s.spaces)
  const space = spaces.find((sp) => sp.id === spaceId)
  return space?.user_role ?? null
}
