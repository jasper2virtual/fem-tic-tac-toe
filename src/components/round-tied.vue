<template>
    <modal-prompt>
        <div class="flex flex-col gap-4 items-center justify-center">
            <div class=" text-app-silver app-text-heading-l">
                ROUND TIED
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

</script>