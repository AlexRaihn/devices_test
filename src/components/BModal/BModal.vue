<template>
  <div class="z-9999 absolute h-full w-full bg-black top-0 left-0 flex justify-center items-center">
    <div class="bg-white border-black border-[1px] rounded-lg p-4 flex flex-col gap-4">
      <div v-if="props.title.length > 0" class="font-bold">
        {{props.title}}
      </div>
      <div>
        <slot name="body"/>
      </div>
      <div v-if="!props.isFooter" class="flex gap-4">
        <BButton @click="emit('ok')">Ок</BButton>
        <BButton @click="emit('close')">Отмена</BButton>
      </div>
      <div v-else>
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BButton from '@/components/BButton/BButton.vue'

const props = defineProps({
  isFooter: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits(['close', 'ok'])
</script>
