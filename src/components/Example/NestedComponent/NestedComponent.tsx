import { NestedContext } from 'contexts/NestedContext'
import { useContext } from 'react'

export function NestedComponent() {
    const nestedContext = useContext(NestedContext)
    return (
        <div>
            <p>
                This is a NestedComponent with props {nestedContext.prop1} and {nestedContext.prop2}
            </p>
        </div>
    )
}
