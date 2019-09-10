<template>
    <Read 
        id="parent" 
        :input="{ [Inputs.MARKDOWN]: Input[Inputs.MARKDOWN], [Inputs.HTML]: Input[Inputs.HTML] }" 
        @output="Passthrough($event)" 
    />
</template>

<script lang="ts">

import { Vue, Component, Mixins } from 'vue-property-decorator'
import MContent from '../framework/components/MContent.vue'
import Read from '../library/page/read/Read.vue'
import Interface from '../interface'
import { Input } from '../framework/static/Provision'

const { Inputs } = Interface.NOTEVIEW

@Component({ components: { Read } })
@Input([
    { type: '', alias: Inputs.MARKDOWN },
    { type: '', alias: Inputs.HTML }
])
export default class NoteView extends Mixins(MContent)
{
    private Inputs = Inputs

    // Read
}

</script>

<style lang="stylus" scoped>

    #parent
        margin-top 5vh

</style>

// parse classes
<style lang="stylus">

</style>

