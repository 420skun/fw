<template></template>

<script lang="ts">

import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import MDriver from '../framework/components/drivers/MDriver.vue'
import { Input } from '../framework/static/Provision'
import Interface from '../interface'
const { Inputs, Properties } = Interface.QUERY

@Component
@Input([
    { alias: Inputs.QUERY, type: 1, legal: Object.values(Properties.QUERIES) },
    { alias: Inputs.ID, type: 0 }
])
export default class Query extends Mixins(MDriver)
{
    DriverOutput()
    {
        if (!this.Provided(Inputs.QUERY)) return

        this.Framework.Drivers.Get('API')
            .Configure(Interface.FW.API.Inputs.URL, 'cycek cipa')
            .Error(Interface.FW.API.Errors.URL, err => alert('error'))
    }
}

</script>
