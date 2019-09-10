
<template>
    <div id="page" :class="{ 'narrow': true, 'low': true }">
        <span id="header" v-if="title">{{ title }}</span>
        <slot></slot>
    </div>
</template>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import MContent from '../MContent.vue'

@Component
export default class Page extends Mixins(MContent)
{
    @Prop(Boolean) narrow
    @Prop(String) title
}
</script>

<!------------------------------------------------------------------------------------->

<style lang="stylus" scoped>

#page
    max-height 100vh
    overflow-y auto
    padding-left 5vw
    padding-right 5vw
    padding-bottom 10vh

    &::-webkit-scrollbar
        visibility hidden

    &.low
        padding-top 30vh

    @media (min-aspect-ratio: 16/9)
        &.narrow
            padding-left 25vw
            padding-right 25vw

    #header
        font-size 3vw
        font-weight bold
        font-family 'Oswald', sans

        display block
        border-bottom 3px solid black
        text-transform uppercase
        margin-bottom 1vw

</style>


