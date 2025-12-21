<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: 'ru'
  }
})

const emit = defineEmits(['close', 'change'])

const currentIdx = ref(props.currentIndex)
const isAnimating = ref(false)
const slideDirection = ref('right')

// Синхронизация с пропсами
watch(() => props.currentIndex, (val) => {
  currentIdx.value = val
})

watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Навигация
const goToNext = () => {
  if (isAnimating.value) return
  slideDirection.value = 'right'
  isAnimating.value = true
  currentIdx.value = (currentIdx.value + 1) % props.images.length
  emit('change', currentIdx.value)
  setTimeout(() => isAnimating.value = false, 400)
}

const goToPrev = () => {
  if (isAnimating.value) return
  slideDirection.value = 'left'
  isAnimating.value = true
  currentIdx.value = (currentIdx.value - 1 + props.images.length) % props.images.length
  emit('change', currentIdx.value)
  setTimeout(() => isAnimating.value = false, 400)
}

const close = () => {
  emit('close')
}

// Клавиатурная навигация
const handleKeydown = (e) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') goToNext()
  if (e.key === 'ArrowLeft') goToPrev()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

// Получить alt текст
const getAlt = (image) => {
  return image.alt?.[props.locale] || image.alt?.ru || ''
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div 
        v-if="isOpen" 
        class="lightbox-overlay"
        @click.self="close"
      >
        <!-- Backdrop с blur -->
        <div class="lightbox-backdrop"></div>
        
        <!-- Кнопка закрытия -->
        <button 
          class="lightbox-close"
          @click="close"
          aria-label="Закрыть"
        >
          <XMarkIcon class="w-8 h-8" />
        </button>

        <!-- Навигация влево -->
        <button 
          v-if="images.length > 1"
          class="lightbox-nav lightbox-nav-prev"
          @click="goToPrev"
          aria-label="Предыдущее"
        >
          <ChevronLeftIcon class="w-10 h-10" />
        </button>

        <!-- Основное изображение -->
        <div class="lightbox-content">
          <Transition :name="`slide-${slideDirection}`" mode="out-in">
            <div 
              :key="currentIdx"
              class="lightbox-image-wrapper"
            >
              <img 
                :src="images[currentIdx]?.url"
                :alt="getAlt(images[currentIdx])"
                class="lightbox-image"
              />
              
              <!-- Подпись -->
              <div 
                v-if="getAlt(images[currentIdx])"
                class="lightbox-caption"
              >
                {{ getAlt(images[currentIdx]) }}
              </div>
            </div>
          </Transition>
        </div>

        <!-- Навигация вправо -->
        <button 
          v-if="images.length > 1"
          class="lightbox-nav lightbox-nav-next"
          @click="goToNext"
          aria-label="Следующее"
        >
          <ChevronRightIcon class="w-10 h-10" />
        </button>

        <!-- Индикатор страниц -->
        <div 
          v-if="images.length > 1"
          class="lightbox-counter"
        >
          {{ currentIdx + 1 }} / {{ images.length }}
        </div>

        <!-- Точки навигации -->
        <div 
          v-if="images.length > 1 && images.length <= 20"
          class="lightbox-dots"
        >
          <button
            v-for="(_, idx) in images"
            :key="idx"
            :class="['lightbox-dot', { active: idx === currentIdx }]"
            @click="() => { currentIdx = idx; emit('change', idx) }"
            :aria-label="`Изображение ${idx + 1}`"
          ></button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg) scale(1.1);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.15);
}

.lightbox-nav-prev {
  left: 1.5rem;
}

.lightbox-nav-prev:hover {
  transform: translateY(-50%) scale(1.15) translateX(-3px);
}

.lightbox-nav-next {
  right: 1.5rem;
}

.lightbox-nav-next:hover {
  transform: translateY(-50%) scale(1.15) translateX(3px);
}

.lightbox-content {
  position: relative;
  z-index: 5;
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
  animation: imageAppear 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes imageAppear {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-caption {
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  text-align: center;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.lightbox-counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.lightbox-dots {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.lightbox-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.lightbox-dot:hover {
  background: rgba(255, 255, 255, 0.6);
}

.lightbox-dot.active {
  background: white;
  transform: scale(1.3);
}

/* Анимации появления/исчезновения */
.lightbox-fade-enter-active {
  animation: fadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.lightbox-fade-leave-active {
  animation: fadeOut 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Анимации слайдов */
.slide-right-enter-active,
.slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-leave-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-60px) scale(0.95);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-60px) scale(0.95);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .lightbox-nav {
    width: 3rem;
    height: 3rem;
  }
  
  .lightbox-nav-prev {
    left: 0.5rem;
  }
  
  .lightbox-nav-next {
    right: 0.5rem;
  }
  
  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
  }
  
  .lightbox-image {
    max-width: 95vw;
    max-height: 75vh;
    border-radius: 8px;
  }
  
  .lightbox-caption {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
}
</style>
