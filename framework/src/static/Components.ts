
import { Vue } from 'vue-property-decorator'

import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import { TEvent } from './Bus';

export type TComponent = typeof Vue
type TRegistry = { [component: string]: TComponent | TRegistry }

export abstract class Item
{
    public children: { [item: string]: Item } = {}
    private _imports: { [component: string]: TComponent } = {}

    constructor(items: TRegistry = {}, readonly parent?: Item, readonly alias?: string) 
    {
        this.Set(items)
    }

    Add(name: string, component?: TComponent): Item
    {
        return this.children[name] = component ? new Component(this, component) : new AbstractItem({}, this, name)
    }

    Get(...names: string[]): Item
    {   
        if (!names.length) return this

        const next = this.children[names.splice(0, 1)[0]]

        return names.length ? next.Get(...names) : next
    }

    GetComponent(...names: string[]): TComponent | undefined
    {
        const item = this.Get(...names)

        if (item instanceof Component) return item.self
        
        return undefined
    }

    *[Symbol.iterator](): IterableIterator<Item>
    {
        for (const child of Object.values(this.children)) yield child
    }

    get imports(): { [component: string]: TComponent }
    {
        for (const child of this)
        {
            if (child instanceof Component) this._imports[child.name] = child.self

            Object.assign(this._imports, child.imports)
        }

        return this._imports
    }

    get name(): string
    {
        return this.alias || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    public toString(): string
    {
        return this.name
    }

    public Set(structure: TRegistry)
    {
        for (const component of Object.keys(structure))
        {
            if (typeof structure[component] == typeof Vue) // typeof Vue = TComponent if TS wasnt retarded
            {
                this.Add(component, structure[component] as TComponent)
            }
            else
            {
                const next = this.Get(component)

                if (next)
                {
                    next.Set(structure[component] as TRegistry)
                }
                else
                {
                    this.Add(component).Set(structure[component] as TRegistry)
                }
            }
        }
    }
}

export class AbstractItem extends Item {}

export class Component extends Item
{
    constructor(parent: Item, readonly self: TComponent) { super({}, parent) }

    get name(): string
    {
        return this.self.name
    }
}

