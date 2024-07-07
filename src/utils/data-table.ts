function useDataTable<TDataTableResultType>(headers: DataTableHeaderType[]) {
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

    return table
}

export { useDataTable }
