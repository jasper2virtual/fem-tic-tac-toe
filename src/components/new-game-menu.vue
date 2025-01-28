<template>
    <div class="flex flex-col gap-10">
        <div class="flex gap-2 justify-center">
            <img src="@/images/icon-x.svg" alt="X" class="w-8 h-8" />
            <img src="@/images/icon-o.svg" alt="O" class="w-8 h-8" />
        </div>
        <div>
            <player1-mark-selector />
        </div>
        <div class="flex flex-col gap-2">
            <button>NEW GAME (VS CPU)</button>
            <button>NEW GAME (VS PLAYER)</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import player1MarkSelector from './player1-mark-selector.vue'
</script>

