<template>
    <div class="flex flex-col gap-5">

        <Teleport to="#mobile-header" :disabled="isTablet">
            <div class="grid grid-cols-3 gap-4 items-center">
                <div class="flex gap-2">
                    <img src="@/images/icon-x.svg" alt="X" class="w-8 h-8" />
                    <img src="@/images/icon-o.svg" alt="O" class="w-8 h-8" />
                </div>
                <div class="app-text-heading-xs text-app-silver shadow-[0_4px_0_0_#10212A] p-2 rounded-lg
                    mx-auto flex gap-4 items-center bg-app-semi-dark-navy">
                    <i v-show="whoTurn == 'O'" ref="iconORef" class="who-turn-icon" v-html="iconOSvg"></i>
                    <i v-show="whoTurn == 'X'" ref="iconXRef" class="who-turn-icon" v-html="iconXSvg"></i>
                    TURN
                </div>
                <button
                    class=" justify-self-end shadow-[0_4px_0_0_#6B8997] bg-app-silver hover:bg-app-silver-hover p-2 rounded-lg cursor-pointer"
                    v-html="iconRestartSvg" />
            </div>

        </Teleport>
        <div>
            <game-board :gameBoardState="gameBoardState" @cellClick="cellClick" />
        </div>
        <div class="grid grid-cols-3 gap-4 text-app-dark-navy">

            <div class="win-count-box bg-app-light-blue">
                <div class="title ">X ({{ }})</div>
                <div class="count ">{{ xWinCount }}</div>
            </div>
            <div class="win-count-box bg-app-silver">
                <div class="title ">TIES</div>
                <div class="count ">{{ tiesCount }}</div>
            </div>
            <div class="win-count-box bg-app-light-yellow">
                <div class="title ">O ({{ }})</div>
                <div class="count ">{{ oWinCount }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import iconXSvg from '@/images/icon-x.svg?raw'
import iconOSvg from '@/images/icon-o.svg?raw'
import iconRestartSvg from '@/images/icon-restart.svg?raw'
import gameBoard from './game-board.vue'
const props = defineProps<{
    gameMode: 'vsCpu' | 'vsPlayer'
}>()
const whoTurn = ref<'X' | 'O'>('X')

const iconORef = useTemplateRef('iconORef')
const iconXRef = useTemplateRef('iconXRef')
onMounted(() => {
    [iconORef, iconXRef].forEach((iconRef) => {
        const iconElement = iconRef.value?.querySelector('svg') as SVGElement
        iconElement.setAttribute('viewBox', '0 0 64 64')
        iconElement.setAttribute('width', '32')
        iconElement.setAttribute('height', '32')
    })
})
const styles = getComputedStyle(document.documentElement)
const tabletBreakPoint = styles.getPropertyValue("--breakpoint-app-tablet")
const isTablet = ref<boolean>(true)
onMounted(() => {
    updateIsTablet()
    window.addEventListener('resize', updateIsTablet)
})
const updateIsTablet = () => {
    isTablet.value = window.matchMedia(`(min-width: ${tabletBreakPoint})`).matches
}
onUnmounted(() => {
    window.removeEventListener('resize', updateIsTablet)
})
const gameBoardState = ref<Array<'X' | 'O' | null>>(Array(9).fill(null))
const cellClick = (index: number) => {
    gameBoardState.value[index] = whoTurn.value
    whoTurn.value = whoTurn.value === 'X' ? 'O' : 'X'
}
const xWinCount = ref<number>(0)
const tiesCount = ref<number>(0)
const oWinCount = ref<number>(0)
</script>
<style lang="scss" scoped>
@use "@/styles/main.scss";

.who-turn-icon :deep(>svg>path) {
    @apply fill-app-silver;
}

.win-count-box {
    @apply aspect-[140/72] rounded-lg flex flex-col justify-center items-center;

    &>.title {
        @apply app-text-body;
    }

    &>.count {
        @apply app-text-heading-m;
    }
}
</style>