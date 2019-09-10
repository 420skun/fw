<template>
    <div id="header" class="bg">
        <div class="item logo">
            <span>&nbsp;CHECKNOTE&nbsp;</span>
        </div>
        <div class="item logo overlay" :class="{'triggered': Input[Inputs.TRIGGER] === Items.LOGO}">
            <span @click="navigate(Items.LOGO)">&nbsp;CHECKNOTE&nbsp;</span>
        </div>

        <div id="panel" class="item">
            <div 
                v-for="item in Panel"
                :key="item.id"
                :class="{'triggered': Input[Inputs.TRIGGER] === item.id, 'disabled': Input[Inputs.HIDE].indexOf(item.id) != -1}"
            >
                <i :class="['fa', 'fa-' + item.awesomeClassName]" @click="Bus.Emit(Events.NAVIGATE, item)"></i>
            </div>
        </div>
    </div>
</template>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import MContent from '../MContent.vue'
import Bus from '../../static/Bus'

import { Interface } from '../../static/definition'
const { Properties, Inputs } = Interface.HEADER
import { Input } from '../../static/Provision'

@Component
@Input([
    { type: 1, alias: Inputs.TRIGGER, default: Properties.ITEMS.NONE },
    { type: [1], alias: Inputs.HIDE, default: [] }
])
export default class Header extends Mixins(MContent)
{    
    private Items = Properties.ITEMS
    private Inputs = Inputs

    private readonly Panel = [
        {id: Properties.ITEMS.NOTE, awesomeClassName: 'book'},
        {id: Properties.ITEMS.EXAM, awesomeClassName: 'pen'},
        {id: Properties.ITEMS.MENU, awesomeClassName: 'bars'},
    ]
}


</script>

<!------------------------------------------------------------------------------------->

<style lang="stylus" scoped>
// confusing; rewrite when refactoring
#header
    height 5vh
    width 100%
    position absolute
    z-index 2
    display flex
    justify-content rows

    // when panel items are hard to see
    &.bg:hover
        transition background 0.25s
        background-color rgba(0, 0, 0, 0.65)

    &:hover .item.logo.overlay span,
    .item.logo.overlay.triggered span,
    &:hover .item#panel i,
    .item#panel div.triggered i
        clip-path inset(0 0 0 0)
    
    .item
        height 100%
        display flex
        justify-content space-around
        align-items center

        span, i
            font-size 1.5vw
    
        &.logo
            width 15%

            span
                cursor context-menu
                opacity 0.25
                font-family logo

            &.overlay
                position absolute

                span
                    opacity 1
                    
        &#panel
            width 85%

            .disabled
                opacity 0
                pointer-events none
        
        &#panel i, &.logo.overlay span
            transition clip-path 0.2s
            clip-path inset(0 0 100% 0)
            color cyan

</style>



