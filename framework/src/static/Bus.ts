
import Console from './Console'
import Random from './Random'

export type TEvent = number
export type THandler = (data: any) => void
export type TEventMeta = { event: TEvent, data: { [property: string]: any } }

// simplify
export default class Bus 
{
    constructor(private readonly name: string) {}

    static readonly Handlers: { [component: string]: { [event: number]: { [id: string]: THandler } } } = {}

    get Handlers() { return Bus.Handlers[this.name] = Bus.Handlers[this.name] || {} }

    public readonly HasEvent = (event: number) => this.Handlers.hasOwnProperty(event)

    public Handle(event: TEventMeta)
    {
        if (this.HasEvent(event.event))
            Object.values(this.Handlers[event.event]).forEach(handler => handler(event.data))
    }

    static Emit(event: TEvent, data: any)
    {
        for (const component of Object.values(Bus.Handlers))
        {
            if (!component.hasOwnProperty(event)) continue

            Object.values(component[event]).forEach(handler => handler(data))
        }
    }

    public On(event: TEvent, handler: THandler, id?: string)
    {
        id = id || Random.String

        if (this.HasEvent(event))
            this.Handlers[event][id] = handler
        else
            this.Handlers[event] = { [id]: handler }

        return this
    }

    public Once(event: TEvent, handler: THandler)
    {
        const id = Random.String

        return this.On(event, data => {
            handler(data)
            this.Off(event, id)
        }, id)
    }

    public Promise(event: TEvent)
    {
        return new Promise(resolve => this.On(event, resolve))
    }

    public Off(event: TEvent, id?: string)
    {
        if (this.HasEvent(event))
        {
            if (id) delete this.Handlers[event][id]
            else delete this.Handlers[event]
        }

        return this
    }

    static EventNumber = 0
    static readonly GetEventNumber = () => ++Bus.EventNumber

}

Console.Expose({ 'handlers': Bus.Handlers })