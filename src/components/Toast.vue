<template>
  <transition name="slide-fade">
    <div v-if="toastStore.isVisible" class="toast">
      {{ toastStore.message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToastStore } from '../store/ToastStore'

export default defineComponent({
  setup() {
    const toastStore = useToastStore()
    return { toastStore }
  },
})
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
