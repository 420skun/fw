<template>
    <div id="sidebar" 
        :class="{
            'open': State == States.OPEN,
            'peek': State == States.PEEK || State == States.LOCKED,
            'lock': State == States.LOCKED
        }" 
    >
        <slot></slot>
    </div>
</template>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import MContent from '../MContent.vue'
import { Interface } from '../../static/definition'
const { Inputs, Properties } = Interface.SIDEBAR

@Component
export default class Sidebar extends Mixins(MContent)
{
    private get State() { return this.Input[Inputs.STATE.alias] }
    private get States() { return Properties.STATES }
}

</script>

<!------------------------------------------------------------------------------------->

<style lang="stylus" scoped>

#sidebar
    position absolute
    z-index 1
    height 100%
    width 15%
    left -15%
    background-color black
    padding-top 10vh
    transition transform 0.25s, opacity 0.25s

    &.open, &.peek:hover
    // &.open
        transform translateX(100%)
        background-color rgba(0, 0, 0, 0.75)

        & > div // slot
            visibility initial

    &.peek
        transform translateX(10%)
        
        &.locked
            background-color rgba(0, 0, 0, 0.25)
            pointer-events none

    & > div // to style the slot
        transition visibility 0.1s
        visibility hidden
        max-height 90vh
        overflow-y auto
        width 100%
        padding 0 1vw

</style>



