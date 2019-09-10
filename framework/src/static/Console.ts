
export enum Styles
{
    INFO = '',
    SUCCESS = 'background: #54f04f; color: black', 
    WARN = 'background: #ebcd09; color: black', 
    ERROR = 'background: #f70a2e'
}

/// management console
export default class Console
{
    private static Messages: { message: string, style: Styles }[] = []

    static Access()
    {
        Console.Active = true
        Console.Show('developer mode on', Styles.WARN)

        Object.assign(window, Console.Items)

        for (const m of Console.Messages)
        {
            Console.Show(m.message, m.style)
        }
    }

    private static set Active(active: boolean)
    {
        (window as any).consoleActive = active
    }

    private static get Active()
    {
        return (window as any).consoleActive
    }

    private static Items: { [name: string]: any } = {}

    private static Add(name: string, item: any)
    {
        if (!Console.Active)
            Console.Items[name] = item
        else
            (window as any)[name] = item
    }

    static Informate(name: string, value: string | number | boolean)
    {
        Console.Add(name, value)
    }

    static Expose(items: { [name: string]: object })
    {
        for (const item of Object.keys(items))
            Console.Add(item, items[item])
    }

    static Log(message: string, style: Styles = Styles.INFO, save = true)
    {
        if (Console.Active) console.log(`%c ${message} `, style)

        if (save) Console.Messages.push({ message, style })
    }

    static Show(message: string, style: Styles = Styles.INFO)
    {
        Console.Log(message, style, false)
    }

    static BreakThrough(message: string)
    {
        console.log(`%c ${message} `, Styles.ERROR)
    }

    static Time(event: string)
    {
        
    }
}

