
import W from './Window'
import { Vue } from 'vue-property-decorator'
import { Item } from './Components';
import { VueClass } from 'vue-class-component/lib/declarations';
import Bus, { THandler } from './Bus'
import Random from './Random'

export type TInterface = { type: any, alias: string, default?: any, legal?: any[], required?: boolean }[]

export const Provision =
{
    get proxy(): { 
        input: { [component: string]: TInterface },
        imports: { [component: string]: typeof Vue },
        components: { [item: string]: Item }
    } { return W.Get('provision') || W.Set('provision', { input: {}, imports: {}, components: {} }) },

    get Input(): { [component: string]: TInterface } { return this.proxy.input },
    get Components(): { [item: string]: Item } { return this.proxy.components },
    get Imports(): { [component: string]: typeof Vue } { return this.proxy.imports }
}

export function Input(i: TInterface)
{
    return function<c extends VueClass<Vue>>(target: c)
    {
        Provision.Input[target.name] = i
    }
}

export function Expose()
{
    return function<c extends VueClass<Vue>>(target: c)
    {
        Provision.Imports[target.name] = target
    }
}