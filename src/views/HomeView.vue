<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {DevicesStore} from '@/stores/DevicesStore'
import BDeviceCard from '@/components/BDeviceCard/BDeviceCard.vue'
import BButton from '@/components/BButton/BButton.vue'
import BModal from '@/components/BModal/BModal.vue'

const isCreateModal = ref(false)
const isLoading = ref(false);
const newDevice = ref('')
const useDevicesStore = DevicesStore()

onMounted(() => {
  isLoading.value = true
  useDevicesStore.getDevices().finally(() => isLoading.value = false)
})

async function createModal() {
  useDevicesStore.createDevice(newDevice.value).then(() => {
    alert('Успешно!')
    closeCreateModal()
  })
}

function openCreateModal() {
  isCreateModal.value = true
}

function closeCreateModal() {
  isCreateModal.value = false
  newDevice.value = ''
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="font-bold text-xl">Загрузка...</div>
    <div v-else class="flex flex-col gap-4">
        <BButton @click="openCreateModal">Создать!</BButton>
        <BDeviceCard :device="device" v-for="device in useDevicesStore.devices" :key="`device_${device.id}`"/>
    </div>

    <BModal title="Создать устройство" v-if="isCreateModal" @close="closeCreateModal" @ok="createModal">
      <template #body>
        <input type="text" v-model="newDevice" placeholder="Введите название устройства" class="p-2 border-[1px] rounded-lg border-black">
      </template>
    </BModal>
  </div>
</template>
