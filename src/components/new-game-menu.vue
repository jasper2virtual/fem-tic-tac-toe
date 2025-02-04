<template>
    <div class="flex flex-col gap-10">
        <div class="flex gap-2 justify-center">
            <img src="/src/images/icon-x.svg" alt="X" class="w-8 h-8" />
            <img src="/src/images/icon-o.svg" alt="O" class="w-8 h-8" />
        </div>
        <div>
            <player1-mark-selector />
        </div>
        <div class="flex flex-col gap-6">
            <button class=" bg-app-light-yellow hover:bg-app-light-yellow-hover p-4 rounded-xl
            app-text-heading-s shadow-[0_8px_0_0_#CC8B13]" @click="newGame('vsCpu')">NEW GAME (VS CPU)</button>
            <button class=" bg-app-light-blue hover:bg-app-light-blue-hover p-4 rounded-xl
            app-text-heading-s shadow-[0_8px_0_0_#118C87]" @click="newGame('vsPlayer')">NEW GAME (VS PLAYER)</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { inject, type Ref } from 'vue'
import player1MarkSelector from './player1-mark-selector.vue'
const gameMode = inject('gameMode') as Ref<'vsCpu' | 'vsPlayer'>

const emit = defineEmits(['newGame'])

const newGame = (newGameMode: 'vsCpu' | 'vsPlayer') => {
    gameMode.value = newGameMode
    emit('newGame')
}
</script>
