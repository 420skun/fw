<template>
    <div>
        <Banner :input="{
            [Banner.Inputs.TITLE]: Input[Inputs.TITLE],
            [Banner.Inputs.LAYOUT]: Banner.Properties.LAYOUTS.CENTER,
            [Banner.Inputs.DETAILS]: [
                { meta: 'book', text: Input[Inputs.DETAILS].book, clickable: true, icon: '', value: 1 },
                { meta: 'category', text: Input[Inputs.DETAILS].category, clickable: true, icon: '', value: 1 },
            ]
        }" />
        <div id="quest-view">
            <p>{{ Input[Inputs.TEXT] }}</p>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import MContent from '../framework/components/MContent.vue'
import { Input } from '../framework/static/Provision'
import Interface from '../interface'
const { Inputs, Properties } = Interface.QUESTVIEW
import Banner from '../library/page/Banner.vue'
import LibInt from '../library/interface'

@Component({
    components: { Banner }
})
@Input([
    { alias: Inputs.TITLE, type: '' },
    { alias: Inputs.TYPE, type: 1, legal: Object.values(Properties.TYPES) },
    { alias: Inputs.TEXT, type: '' },
    { alias: Inputs.OPTIONS, type: [{ text: '', image: '' }] },
    { alias: Inputs.DETAILS, type: { book: '', category: '' } }
])
export default class QuestView extends Mixins(MContent)
{
    private Inputs = Inputs
    private Types = Properties.TYPES
    private Banner = LibInt.BANNER
}

</script>

