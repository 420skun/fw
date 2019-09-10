
import { Bus } from 'F:/dev/framework/src/static/definition'

const Interface =
{
    READ:
    {
        Inputs:
        {
            TITLE: 'ttl',
            MARKDOWN: 'md',
            HTML: 'html',
            MDCLASSES: 'mdcls'
        },
        Properties:
        {
            STATES: { READ: 1, EDIT: 2 }
        }
    },
    LIST:
    {
        Inputs:
        {
            MENU: 'mn',
            ACTIONS: 'acts',
            ITEMS: 'itms',
            ADJUST: 'adj'
        },
        Properties:
        {
            TYPES:
            {
                SEARCH: 1,
                SELECT: 2
            }
        },
        Events:
        {
            NAVIGATE: Bus.GetEventNumber()
        }
    },
    BANNER:
    {
        Inputs:
        {
            TITLE: 'ttl',
            DETAILS: 'dtl',
            LAYOUT: 'lay'
        },
        Properties:
        {
            LAYOUTS: { LEFT: 1, CENTER: 2 }
        },
        Events:
        {
            NAVIGATE: Bus.GetEventNumber()
        }
    }
}

export default Interface