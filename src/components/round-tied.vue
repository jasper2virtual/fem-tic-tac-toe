<template>
    <modal-prompt>
        <div class="flex flex-col gap-4 items-center justify-center">
            <div class=" text-app-silver app-text-heading-l">
                ROUND TIED
            </div>
            <div class="flex gap-4">
                <button class="app-silver-button" @click="currentScreen='NewGameMenu'">QUIT</button>
                <button class="app-yellow-button">NEXT ROUND</button>
            </div>
        </div>
    </modal-prompt>
</template>
<script lang="ts" setup>
import {inject} from 'vue'
import modalPrompt from './modal-prompt.vue'
const currentScreen = inject('currentScreen')
</script>