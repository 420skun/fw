
<template>
    <div class="banner" :class="{
        'left': Input[Inputs.LAYOUT] == Layouts.LEFT,
        'center': Input[Inputs.LAYOUT] == Layouts.CENTER
    }">
        <span id="title">{{ Input[Inputs.TITLE] }}</span>
        <div id="details">
            <span v-for="detail in Input[Inputs.DETAILS]" :key="detail.title" @click="detail.clickable ? Navigate(detail.meta, detail.value) : null" > 
                <i v-if="detail.icon" :class="'fa fa-' + detail.icon"></i> {{ detail.text }} 
            </span>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Mixins } from 'vue-property-decorator'
import MAbstract from 'F:/dev/framework/src/components/MAbstract.vue'
import { Input } from 'F:/dev/framework/src/static/Provision'
import Interface from '../interface'
const { Inputs, Properties } = Interface.BANNER

@Component
@Input([
    { alias: Inputs.TITLE, type: '' },
    { alias: Inputs.DETAILS, type: [{ meta: '', text: '', clickable: false, icon: '', value: 1 }] },
    { alias: Inputs.LAYOUT, type: Properties.LAYOUTS.LEFT, legal: Object.values(Properties.LAYOUTS) }
])
export default class Banner extends Mixins(MAbstract)
{
    private Inputs = Inputs
    private Layouts = Properties.LAYOUTS
}

</script>

<style lang="stylus">

.banner
    height 10vh
    background-color black

    span
        color white

    &.center
        display flex
        flex-direction column
        justify-content center
        align-items center


</style>
