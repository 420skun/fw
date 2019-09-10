import { Vue } from 'vue-property-decorator'
import { TEvent, THandler } from './Bus'

export interface IFramework extends Vue 
{
    Components: IFrameworkItem
    Drivers: IFrameworkItem
    Header: IFrameworkItem, Sidebar: IFrameworkItem, Page: IFrameworkItem, Modal: IFrameworkItem
}

export interface IFrameworkItem extends Item
{
    Get(...names: string[]): IFrameworkItem

    On(event: TEvent, handler: THandler, id?: string): this
    Off(event: TEvent, id?: string): this
    Act(handler: THandler): this
    React(handler: THandler): this
    Promise(event: TEvent): Promise<{}>

    Reset(): this
    Load(child: IFrameworkItem, input?: { [property: string]: any }): this
    Configure(property: string | { [property: string]: any }, value?: any): this
    Input(property: string | { [property: string]: any }, value?: any): this

    Error(error: TEvent, hanlder: THandler): this
}

// export redirections

import { Provision as _Provision } from './Provision'
export const Provision = _Provision

import _Console from './Console'
export const Console = _Console

import _Bus from './Bus'
export const Bus = _Bus

import _Random from './Random'
import { Item } from './Components';
export const Random = _Random

// interface

export const Interface =
{
    FRAMEWORK:
    {
        Events:
        {
            NAVIGATE: Bus.GetEventNumber()
        }
    },
    HEADER:
    {
        Properties:
        {
            ITEMS:
            {
                LOGO: 1,
                NOTE: 2,
                EXAM: 3,
                MENU: 4,
                NONE: 666      
            }
        },
        Inputs:
        {
            TRIGGER: 'trigger',
            HIDE: 'hide'
        },
        Events:
        {
            TEST1: 'sex',
            TEST2: 'sex2'
        }
    },
    SIDEBAR:
    {
        Properties:
        {
            STATES:
            {
                HIDDEN: 1,
                OPEN: 2,
                PEEK: 3,
                LOCKED: 0
            }
        },
        Inputs:
        {
            STATE: 'state'
        }
    },
    FILE:
    {
        Properties:
        {
            ACTIONS:
            {
                READ: 1,
                WRITE: 2
            }
        },
        Inputs:
        {
            ACTION: 'act',
            FILE: 'fl',
            DATA: 'dt'
        }
    },
    MCONTENT:
    {
        Events:
        {
            ANSWER: Bus.GetEventNumber(),
            ERROR: Bus.GetEventNumber()
        },
        Inputs:
        {
            FW: 'fw'
        }
    },
    API:
    {
        Properties:
        {
            METHODS: { GET: 'GET', POST: 'POST', UPDATE: 'PUT', DELETE: 'DELETE' }
        },
        Inputs:
        {
            URL: 'url',
            METHOD: 'act',
            DATA: 'dt'
        },
        Errors:
        {
            JSON: 1,
            URL: 2
        }
    }
}
