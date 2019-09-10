<template>
    <div>
        <div id="framework"></div>
    </div>
</template>

<script lang="ts">

import { Vue, Component }               from 'vue-property-decorator'
import { IFramework, IFrameworkItem }   from './framework/static/definition'
import { Console, Bus }                 from './framework/static/definition'
const Framework =                       require('./framework/Framework.vue').default

import Interface from './interface'
require('./import')

//debug
Console.Access()

@Component
export default class Checknote extends Vue
{
    private FW: IFramework = new Framework()

    created()
    {
        Console.Expose({
            notes: this.Notes,
            questions: this.Questions
        })
    }

    mounted()
    {
        this.FW.$mount('#framework')

        this.Components.QUERY.Configure(Interface.QUERY.Inputs.QUERY, 1).React(rsp => console.log(rsp))
    }

    private Components =
    {
        NOTEVIEW: this.FW.Page.Get('NOTEVIEW'),
        NOTELIST: this.FW.Page.Get('NOTELIST'),
        QUESTLIST: this.FW.Page.Get('QUESTLIST'),
        QUESTVIEW: this.FW.Page.Get('QUESTVIEW'),
        QUERY: this.FW.Drivers.Get('QUERY')
    }

    // actions
    private Notes =
    {
        Display: (md: string, html?: string): IFrameworkItem =>
        {
            return this.FW.Page
                .Load(this.Components.NOTEVIEW)
                .Input({ [Interface.NOTEVIEW.Inputs.MARKDOWN]: md, [Interface.NOTEVIEW.Inputs.HTML]: html })
        },
        Edit: (md: string, html: string): IFrameworkItem =>
        {
            this.FW.Actions.FILE.Write('sex', { md: md, html: html })
            return this.Notes.List([{ title: md }])
        },
        List: (items: { title: string }[]) =>
        {
            for (const item of Object.values(items))
                (item as any).clickable = [{ title: 'chuj' }]

            return this.FW.Page
                .Load(this.Components.NOTELIST)
                .Input(Interface.NOTELIST.Inputs.ITEMS, items)
        }
    }

    private Questions =
    {
        Display: (question: { title: string, text: string, book: string, category: string }) =>
        {
            return this.FW.Page
                .Load(this.Components.QUESTVIEW)
                .Input({
                    [Interface.QUESTVIEW.Inputs.TITLE]: question.title,
                    [Interface.QUESTVIEW.Inputs.TEXT]: question.text,
                    [Interface.QUESTVIEW.Inputs.DETAILS]: 
                    {
                        book: question.book,
                        category: question.category
                    }
                })
        },
        List: (items: { title: string }[]) =>
        {
            for (const item of Object.values(items))
                (item as any).clickable = []

            return this.FW.Page
                .Load(this.Components.QUESTLIST)
                .Input(Interface.QUESTLIST.Inputs.ITEMS, items)
        }
    }
}

</script>
