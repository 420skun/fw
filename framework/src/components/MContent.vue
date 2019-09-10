
<script lang="ts">

import { Vue, Component, Prop, Watch, Mixins } from 'vue-property-decorator'
import { TEvent, TEventMeta, THandler } from '../static/Bus'
import MValid from './MValid.vue'
import { Interface, Bus, Provision, IFramework } from '../static/definition'
const ANSWER = Interface.MCONTENT.Events.ANSWER
const ERROR = Interface.MCONTENT.Events.ERROR
const FRAMEWORK = Interface.MCONTENT.Inputs.FW

@Component
export default class MContent extends Mixins(MValid)
{
    protected Output(event: TEvent, data: any) { this.$emit('output', { event: event, data: data }) }
    protected readonly Answer = (data: any) => this.Output(ANSWER, data)
    protected readonly Error = (error: TEvent) => this.Output(ERROR, error)
    protected readonly Passthrough = (event: TEventMeta) => this.Answer(event.data)

    protected Handlers: { [event: number]: THandler } = {}

    protected readonly Framework = Provision.proxy.Framework as IFramework

    mounted()
    {
        for (const event of Object.keys(this.Handlers) as unknown as number[])
        {
            this.Bus.On(event, this.Handlers[event])
        }
    }
}

</script>
