<template>
    <div>
        <div id="header">
            {{ Input[Inputs.TITLE] }}
        </div>

        <div v-if="State == States.READ" id="text" v-html="Input[Inputs.HTML]">

        </div>

        <div v-if="State == States.EDIT" id="edit">
            <textarea v-model="Markdown"></textarea>
            <button @click="edit">asdasd</button>
        </div>

    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import Parse from './Markdown'
import MAbstract from 'F:/dev/framework/src/components/MAbstract.vue'
import { Input } from 'F:/dev/framework/src/static/Provision'
import Interface from '../../interface'
const { Inputs, Properties } = Interface.READ

@Component
@Input([
    { type: '', alias: Inputs.MARKDOWN },
    { type: '', alias: Inputs.HTML },
    { type: '', alias: Inputs.TITLE },
    { type: {}, alias: Inputs.MDCLASSES } // precise definition when MValid upgraded
])
export default class Read extends Mixins(MAbstract)
{
    private Inputs = Inputs
    private States = Properties.STATES
    private State = this.States.EDIT
    private Markdown = '' // this is too early for getting from MValid.Input

    mounted()
    {
        this.Markdown = this.Input[Inputs.MARKDOWN]
    }

    private edit() 
    {
        this.Answer({ md: this.Markdown, html: Parse(this.Markdown) })
        this.State = this.States.READ
    }
}

</script>

// markdown style
<style lang="stylus">
  
    p.md

        margin-top 1vh

        .highlight
            background-color red

        .important
            font-weight bold

        .name
            font-style italic

</style>