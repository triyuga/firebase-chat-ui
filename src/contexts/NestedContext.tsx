import { createContext } from 'react'

export interface INestedContext {
    prop1: string
    prop2: number
}

export const NestedContext = createContext<INestedContext>({} as INestedContext)

export const NestedContextProvider = ({ children }: { children: React.ReactNode }) => {
    const context = useNestedContextProvider()
    return <NestedContext.Provider value={context}>{children}</NestedContext.Provider>
}

const useNestedContextProvider = (): INestedContext => {
    return {
        prop1: 'prop1',
        prop2: 2
    }
}
