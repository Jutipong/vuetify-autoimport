interface useDataTableType {
    firstLoad: boolean
}
function useDataTable<TDataTableResultType>(
    headers: DataTableHeaderType[],
    onSubmit: Function,
    options: useDataTableType = { firstLoad: true },
) {
    const table = reactive({
        headers,
        options: {
            page: 1,
            itemsPerPage: 20,
            sortBy: [],
        },
        result: {
            datas: [],
            total: 0,
        },
    } as DataTableType<TDataTableResultType>)

    function functionOnSubmit(args?: any) {
        if (!options.firstLoad) {
            options.firstLoad = true
            return
        }

        onSubmit(args)
    }

    return { table, onSubmit: functionOnSubmit }
}

export { useDataTable }
