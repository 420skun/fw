// markdown parsing script (no server required)

const defClasses: {[char: string]: string} = {
    '!': 'highlight',
    '*': 'important',
    '/': 'name',
    '#': 'title-small',
    '##': 'title-medium',
    '###': 'title-big' // classes CAN be selected using more than one symbol, but the symbols have to be stepped so the parser knows when it comes across one
}

export default function Parse(text: string, escape = '`', classes = defClasses): string
{
    let result = ''

    // which classes are currently active so the parser knows when to open and when to close a tag
    let switches: {[classname: string]: boolean} = {}

    function closeTags()
    {
        // close open tags
        for (let active of Object.values(switches))
        {
            if (active) result += '</span>'
        }

        // reset active classes
        switches = {}
    }
    
    if (!text.length) return result

    for (let i = 0; i < text.length; i++)
    {
        const char = text[i]

        if (char == escape)
            continue
        else if (char == '\n')
        {
            closeTags()
            result += '</p><p class=\"md\">'
        }
        else
        {
            let symbol = char

            if (classes[symbol])
            {
                let classname = ''

                while (classes[symbol])
                {
                    classname = classes[symbol]
                    symbol += text[i + symbol.length]
                }

                if (switches[classname])
                {
                    result += '</span>'
                }
                else
                {
                    result += `<span class="${classname}">`
                }

                switches[classname] = !switches[classname]
                i += symbol.length - 2 // skip next characters which are markdown symbols, unless the symbol is this chracter itself only
            }
            else
            {
                result += char
            }
        } 
    }

    closeTags()
    return '<p class=\"md\">' + result + '</p>'
}