import { Interface as staticInterface } from './static/definition'
import { Component } from './static/Components'

export type TInterface = 
{
    Events?: { [event: string]: number },
    Inputs?: { [input: string]: { type: any, alias: string, default?: any } },
    Properties?: { [property: string]: any }
}

const Interface: { [component: string]: TInterface } = {}

export default Interface
