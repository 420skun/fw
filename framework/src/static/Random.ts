
export default class Random
{
    static get String() { return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) }
    static get Number() { return Math.floor(Math.random() * 100000) }
}