<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { PropType } from 'vue'
import BButton from '@/components/BButton/BButton.vue'
import BNodeDeviceCard from '@/components/BNodeDeviceCard/BNodeDeviceCard.vue'
import { DevicesStore } from '@/stores/DevicesStore'
import draggable from 'vuedraggable'

const useDevicesStore = DevicesStore()

const props = defineProps({
  device: {
      type: Object as PropType<Device.Device>,
      required: true
  }
})

const newDevice = reactive(props.device)
const childNodes = reactive([])
const isEdit = ref(false)
const isChildEdit = ref(false)

async function saveDevice() {
  useDevicesStore.editDevice(newDevice).then(() => {
    isEdit.value = false
    alert('Успешно!')
  })
}

async function searchNodes() {
  childNodes.length = 0
  childNodes.push(...await useDevicesStore.getDeviceNodes(props.device?.id))
  isChildEdit.value = true
}

function cancelEdit() {
  isChildEdit.value = false
  childNodes.length = 0
}

async function deleteNode(node_id: number) {
  useDevicesStore.deleteDeviceNode(node_id)
  let index = childNodes.findIndex(item => item.id === node_id);
  if (index !== -1) {
    childNodes.splice(index, 1);
  }
}

async function addNode() {
  useDevicesStore.setDeviceNode(props.device?.id)
  searchNodes()
}

async function editNode(node: Device.DeviceNode) {
  useDevicesStore.editDeviceNode(node)
  childNodes.forEach((item) => {
    if(item.id == node.id) {
      Object.assign(item, node)
    }
  })
}
</script>

<template>
  <div class="p-4 border-[1px] border-gray-300 bg-white shadow-lg rounded-2xl flex justify-between max-sm:flex-col items-start">
    <div v-if="!isEdit">
      {{props.device.name}}
    </div>
    <div v-else class="flex flex-col gap-4">
      <div class="flex">
        <input type="text" placeholder="Введите название устройства" class="border-[1px] border-black p-1 rounded-lg" v-model="newDevice.name" @keyup.enter="saveDevice">
      </div>
      <div class="flex">
        <BButton @click="searchNodes" v-if="!isChildEdit">Показать узлы</BButton>
        <BButton v-else @click="cancelEdit">Скрыть</BButton>
      </div>
      <div v-if="isChildEdit" class="flex flex-col gap-4">
        <BButton @click="addNode" bg="bg-blue-500">Добавить узел</BButton>
        <div v-if="childNodes.length == 0">
          Узлы не найдены
        </div>
        <div v-else class="flex flex-col gap-4">
            <draggable :list="childNodes" item-key="id" tag="div" class="flex flex-col gap-4" animations="150">
              <template #item="{element}">
                <BNodeDeviceCard class="hover:cursor-move" :device-node="element" @deleteNode="deleteNode" @editNode="editNode"/>
              </template>
            </draggable>
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <BButton bg="bg-blue-500" @click="isEdit = true" v-if="!isEdit">Редактировать</BButton>
      <div v-else class="flex gap-4">
        <BButton bg="bg-green-500" @click="saveDevice">Сохранить</BButton>
        <BButton @click="isEdit = false">Отмена</BButton>
      </div>
      <BButton bg="bg-red-500" @click="useDevicesStore.deleteDevice(props.device.id)">Удалить</BButton>
    </div>
  </div>
</template>
