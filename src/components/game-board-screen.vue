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
                    @click="showRestartGame = true" v-html="iconRestartSvg" />
            </div>

        </Teleport>
        <div>
            <game-board :gameBoardState="gameBoardState" :lockBoard="lockBoard" :isCpuTurn="isCpuTurn"
                @cellClick="cellClick" />
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
    <TransitionGroup>
        <round-tied v-if="showRoundTied" @nextRound="nextRound" @quit="$emit('restartGame')" />
        <restart-game v-if="showRestartGame" @restart="$emit('restartGame')" @cancel="showRestartGame = false" />
        <takes-the-round v-if="showTakesTheRound" :whoWin="showTakesTheRound.whoWin"
            :message="showTakesTheRound.message" @nextRound="nextRound" @quit="$emit('restartGame')" />
    </TransitionGroup>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, useTemplateRef, inject, watch, defineEmits, nextTick } from 'vue'
import iconXSvg from '@/images/icon-x.svg?raw'
import iconOSvg from '@/images/icon-o.svg?raw'
import iconRestartSvg from '@/images/icon-restart.svg?raw'
import gameBoard from './game-board.vue'
import roundTied from './round-tied.vue'
import restartGame from './restart-game.vue'
import takesTheRound from './takes-the-round.vue'
import Minimax from 'tic-tac-toe-minimax'
defineEmits(['restartGame'])
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
const gameBoardState = ref<Array<'X' | 'O' | number>>([])

const isRoundEnd = ref<boolean>(true)
onMounted(() => {
    cleanGameBoardState()
    nextTick(() => {
        isRoundEnd.value = false
    })
})

const isCpuTurn = computed(() => {
    if (isRoundEnd.value) return false
    if (gameMode.value == 'vsCpu') {
        if (whoTurn.value == 'X' && player1mark.value == 'O') return true
        if (whoTurn.value == 'O' && player1mark.value == 'X') return true
    }
    return false
})

const cellClick = (index: number) => {
    gameBoardState.value[index] = whoTurn.value
    whoTurn.value = whoTurn.value === 'X' ? 'O' : 'X'
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
        setTimeout(() => {
            const computerMove = ComputerMove(gameBoardState.value, {
                huPlayer: xIs.value == 'CPU' ? 'O' : 'X',
                aiPlayer: xIs.value == 'CPU' ? 'X' : 'O'
            }, 'Hard')
            if (typeof computerMove === 'number') {
                gameBoardState.value[computerMove] = whoTurn.value
                whoTurn.value = whoTurn.value === 'X' ? 'O' : 'X'
            }
        }, 1000);
    }
})
watch(whoTurn, () => {
    const whoWin = checkWhoWin()
    const vsCpuWonMessage = 'YOU WON!'
    const vsCpuLostMessage = 'OH NO, YOU LOST...'
    const player1WinMessage = 'PLAYER 1 WINs!'
    const player2WinMessage = 'PLAYER 2 WINs!'
    if (whoWin == null) return
    else if (whoWin == 'X') {
        xWinCount.value++
        showTakesTheRound.value = {
            whoWin: 'X',
            message: {
                'YOU': vsCpuWonMessage,
                'CPU': vsCpuLostMessage,
                'P1': player1WinMessage,
                'P2': player2WinMessage
            }[xIs.value]
        }
    }
    else if (whoWin == 'O') {
        oWinCount.value++
        showTakesTheRound.value = {
            whoWin: 'O',
            message: {
                'YOU': vsCpuWonMessage,
                'CPU': vsCpuLostMessage,
                'P1': player1WinMessage,
                'P2': player2WinMessage
            }[oIs.value]
        }
    }
    else if (whoWin == 'TIE') {
        tiesCount.value++
        showRoundTied.value = true
    }
    isRoundEnd.value = true
})
const showRoundTied = ref<boolean>(false)
const showTakesTheRound = ref<false | { whoWin: string, message: string }>(false)
const showRestartGame = ref<boolean>(false)

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

const nextRound = () => {
    cleanGameBoardState()
    isRoundEnd.value = false
    showRoundTied.value = false
    showTakesTheRound.value = false
    nextTick(() => {
        whoTurn.value = 'X'
    })
}

const cleanGameBoardState = () => {
    gameBoardState.value = (Array(9).fill(null).map((_, index) => index))
}

watch(isRoundEnd, () => {
    if (isRoundEnd.value) {
        cleanGameBoardState()
    }
})

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

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>