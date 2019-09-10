<template>
    <div>
        <p>{{ data }}</p>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Mixins } from 'vue-property-decorator'
import MContent from '../../components/MContent.vue'
import MModal from '../../components/modal/MModal.vue'

@Component
export default class Info extends Mixins(MContent, MModal) {}

</script>

<style lang="stylus" scoped>
    
    

</style>

