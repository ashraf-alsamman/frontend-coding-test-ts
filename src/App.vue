<template>
  <div
    class="min-w-full min-h-screen font-sans text-sm antialiased bg-gray-100 text-center"
  >
    <Toast />
    <router-view />
  </div>
</template>

<script lang="ts">
import Toast from './components/Toast.vue'

export default {
  components: { Toast },
}
</script>
