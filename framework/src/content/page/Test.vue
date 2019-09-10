<template>
    <div> sex {{ input }}</div>
</template>

<script lang="ts">

import { Vue, Component, Mixins, Watch } from 'vue-property-decorator'
import MContent from '../../components/MContent.vue'
import MPage from '../../components/page/MPage.vue'
import Bus from '../../static/Bus'

@Component
export default class Test extends Mixins(MContent, MPage)
{}

</script>

