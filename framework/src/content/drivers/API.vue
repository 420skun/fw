
<template></template>


<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator'
import MDriver from '../../components/drivers/MDriver.vue'
import { Input } from '../../static/Provision'
import { Interface } from '../../static/definition'
const { Events, Inputs, Properties, Errors } = Interface.API

@Component
@Input([
    { alias: Inputs.URL, type: '' },
    { alias: Inputs.METHOD, type: Properties.METHODS.GET, legal: Object.values(Properties.METHODS) },
    { alias: Inputs.DATA, type: {} }
])
export default class API extends Mixins(MDriver)
{
    DriverOutput()
    {
        if (!this.Provided(Inputs.URL)) return

        const url = this.Input[Inputs.URL]
        const method = this.Input[Inputs.METHOD]
        const data = this.Input[Inputs.DATA]
        const init = { headers: {"Content-type": "application/json; charset=UTF-8"} }

        if (method != Properties.METHODS.GET) 
            Object.assign(init, { method: method, body: JSON.stringify(data) })

        fetch(this.Input[Inputs.URL], init)
            .then(
                rsp => rsp.text().then(txt => 
                {
                    try { this.Answer(JSON.parse(txt)) }
                    catch { this.Error(Errors.JSON); this.Answer(txt) }
                }),
                err => this.Error(Errors.URL)
            )
    }
}

</script>
