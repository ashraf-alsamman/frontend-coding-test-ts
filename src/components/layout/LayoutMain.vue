<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center mt-4">
            <img class="w-14 h-14" src="../../assets/logo.svg" />
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="flex justify-center">
    <router-view />
  </main>
</template>
