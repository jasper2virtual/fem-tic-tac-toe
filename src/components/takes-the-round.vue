<template>
    <modal-prompt>
        <div class="flex flex-col gap-4 items-center justify-center">
            <div class=" text-app-silver app-text-heading-xs">{{ props.message }}</div>
            <div class=" app-text-heading-l flex gap-4 items-center" :class="{
                'text-app-light-blue': props.whoWin == 'X',
                'text-app-light-yellow': props.whoWin == 'O'
            }">
                <img v-if="props.whoWin == 'X'" src="/src/images/icon-x.svg" />
                <img v-if="props.whoWin == 'O'" src="/src/images/icon-o.svg" />
                TAKES THE ROUND
            </div>
            <div class="flex gap-4">
                <button class="app-silver-button" @click="$emit('quit')">QUIT</button>
                <button class="app-yellow-button" @click="$emit('nextRound')">NEXT ROUND</button>
            </div>
        </div>
    </modal-prompt>
</template>
<script lang="ts" setup>
import modalPrompt from './modal-prompt.vue'
const props = defineProps<{
    whoWin: string;
    message: string;
}>()

</script>