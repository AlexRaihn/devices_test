<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="p-4 flex flex-col gap-4">
      <div class="flex gap-4">
          <RouterLink to="/">Домашняя страница</RouterLink>
          <RouterLink to="/about">О проекте</RouterLink>
      </div>
      <div>
        <RouterView />
      </div>
    </div>
</template>
