<template>
    <div>
        <select>
            <option v-for="option in data" value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Mixins } from 'vue-property-decorator'
import MContent from '../../components/MContent.vue'
import MModal from '../../components/modal/MModal.vue'

@Component
export default class Select extends Mixins(MContent, MModal) {}

</script>

<style lang="stylus" scoped>

</style>

