import { useStore } from '@/store'

const store = useStore()

export const getPage = () => {
  return {
    index: 1,
    size: store.state.app.pageSize,
    total: 0,
  }
}