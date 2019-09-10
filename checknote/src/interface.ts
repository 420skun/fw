
import LibInt from './library/interface'
import { Interface as FWInt } from './framework/static/definition'

const Interface =
{
    NOTEVIEW:
    {
        Inputs: { MARKDOWN: LibInt.READ.Inputs.MARKDOWN , HTML: LibInt.READ.Inputs.HTML }
    },
    NOTELIST:
    {
        Inputs: { ITEMS: LibInt.LIST.Inputs.ITEMS }
    },
    QUESTLIST:
    {
        Inputs: { ITEMS: LibInt.LIST.Inputs.ITEMS }
    },
    QUESTVIEW:
    {
        Inputs: { TITLE: '', TYPE: 'typ', TEXT: 'txt', OPTIONS: 'opt', DETAILS: 'dtl' },
        Properties:
        {
            TYPES:
            {
                INPUT: 1,
                SELECT: 2,
                MULTIPLE: 3
            }
        }
    },
    QUERY:
    {
        Inputs: { QUERY: 'qr', ID: 'id' },
        Properties:
        {
            QUERIES: { NOTE: 1, QUESTION: 2 }
        }
    },
    LIB: LibInt,
    FW: FWInt
}

export default Interface
