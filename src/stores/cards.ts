import { defineStore } from 'pinia'
import { ref } from 'vue'

interface WordCard {
  id: number
  word: string
  pronunciation?: string
  meaning: string
  progress: number
}

export const useCardsStore = defineStore('cards', () => {
  const cards = ref<WordCard[]>([
    {
      id: 1,
      word: 'congratulation',
      pronunciation: '/kənˌɡrætʃuˈleɪʃn/',
      meaning: '祝贺，恭喜',
      progress: 50,
    },
    {
      id: 2,
      word: 'magnificent',
      pronunciation: '/mæɡˈnɪfɪsnt/',
      meaning: '壮丽的，宏伟的',
      progress: 75,
    },
    {
      id: 3,
      word: 'extraordinary',
      pronunciation: '/ɪkˈstrɔːrdneri/',
      meaning: '非凡的，特别的',
      progress: 30,
    },
    {
      id: 4,
      word: 'enthusiastic',
      pronunciation: '/ɪnˌθuziˈæstɪk/',
      meaning: '热情的，热心的',
      progress: 90,
    },
    {
      id: 5,
      word: 'determination',
      pronunciation: '/dɪˌtɜːrmɪˈneɪʃn/',
      meaning: '决心，决定',
      progress: 20,
    },
  ])

  const currentIndex = ref(0)

  const removeTopCard = () => {
    if (cards.value.length > 1) {
      cards.value.shift()
    }
  }

  const getVisibleCards = () => {
    return cards.value.slice(0, 3)
  }

  return {
    cards,
    currentIndex,
    removeTopCard,
    getVisibleCards,
  }
})
