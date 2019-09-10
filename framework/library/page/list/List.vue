// template engine for list generation (abstract)

<template>
    <div>
        <div id="menu">
            <template v-for="item in Input[Inputs.MENU]">
                <div v-if="item.type == Types.SEARCH" class="search">
                    <i class="fas fa-search"></i>
                    <input type="text" :placeholder="item.title">
                </div>
                <div v-if="item.type == Types.SELECT" class="select">
                    <span>{{ item.title }}</span>
                    <span class="selection">{{ item.selected }}</span>
                    <i class="fas fa-caret-down"></i>
                </div>
            </template>
        </div>
        <div id="adjust">
            <div id="sort">
                <span v-for="item in Input[Inputs.ADJUST].sortBy">
                    {{ item }} <i class="fas fa-caret-down"></i><i class="fas fa-caret-up"></i>
                </span>
            </div>
            <div id="view">
                <i v-for="item in Input[Inputs.ADJUST].viewBy" :class="'fas fa-' + item"></i>
            </div>
        </div>
        <div id="list">
            <div v-for="item in Input[Inputs.ACTIONS]" class="button">
                <span>
                    <i v-if="item.awesomeClassName" :class="'fas fa-' + item.awesomeClassName"></i> {{ item.title }}
                </span>
            </div>
            <div v-for="item in Input[Inputs.ITEMS]">
                <span class="title" @click="Select(item.title)">{{ item.title }}</span>
                <span v-for="clickable in item.clickable" class="clickable" @click="Select(clickable.title)">{{ clickable.title }}</span>
            </div>
        </div>
    </div>
</template>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import { Input } from 'F:/dev/framework/src/static/Provision'
import MAbstract from 'F:/dev/framework/src/components/MAbstract.vue'
import Interface from '../../interface'
const { Inputs, Properties, Events } = Interface.LIST

@Component
@Input([
    { type: [{ type: 1, title: '' }], alias: Inputs.MENU },
    { type: [{ awesomeClassName: '', title: '' }], alias: Inputs.ACTIONS },
    { type: [{ title: '', clickable: [{ title: '' }] }], alias: Inputs.ITEMS },
    { type: { sortBy: [''], viewBy: [''] }, alias: Inputs.ADJUST },    
])
export default class List extends Mixins(MAbstract)
{
    private readonly Inputs = Inputs
    private readonly Types = Properties.TYPES

    private Select(item: string)
    {
        this.Output(Events.NAVIGATE, item)
    }
}

</script>

<!------------------------------------------------------------------------------------->

<style lang="stylus" scoped>
#menu
    display flex
    height 5vh
    background-color black
    overflow hidden
    margin-bottom: 1vh

    div
        // width: 25% // hardcoded items vs two rules below to equal proportion the width
        flex-grow 1  
        flex-basis 0 
        transform skewX(-30deg)
        border-right 5px solid white
        overflow hidden
        padding 0 1vw
        color white
        font-family 'Roboto Condensed', sans

        &:last-of-type
            border none

        span
            display inline-block // for skewing

        *
            transform skewX(30deg)

        &:hover span, &:hover i
            color cyan

        &.search 
            i
                width: 10%
                text-align center

            input
                width: 90%
                background none
                border none
                outline none !important
                color cyan // somehow ::placeholder overwrites this
                height 100%

                &::placeholder
                    color: white

                &:focus::placeholder
                    color: transparent

        &.select
            display flex // not fucking with centering the block spans
            justify-content center
            align-items center
            cursor pointer

            span
                padding-right: 0.5vw //not margin because padding also needed when italics go out of frame

                &.selection
                    font-weight 100
                    font-style italic
                    opacity 0.75
                    color cyan
                    max-width 50%
                    overflow hidden
                    text-overflow ellipsis

#adjust
    font-family 'Roboto Condensed', sans
    margin-bottom 7.5vh

    div
        display inline-block  //to float without flex

    #sort            
        span
            margin-right 1vw

            &.active
                color cyan

                i
                    color initial

            i
                font-size 1.25vw
                height 100%
                vertical-align middle
                
                &:hover, &.active
                    color cyan

    #view
        float right

        i
            margin-left 1vw

        i.active, i:hover // IMPORTANT TO SIMPLIFY THE DEFINITIONS LATER ON (extend)
            color cyan

#list

    div
        padding: 1vh 1vw
        display: flex
        justify-content: flex-left
        align-items: baseline
        font-family: 'Roboto Condensed', sans

        &:hover
            background-color: rgba(0, 0, 0, 0.5)
            border-bottom: 1px solid cyan

            .title
                color: cyan

        span
            margin-right: 1vw

            &.clickable // this and others (ie .interface) defined in style.sass and added to class
                cursor: pointer

                &:hover
                    color: cyan
            
            &.title
                font-size: 2em
                text-transform: uppercase
                font-weight: bold
                cursor: pointer

        &.button
            color: cyan
            cursor: pointer
            font-size: 2em
            text-transform: uppercase
            text-shadow: 2px 2px black
            cursor: context-menu

            &:hover
                background: none 
                border: none

            span:hover
                text-shadow: none

        &.clickable:hover
            color: cyan
</style>



