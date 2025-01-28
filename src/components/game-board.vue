<template>
    <div class="game-board grid grid-cols-3 grid-rows-3 gap-4">
        <button v-for="(cellState,index) in props.gameBoardState" :key="index" @click="$emit('cellClick',index)"
            :disabled="cellState !== null" class="aspect-square
            bg-app-semi-dark-navy
            shadow-[0_4px_0_0_#10212A]
            rounded-2xl flex items-center justify-center" :class="{
                'cursor-pointer': cellState === null,
                'cursor-not-allowed': cellState !== null
            }">
            <img class="w-[45%] aspect-square" v-if="cellState==='X'" src="@/images/icon-x.svg" alt="X" />
            <img class="w-[45%] aspect-square" v-else-if="cellState==='O'" src="@/images/icon-o.svg" alt="O" />
        </button>
    </div>
</template>
<script lang="ts" setup>
const props=defineProps<{
    gameBoardState:Array<'X'|'O'|null>
}>()
</script>