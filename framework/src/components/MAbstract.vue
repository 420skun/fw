
<script lang="ts">

import { Vue, Component, Mixins } from 'vue-property-decorator'
import MContent from './MContent.vue'

@Component
export default class MAbstract extends Mixins(MContent)
{}

</script>
