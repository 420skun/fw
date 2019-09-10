<template>
  <div>

    <template v-for="component in RenderSurface">
        <div 
            v-if="!component.abstract" 
            :key="component.key"
        >
            <component :is="component.self" :input="component.State.Data" @output="component.Bus.Handle($event)">
                <component :is="component.State.Content.Component" :input="component.State.Content.Data" @output="component.Bus.Handle($event)" />
            </component>
        </div>
        <div v-else :key="component.key">
            <component :is="component.State.Content.Component" :input="component.State.Content.Data"  @output="component.Handle($event)" />
        </div>
    </template>

  </div>
</template>

<!------------------------------------------------------------------------------------->

<style lang="stylus">

// block mobile //
@media only screen and (max-width 1080px)
    body
        &::after
            content "resize screen"
        & > *
            display none

//end block //

// fonts //
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css')
@import url('https://fonts.googleapis.com/css?family=Oswald|Roboto+Condensed&display=block')
@font-face
    font-family "logo"
    src url("./assets/logo.ttf")

// end fonts //

*
    box-sizing border-box
    margin 0
    padding 0

body
    background-color grey
    user-select none

.debug, .debug *
    border 1px solid red !important

</style>

<!------------------------------------------------------------------------------------->

<script lang="ts">

import { Component as _Component, Vue, Watch } from 'vue-property-decorator';
import cloneDeep from 'lodash/cloneDeep'

import { Item, Component, AbstractItem } from './static/Components'
import { HEADER, SIDEBAR, PAGE, MODAL } from './import'
import { IFramework, IFrameworkItem, Interface, Console, Bus, Provision, Random } from './static/definition'
import { TEvent, THandler, TEventMeta } from './static/Bus';

Console.Log('initializing framework')

@_Component({
    components: Provision.Imports
}) 
export default class Framework extends Vue implements IFramework
{
    // component state (2 dimensions) (out)
    public State: 
    { 
        [component: string]: 
        { 
            Data: { [property: string]: any }, 
            Content: 
            { 
                Component: typeof Vue | null, 
                Data: { [property: string]: any }
            } 
         } 
    } = {}

    static readonly DefaultState = { Data: {}, Content: { Component: null, Data: {} } }

    private Data: { [component: string]: { [property: string]: any } } = {}

    // simplify
    public readonly Components = new FrameworkItem(this, Provision.Components.Components)
    public readonly Drivers = new FrameworkItem(this, Provision.Components.Drivers)
    private readonly RenderSurface = [ ...Object.values(this.Components.children), ...Object.values(this.Drivers.children) ]

    // state update
    @Watch('State', {deep: true}) 
    private Controls(n: object, o: object)
    {
        Console.Log('state updated')
    }

    // event handlers
    private readonly Events = 
    {

    }

    private readonly Bus = new Bus('fw')

    created()
    {
        Provision.proxy.Framework = this

        this.Bus.On(Interface.FRAMEWORK.Events.NAVIGATE, data => console.log('navigate: ', data), 'navigate')
    }

    // initialization / main thread
    mounted() // essential that this happens after children are created
    {
        Console.Log('framework mounted')

        Console.Expose({
            'data': this.Data,
            'state': this.State,
            'fw': this,
            'components': this.Components,
            'drivers': this.Drivers
        })
    }

    //component macro
    public Header = this.Components.Get(HEADER)
    public Sidebar = this.Components.Get(SIDEBAR)
    public Page = this.Components.Get(PAGE)
    public Modal = this.Components.Get(MODAL)
}

class FrameworkItem extends Item implements IFrameworkItem
{
    constructor(private readonly FW: Framework, readonly wrapped: Component | AbstractItem) 
    { super()
        // rebind children
        Object.keys(this.wrapped.children).forEach(child => this.children[child] = new FrameworkItem(this.FW, this.wrapped.children[child]))

        // quick error
        this.Bus.On(Interface.MCONTENT.Events.ERROR, error => 
        {
            if (this.Errors[error]) this.Errors[error](null)
            else throw new Error('uncaught error : ' + error)
        })
    }

    // template utilities
    public children: { [item: string]: FrameworkItem } = {}
    public abstract = this.wrapped instanceof AbstractItem
    public self = !this.abstract && (this.wrapped as Component).self
    public key = Math.floor(Math.random() * 100000)
    public alias = this.wrapped.name

    // item rebind
    Get = (...names: string[]): FrameworkItem => super.Get(...names) as FrameworkItem
    Add = (): never => { throw new Error('cannot change a framework item') }

    // event extension
    private Bus = new Bus(this.name)

    public readonly On = (event: TEvent, handler: THandler, id?: string) => { this.Bus.On(event, handler, id); return this }
    public readonly Off = (event: TEvent, id?: string) => { this.Bus.Off(event, id); return this }
    public readonly Act = (handler: THandler) => { this.Bus.On(Interface.MCONTENT.Events.ANSWER, handler); return this }
    public readonly React = (handler: THandler) => { this.Bus.Once(Interface.MCONTENT.Events.ANSWER, handler); return this }
    public readonly Promise = (event: TEvent) => this.Bus.Promise(event)

    // error events
    private readonly Errors: { [error: number]: THandler } = {}
    public readonly Error = (error: number, handler: THandler) => { this.Errors[error] = handler; return this } 

    get State() 
    { 
        return this.FW.State[this.name] || (this.FW.State[this.name] = cloneDeep(Framework.DefaultState)) 
    }

    // methods
    public Reset()
    {
        this.key++
        return this
    }

    public Reload()
    {
        return this
    }

    public Load(child: FrameworkItem, input?: { [property: string]: any })
    {
        if (child.wrapped.parent !== this.wrapped) throw new Error('mismatched components')
        if (child.abstract) throw new Error('abstract load')

        this.State.Content.Component = (child.wrapped as Component).self

        if (input !== undefined)
            Object.keys(input).forEach(key => this.Input(key, input[key]))

        return this.Reset()
    }

    // simplify
    public Configure(property: string | { [property: string]: any }, value?: any)
    {
        if (typeof property == 'string')
            this.State.Data[property] = value
        else
            Object.keys(property).forEach(key => this.Configure(key, property[key]))

        Bus.Emit(50, this.name)

        return this.Reset()
    }

    public Input(property: string | { [property: string]: any }, value?: any)
    {
        if (typeof property == 'string')
            this.State.Content.Data[property] = value
        else
            Object.keys(property).forEach(key => this.Input(key, property[key]))

        Bus.Emit(50, this.name)

        return this.Reset()
    }
}

</script>


