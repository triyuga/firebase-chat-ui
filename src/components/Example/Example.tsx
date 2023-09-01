import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'contexts/AppContext'
import styles from './Example.module.scss'
import classNames from 'classnames'
import { NestedComponent } from './NestedComponent/NestedComponent'
import { Data } from 'domain/models'
import { DataService } from 'domain/services/DataService'

interface ExampleProps {
    greeting: string
    count: number
    className?: string
}

export function Example({ greeting, count, className }: ExampleProps) {
    const { auth } = useContext(AppContext)
    const { data, handleButtonClick } = useExampleViewModel()

    return (
        <div className={classNames(styles.root, !!className && className)}>
            <h1>
                {greeting} {auth.currentUser?.displayName}
            </h1>
            <p>Count is now {count}</p>
            <p className={styles.paragraphClass}>This is an example paragraph</p>
            <NestedComponent />
            <pre className={styles.code}>{JSON.stringify(data, null, 2)}</pre>
            <button onClick={handleButtonClick}>Click Me!</button>
        </div>
    )
}

const useExampleViewModel = () => {
    const [data, setData] = useState<Data>([])

    const fetchData = async () => {
        const data = await DataService.fetchData()
        setData(data)
    }

    const handleButtonClick = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {
        data,
        handleButtonClick
    }
}
