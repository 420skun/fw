// component registration helper script

import { HEADER, SIDEBAR, PAGE, MODAL } from './framework/import'
import { Provision } from './framework/static/definition'

const Components = Provision.Components.Components
const Drivers = Provision.Components.Drivers

import NoteView from './components/NoteView.vue'
import NoteList from './components/NoteList.vue'
import QuestList from './components/QuestList.vue'
import QuestView from './components/QuestView.vue'

Components.Get(PAGE).Set({ 
    NOTEVIEW: NoteView, 
    NOTELIST: NoteList, 
    QUESTLIST: QuestList, 
    QUESTVIEW: QuestView
})

import Query from './components/Query.vue'

Drivers.Add('QUERY', Query)