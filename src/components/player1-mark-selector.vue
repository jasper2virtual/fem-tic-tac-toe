<template>
    <div class="flex flex-col items-center gap-2 bg-app-semi-dark-navy p-4 rounded-xl
    shadow-[0_8px_0_0_#10212A]
    ">
        <div class="app-text-heading-xs text-app-silver">PICK PLAYER 1’S MARK</div>
        <label class=" p-2 bg-app-dark-navy grid rounded-md self-stretch">
            <input type="checkbox" true-value="X" false-value="O" v-model="player1mark"
                class="appearance-none col-span-full row-span-full" />
            <div class="col-span-full row-span-full grid grid-cols-2 place-items-center p-2">
                <i v-html="iconXSvg" ref="iconXRef" class="icon-x-o" :class="{ 'mark-selected': player1mark == 'X' }" />
                <i v-html="iconOSvg" ref="iconORef" class="icon-x-o" :class="{ 'mark-selected': player1mark == 'O' }" />
            </div>
            <div class="col-span-full row-span-full relative">
                <div class="absolute h-full w-1/2 bg-app-silver hover:bg-app-silver-hover rounded-md transition-[left] duration-500"
                    :class="{ 'left-0': player1mark == 'X', 'left-1/2': player1mark == 'O' }"></div>
            </div>
        </label>
        <div class=" app-text-body text-app-silver">REMEMBER : X GOES FIRST</div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, useTemplateRef, inject } from 'vue'
import iconXSvg from '/src/images/icon-x.svg?raw'
import iconOSvg from '/src/images/icon-o.svg?raw'

const iconXRef = useTemplateRef('iconXRef')
const iconORef = useTemplateRef('iconORef')
onMounted(() => {
    const iconXSvgElement = iconXRef.value?.querySelector('svg') as SVGElement
    const iconOSvgElement = iconORef.value?.querySelector('svg') as SVGElement
    [iconXSvgElement, iconOSvgElement].forEach((svgElement) => {
        svgElement.setAttribute('viewBox', '0 0 64 64')
        svgElement.setAttribute('width', '32')
        svgElement.setAttribute('height', '32')
    })
})
const player1mark = inject('player1mark')
</script>
<style lang="scss" scoped>
@use "/src/styles/main.scss";

.icon-x-o {
    @apply z-10;

    & :deep(>svg>path) {
        @apply transition-[fill] duration-500;
        @apply fill-app-silver
    }
}

.icon-x-o.mark-selected {
    & :deep(>svg>path) {
        @apply fill-app-dark-navy
    }
}
</style>