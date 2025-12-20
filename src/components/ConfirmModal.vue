<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="handleCancel"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all"
          :class="modalClass"
        >
          <!-- Icon -->
          <div class="flex justify-center pt-8 pb-4">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              :class="iconBgClass"
            >
              {{ icon }}
            </div>
          </div>

          <!-- Content -->
          <div class="px-8 pb-6 text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              {{ title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ message }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 px-8 pb-8">
            <button
              v-if="showCancel"
              @click="handleCancel"
              class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="handleConfirm"
              class="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all transform hover:scale-105"
              :class="confirmButtonClass"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning', 'info', 'confirm'
    validator: (value) => ['success', 'error', 'warning', 'info', 'confirm'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'OK'
  },
  cancelText: {
    type: String,
    default: 'Отмена'
  },
  showCancel: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const icon = computed(() => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    confirm: '❓'
  }
  return icons[props.type]
})

const iconBgClass = computed(() => {
  const classes = {
    success: 'bg-green-100 text-green-600',
    error: 'bg-red-100 text-red-600',
    warning: 'bg-yellow-100 text-yellow-600',
    info: 'bg-blue-100 text-blue-600',
    confirm: 'bg-purple-100 text-purple-600'
  }
  return classes[props.type]
})

const confirmButtonClass = computed(() => {
  const classes = {
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg',
    error: 'bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-lg',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:shadow-lg',
    info: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg',
    confirm: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg'
  }
  return classes[props.type]
})

const modalClass = computed(() => {
  return 'animate-bounce-in'
})

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.3s ease-out;
}
</style>
