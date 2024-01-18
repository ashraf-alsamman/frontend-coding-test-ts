import { defineStore } from 'pinia'

interface ToastState {
  isVisible: boolean
  message: string
}

export const useToastStore = defineStore({
  id: 'toast',
  state: (): ToastState => ({
    isVisible: false,
    message: '',
  }),
  actions: {
    showToast(message: string, duration: number = 3000) {
      this.message = message
      this.isVisible = true

      setTimeout(() => {
        this.isVisible = false
      }, duration)
    },
  },
})
