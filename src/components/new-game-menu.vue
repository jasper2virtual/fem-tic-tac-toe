<template>
    <div class="flex flex-col gap-10">
        <div class="flex gap-2 justify-center">
            <img src="@/images/icon-x.svg" alt="X" class="w-8 h-8" />
            <img src="@/images/icon-o.svg" alt="O" class="w-8 h-8" />
        </div>
        <div class="flex flex-col gap-2 bg-app-semi-dark-navy">
            <div>PICK PLAYER 1’S MARK</div>
            <div class="flex gap-2 justify-center">
                <button class="flex-1 switch-button">
                    <i v-html="iconXSvg" />
                </button>
                <button class="flex-1 switch-button">
                    <i v-html="iconOSvg" />
                </button>
            </div>
            <div>REMEMBER : X GOES FIRST</div>
        </div>
        <div class="flex flex-col gap-2">
            <button>NEW GAME (VS CPU)</button>
            <button>NEW GAME (VS PLAYER)</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import iconXSvg from '@/images/icon-x.svg?raw';
import iconOSvg from '@/images/icon-o.svg?raw';
</script>
<style lang="scss" scoped>
.switch-button {
    &>i>svg {
        width: 32px;
        height: 32px;
    }
}
</style>