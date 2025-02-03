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
            <game-board :gameBoardState="gameBoardState" :lockBoard="lockBoard" @cellClick="cellClick" />
        </div>
        <div class="grid grid-cols-3 gap-4 text-app-dark-navy">

            <div class="win-count-box bg-app-light-blue">
                <div class="title ">X ({{ xIs }})</div>
                <div class="count ">{{ xWinCount }}</div>
            </div>
            <div class="win-count-box bg-app-silver">
                <div class="title ">TIES</div>
                <div class="count ">{{ tiesCount }}</div>
            </div>
            <div class="win-count-box bg-app-light-yellow">
                <div class="title ">O ({{ oIs }})</div>
                <div class="count ">{{ oWinCount }}</div>
            </div>
        </div>
    </div>
    <round-tied v-if="showRoundTied" />
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef, inject, watch, getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
import iconXSvg from '@/images/icon-x.svg?raw'
import iconOSvg from '@/images/icon-o.svg?raw'
import iconRestartSvg from '@/images/icon-restart.svg?raw'
import gameBoard from './game-board.vue'
import roundTied from './round-tied.vue'
import Minimax from 'tic-tac-toe-minimax'
const { GameStep, ComputerMove } = Minimax

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
const gameBoardState = ref<Array<'X' | 'O' | number>>(Array(9).fill(null).map((val, index) => index))
const isCpuTurn = ref<boolean>(false)
onMounted(() => {
    isCpuTurn.value = false
    if (gameMode.value == 'vsCpu' && player1mark.value == 'O') {
        isCpuTurn.value = true
    }
})
const cellClick = (index: number) => {
    gameBoardState.value[index] = whoTurn.value
    instance?.ctx?.$forceUpdate();
    whoTurn.value = whoTurn.value === 'X' ? 'O' : 'X'
    if (gameMode.value == 'vsCpu') {
        isCpuTurn.value = true
    }
}
const xWinCount = ref<number>(0)
const tiesCount = ref<number>(0)
const oWinCount = ref<number>(0)
const gameMode = inject('gameMode')
const player1mark = inject('player1mark')
const xIs = computed(() => {
    if (gameMode.value == 'vsCpu') {
        if (player1mark.value == 'X') return 'YOU'
        else return 'CPU'
    } else {
        if (player1mark.value == 'X') return 'P1'
        else return 'P2'
    }
})
const oIs = computed(() => {
    if (xIs.value == 'YOU') return 'CPU'
    else if (xIs.value == 'CPU') return 'YOU'
    else return xIs.value == 'P1' ? 'P2' : 'P1'
})
watch(isCpuTurn, (newValue) => {
    if (isRoundEnd.value) return
    if (newValue) {
        const computerMove = ComputerMove(gameBoardState.value, {
            huPlayer: xIs.value == 'CPU' ? 'O' : 'X',
            aiPlayer: xIs.value == 'CPU' ? 'X' : 'O'
        }, 'Hard')
        gameBoardState.value[computerMove] = whoTurn.value
        whoTurn.value = whoTurn.value === 'X' ? 'O' : 'X'
        isCpuTurn.value = false
    }
})
watch(whoTurn, () => {
    const whoWin = checkWhoWin()
    if (whoWin == null) return
    else if (whoWin == 'X') xWinCount.value++
    else if (whoWin == 'O') oWinCount.value++
    else if (whoWin == 'TIE') {
        tiesCount.value++
        showRoundTied.value = true
    }
    isRoundEnd.value = true
})
const showRoundTied = ref<boolean>(false)
const showTakesTheRound = ref<boolean>(false)
const showRestartGame = ref<boolean>(false)
const isRoundEnd = ref<boolean>(false)

const checkWhoWin = (): 'X' | 'O' | 'TIE' | null => {
    const checkX = GameStep(gameBoardState.value,
        {
            huPlayer: 'X',
            aiPlayer: 'O'
        }, 'Easy')
    if (checkX.winner == 'huPlayer') return 'X'
    const checkO = GameStep(gameBoardState.value,
        {
            huPlayer: 'O',
            aiPlayer: 'X'
        }, 'Easy')
    if (checkO.winner == 'huPlayer') return 'O'
    const turnCount = gameBoardState.value.filter(cell => cell == 'O' || cell == 'X').length
    if (turnCount == 9) return 'TIE'
    return null
}
const lockBoard = computed(() => isCpuTurn.value || isRoundEnd.value)
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