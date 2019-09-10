
<script lang="ts">

import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import MContent from '../MContent.vue'
import { Interface } from '../../static/definition'

@Component
export default class MDriver extends Mixins(MContent)
{
    // @Watch('input', { immediate: true })
    // _()
    // {
    //     const output = this.DriverOutput() as unknown
    //     if (output) this.Answer(output)
    // }

    created()
    {
        // this.onRefresh.push(() =>
        // {
        //     const output = this.DriverOutput() as unknown
        //     if (output) this.Answer(output)
        // })
    
        const output = this.DriverOutput() as unknown
        if (output) this.Answer(output)
    }

    protected DriverOutput() // override
    {
        return
    }
}

</script>
