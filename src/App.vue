<template>
  <div
    class="flex flex-col items-center justify-center w-screen min-h-screen bg-app-dark-navy p-4 max-app-tablet:relative">
    <div id="mobile-header" class=" max-app-tablet:absolute max-app-tablet:left-4 max-app-tablet:right-4 max-app-tablet:top-4 max-w-[460px] mx-auto"></div>
    <main-screen-container>

      <new-game-menu v-if="currentScreen === 'NewGameMenu'" @newGame="currentScreen = 'GameBoard'" />
      <game-board-screen v-if="currentScreen === 'GameBoard'" />

    </main-screen-container>
  </div>
</template>
<script lang="ts" setup>
import { provide, ref } from 'vue';
import MainScreenContainer from '@/components/main-screen-container.vue'
import NewGameMenu from '@/components/new-game-menu.vue'
import GameBoardScreen from '@/components/game-board-screen.vue'

const player1mark = ref<'X' | 'O'>('X');
provide('player1mark', player1mark);
const gameMode = ref<'vsCpu' | 'vsPlayer'>('vsCpu');
provide('gameMode', gameMode);

const currentScreen = ref<'NewGameMenu' | 'GameBoard'>('NewGameMenu');


</script>
