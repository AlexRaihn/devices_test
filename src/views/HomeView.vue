<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {DevicesStore} from '@/stores/DevicesStore'
import BDeviceCard from '@/components/BDeviceCard/BDeviceCard.vue'

const isLoading = ref(false);
const useDevicesStore = DevicesStore()

onMounted(() => {
  isLoading.value = true
  useDevicesStore.getDevices().finally(() => isLoading.value = false)
})
</script>

<template>
  <div>
    <div v-if="isLoading" class="font-bold text-xl">Загрузка...</div>
    <div v-else class="flex flex-col gap-4">
        <BDeviceCard :device="device" v-for="device in useDevicesStore.devices" :key="`device_${device.id}`"/>
    </div>
  </div>
</template>
