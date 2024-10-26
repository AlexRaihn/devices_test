<script setup lang="ts">
import { type PropType, reactive, ref } from 'vue'
import BButton from '@/components/BButton/BButton.vue'

const isEdit = ref(false)

const props = defineProps({
  deviceNode: {
    type: Object as PropType<Device.DeviceNode>,
    required: true
  }
})

const emit = defineEmits([
  'deleteNode',
  'editNode'
])

const newDeviceNode = reactive(props.deviceNode) as Device.DeviceNode


function editNode() {
  isEdit.value = false
  emit('editNode', props.deviceNode)
}
</script>

<template>
  <div class="p-2 border-[1px] border-black rounded-2xl flex justify-between gap-4 max-sm:flex-col items-start">
      <div v-if="!isEdit">
        {{props.deviceNode.name}}
      </div>
      <div v-else>
        <div class="flex gap-4">
          <input type="text" placeholder="Введите название узла" class="border-[1px] border-black p-1 rounded-lg" v-model="newDeviceNode.name" @keyup.enter="saveNode">
        </div>
      </div>
        <div class="flex gap-4">
          <BButton bg="bg-blue-500" @click="isEdit = true" v-if="!isEdit">Редактировать</BButton>
          <div v-else class="flex gap-4">
            <BButton bg="bg-green-500" @click="editNode">Сохранить</BButton>
            <BButton @click="isEdit = false">Отмена</BButton>
          </div>
          <BButton bg="bg-red-500" @click="$emit('deleteNode', props.deviceNode?.id)">Удалить</BButton>
        </div>
  </div>
</template>
