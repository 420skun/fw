<template>
    <list :input="{
        [Inputs.ITEMS]: Input[Inputs.ITEMS],
        [Inputs.ADJUST]: Adjust,
        [Inputs.MENU]: Menu,
        [Inputs.ACTIONS]: Actions
    }" @output="Bus.Handle($event)"/>
</template>

<script lang="ts">

import { Vue, Component, Mixins } from 'vue-property-decorator'
import List from '../library/page/list/List.vue'
import MContent from '../framework/components/MContent.vue'
import { Input, Expose } from '../framework/static/Provision'
import { Interface as FWInt, Bus } from '../framework/static/definition'
import LibInt from '../library/interface'
const { Inputs, Properties } = LibInt.LIST

@Component({
    components: { List }
})
@Input([
    { type: [{ title: '', clickable: [{ title: '' }] }], alias: Inputs.ITEMS }
])
@Expose()
export default class QuestList extends Mixins(MContent)
{
    private readonly Inputs = Inputs

    private readonly Menu = 
    [
        {type: Properties.TYPES.SEARCH, title: 'Search'},
        {type: Properties.TYPES.SELECT, title: 'Category'},
        {type: Properties.TYPES.SELECT, title: 'Tag'},
        {type: Properties.TYPES.SELECT, title: 'Book'}
    ]

    private readonly Adjust = 
    {
        sortBy: ['Date', 'Score', 'Plays', 'Difficulty'],
        viewBy: ['book', 'bookmark', 'tag']
    }

    private readonly Actions = [{awesomeClassName: 'plus', title: 'add'}]

    created()
    {
        this.Handlers = 
        {
            [LibInt.LIST.Events.NAVIGATE]: data => { Bus.Emit(FWInt.FRAMEWORK.Events.NAVIGATE, data); this.Answer(data) }
        }
    }
}

</script>
