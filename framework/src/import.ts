
import { Item, AbstractItem } from './static/Components'
import { Provision } from './static/Provision'

import Header from './components/header/Header.vue'
export const HEADER = Header.name

import Sidebar from './components/sidebar/Sidebar.vue'
export const SIDEBAR = Sidebar.name

import Page from './components/page/Page.vue'
export const PAGE = Page.name

import Modal from './components/modal/Modal.vue'
export const MODAL = Modal.name

Provision.Components.Components = new AbstractItem({
    [HEADER]: Header,
    [SIDEBAR]: Sidebar,
    [PAGE]: Page,
    [MODAL]: Modal
})

Provision.Components.Drivers = new AbstractItem({
    FETCH: {}
})

const Components = Provision.Components.Components
const Drivers = Provision.Components.Drivers

import Test from './content/page/Test.vue'

Components.Get(PAGE).Add('TEST', Test)

import API from './content/drivers/API.vue'

Drivers.Add('API', API)

