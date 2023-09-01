import { http } from 'domain/http'
import { Data } from 'domain/models'

export const DataService = {
    fetchData: async (): Promise<Data> =>
        http.get<Data>('api/data').then(response => response as Data)
}
