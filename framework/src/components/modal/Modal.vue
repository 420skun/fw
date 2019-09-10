<template>

    <div id="frame" @click.self="$emit('exit')" :class="{'open': on}">
        <div id="modal">
            <span id="title">{{ title }}</span>
            <slot></slot>
        </div>
    </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Modal extends Vue
{
    @Prop(Boolean) on
    @Prop(String) title
}

</script>

<style lang="stylus" scoped>

#frame
    position absolute
    height 100vh
    width 100vw
    top 0
    z-index 100
    display flex
    justify-content center
    align-items center
    overflow hidden
    pointer-events none // important - pointer thorugh

    &.open
        pointer-events auto

        #modal
            clip-path inset(0 0 0 0)

    #modal
        padding 1%
        width 40%
        height 40%
        max-width 40%
        max-height 40%
        background-color rgba(0, 0, 0, 0.8)
        color: white

        clip-path inset(0 0 100% 0)
        transition clip-path 0.25s

        #title
            font-size 2em
            font-family 'Roboto Condensed', sans
            text-transform uppercase
            display block
            border-bottom 1px solid white
            height 15%
        
        #content
            display flex
            height 85%
            width 100%
            justify-content center
            align-items center

</style>
