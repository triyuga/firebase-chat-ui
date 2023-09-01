export const http = {
    get: async <ResponseT>(url: string): Promise<ResponseT> => {
        await Promise.resolve()
        return ['foo', 'bar', (Math.random() + 1).toString(36).substring(7)] as ResponseT
    },
    post: () => {}
}
