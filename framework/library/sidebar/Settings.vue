<template>
    <div>
        <template v-for="section in data[Inputs.SETTINGS]">
            <span class="section">{{ section.section }}</span>
            <div>
                <div class="setting" v-for="setting in section.settings" @click="change(setting.id)">
                    <span>{{ setting.name }}</span>
                    <span class="current">{{ setting.value === null ? setting.default : setting.value }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import MContent from '../../components/MContent.vue'
import MSidebar from '../../components/sidebar/MSidebar.vue'
import Bus from '../../static/Bus'

import { Interface } from '../../static/definition'
const { Inputs, Events, Properties } = Interface.SIDEBAR

@Component
export default class Settings extends Mixins(MContent, MSidebar)
{
    private change = (setting: number) => this.pass(23, setting)

    private Inputs = Inputs
}

</script>

<!------------------------------------------------------------------------------------->

<style lang="stylus" scoped>

    span
        font-family: sans-serif
        color: white
        word-wrap: break-word
        font-weight: bold

        &.section
            cursor: context-menu
            display: block
            font-size: 1.25em
            border-bottom: 1px solid black
            text-transform: uppercase
    
    .setting
        cursor: pointer    
        margin-top: 1vh
        margin-bottom: 1vh
        padding: 1vh 0.5vw
        background-color: rgba(0, 0, 0, 0.5)

        span.current
                float: right
                font-weight: initial
                font-style: italic

</style>
