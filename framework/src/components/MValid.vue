
<script lang="ts">

import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { Bus, Provision, Console } from '../static/definition'
import { cloneDeep, isPlainObject, isEqual, isArray } from 'lodash'

@Component
export default class MValid extends Vue
{
    @Prop({ type: Object, default: () => { return {} } }) input?: { [property: string]: any }
    protected Input: { [property: string]: any } = {}

    protected readonly name = this.$options.name as string
    protected Interface = Provision.Input[this.name] || {}
    protected readonly Bus = new Bus(this.name) // probably the same as the FWI part

    private substitutes: string[] = []

    protected Refresh()
    {
        this.Input = cloneDeep(this.input)

        const empty = Object.keys(this.Interface).length == 0

        for (const i of Object.values(this.Interface))
        {

            if (!this.Input[i.alias])
            {
                this.substitutes.push(i.alias)
                this.Input[i.alias] = cloneDeep(i.default || i.type)
            }
            
            if (!this.isLegal(this.Input[i.alias], i.legal))  console.log(this.name, i.alias, 'illegal input') //throw new Error('illegal input')
            if (!this.checkType(this.Input[i.alias], i.type)) console.log(this.name, i.alias, 'bad input type') //throw new Error('bad input type')
        }
    }

    protected Provided(...aliases: string[])
    {
        for (const a of aliases)
            if (!this.Input.hasOwnProperty(a) || this.substitutes.includes(a)) return false

        return true
    }

    private isLegal(item: any, legal?: any[])
    {
        if (!legal) return true

        for (const l of legal)
        {
            if (isEqual(l, item)) return true
        }

        return false
    }

    private checkType(item: any, type: any)
    {
        switch (true)
        {
            case typeof type != typeof item: return false
            case isPlainObject(type): // is object
                if (!isPlainObject(item)) return false

                for (const t of Object.keys(type))
                    if (!this.checkType(item[t], type[t])) return false

                break;
            case isArray(type): // is array
                if (!isArray(item)) return false

                for (const i in item)
                    if (!this.checkType(item[i], type.length == 1 ? type[0] : type[i])) return false
        }

        return true
    }

    protected onRefresh: Function[] = []

    created() 
    {
        this.Refresh()

        this.Bus.On(50, component => 
        {
            if (component == this.name) this.onRefresh.forEach(action => action())
        })

        this.onRefresh.push(this.Refresh)
    }

    destroyed()
    {
        this.Bus.Off(50)
    }
}

</script>
