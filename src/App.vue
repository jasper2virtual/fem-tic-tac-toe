<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-app-dark-navy">
    <main-screen-container>

      <new-game-menu v-if="currentScreen === 'NewGameMenu'" />
      <game-board v-if="currentScreen === 'GameBoard'" />

    </main-screen-container>
  </div>
</template>
<script lang="ts" setup>
import { provide, ref } from 'vue';
import MainScreenContainer from '@/components/main-screen-container.vue'
import NewGameMenu from '@/components/new-game-menu.vue'
import GameBoard from '@/components/game-board.vue'

// Data
const player1mark = ref<'X'|'O'>('X');
provide('player1mark', player1mark);

// State
const currentScreen = ref<'NewGameMenu' | 'GameBoard'>('NewGameMenu');


</script>
