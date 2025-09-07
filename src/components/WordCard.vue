<script setup lang="ts">
interface WordCard {
  id: number
  word: string
  pronunciation?: string
  meaning: string
  progress: number
}

interface Props {
  card: WordCard
  isTopCard: boolean
}

defineProps<Props>()

function playAudio() {
  // 这里可以实现音频播放逻辑
}
</script>

<template>
  <div class="word-card">
    <div class="card-header">
      <div class="progress-section">
        <span class="progress-label">学习进度: {{ card.progress }}/100</span>
        <div class="progress-bar" :style="{ '--progress': `${card.progress}%` }" />
      </div>
    </div>

    <div class="card-content">
      <div class="word-display">
        <h1 class="word">
          {{ card.word }}
        </h1>

        <button class="audio-btn" :disabled="!isTopCard" @click="playAudio">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path
              d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
            />
          </svg>
        </button>
      </div>

      <div v-if="card.pronunciation" class="pronunciation">
        {{ card.pronunciation }}
      </div>
    </div>

    <div class="card-bottom">
      <button class="detail-btn" :disabled="!isTopCard">
        详细释义
      </button>

      <button class="action-btn" :disabled="!isTopCard">
        <span>TPO & 词汇真题</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.word-card {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.card-header {
  margin-bottom: 40px;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.progress-bar {
  height: 4px;
  background: linear-gradient(
    90deg,
    #ff9500 0%,
    #ff9500 var(--progress, 0%),
    #e5e5e5 var(--progress, 0%),
    #e5e5e5 100%
  );
  border-radius: 2px;
  transition: all 0.3s ease;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.word-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.word {
  font-size: 42px;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin: 0;
  line-height: 1.2;
}

.audio-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #f8f9fa;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.audio-btn:hover:not(:disabled) {
  background: #e9ecef;
  transform: scale(1.05);
}

.audio-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pronunciation {
  font-size: 18px;
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
}

.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
}

.detail-btn {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-btn:hover:not(:disabled) {
  border-color: #999;
  color: #333;
}

.action-btn {
  padding: 16px 24px;
  background: #2c3e50;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.action-btn:hover:not(:disabled) {
  background: #34495e;
  transform: translateY(-2px);
}

.detail-btn:disabled,
.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.swipe-hint {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #999;
  text-align: center;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-4px);
  }

  60% {
    transform: translateX(-50%) translateY(-2px);
  }
}

@media (max-width: 640px) {
  .word-card {
    padding: 20px;
  }

  .word {
    font-size: 36px;
  }

  .card-content {
    gap: 20px;
  }

  .card-bottom {
    margin-top: 30px;
  }
}
</style>
