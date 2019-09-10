
import cloneDeep from 'lodash/cloneDeep'

class ProxyWindow
{
    static Set = (name: string, value: any) => { (window as any)[name] = cloneDeep(value); return ProxyWindow.Get(name) }
    static Get = (name: string) => (window as any)[name]
}

export default ProxyWindow