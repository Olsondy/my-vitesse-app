<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useCardsStore } from '../stores/cards'
import WordCard from './WordCard.vue'

const cardsStore = useCardsStore()
const cardsWrapper = ref<HTMLElement>()
const visibleCards = computed(() => cardsStore.getVisibleCards())

// 拖拽状态
const isDragging = ref(false)
const startY = ref(0)
const currentY = ref(0)
const dragOffset = ref(0)

// 触摸事件处理
function handleTouchStart(e: TouchEvent) {
  if (visibleCards.value.length === 0)
    return

  isDragging.value = true
  startY.value = e.touches[0].clientY
  currentY.value = e.touches[0].clientY
  dragOffset.value = 0
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value)
    return

  e.preventDefault()
  currentY.value = e.touches[0].clientY
  dragOffset.value = startY.value - currentY.value

  // 限制拖拽范围，只允许向上滑动
  if (dragOffset.value < 0) {
    dragOffset.value = dragOffset.value * 0.3 // 向下滑动阻力
  }
}

function handleTouchEnd() {
  if (!isDragging.value)
    return

  // 如果上滑距离超过阈值，移除顶层卡片
  if (dragOffset.value > 100) {
    animateCardOut()
  }
  else {
    // 回弹动画
    dragOffset.value = 0
  }

  setTimeout(() => {
    isDragging.value = false
  }, 300)
}

// 鼠标事件处理
function handleMouseDown(e: MouseEvent) {
  if (visibleCards.value.length === 0)
    return

  isDragging.value = true
  startY.value = e.clientY
  currentY.value = e.clientY
  dragOffset.value = 0

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value)
    return

  e.preventDefault()
  currentY.value = e.clientY
  dragOffset.value = startY.value - currentY.value

  // 限制拖拽范围
  if (dragOffset.value < 0) {
    dragOffset.value = dragOffset.value * 0.3
  }
}

function handleMouseUp() {
  if (!isDragging.value)
    return

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)

  if (dragOffset.value > 100) {
    animateCardOut()
  }
  else {
    dragOffset.value = 0
  }

  setTimeout(() => {
    isDragging.value = false
  }, 300)
}

// 卡片移出动画
function animateCardOut() {
  dragOffset.value = window.innerHeight
  setTimeout(() => {
    cardsStore.removeTopCard()
    dragOffset.value = 0
  }, 300)
}

// 获取卡片样式
function getCardStyle(index: number) {
  if (index === 0 && isDragging.value) {
    return {
      transform: `translateY(-${dragOffset.value}px)`,
      transition: dragOffset.value === 0 ? 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
    }
  }

  const scale = 1 - index * 0.09
  const translateY = index * 18
  const opacity = 1

  return {
    transform: `translateY(${translateY}px) scaleX(${scale})`,
    opacity: Math.max(opacity, 0.3),
    zIndex: 10 - index,
  }
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div class="card-stack-container flex-col">
    <div ref="cardsWrapper" class="cards-wrapper">
      <div
        v-for="(card, index) in visibleCards" :key="card.id" class="card"
        :class="[`card-${index}`, { dragging: isDragging && index === 0 }]" :style="getCardStyle(index)"
        @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
      >
        <WordCard :card="card" :is-top-card="index === 0" />
      </div>
    </div>

    <div class="swipe-hint">
      向上滑看下一个单词
    </div>
  </div>
</template>

<style scoped>
.card-stack-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
}

.cards-wrapper {
  position: relative;
  width: 100%;
  max-width: 380px;
  height: 600px;
}

.card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: grab;
  user-select: none;
  will-change: transform;
}

.card.dragging {
  cursor: grabbing;
  transition: none;
}

.card-0 {
  z-index: 10;
}

.card-1 {
  z-index: 9;
}

.card-2 {
  z-index: 8;
}

@media (max-width: 640px) {
  .card-stack-container {
    padding: 16px;
  }

  .cards-wrapper {
    max-width: 100%;
    height: 70vh;
    min-height: 500px;
  }
}
</style>
