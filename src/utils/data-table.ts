function useDataTable<TData>(headers: DataTableHeaderType[]) {
    const table = reactive({
        headers: headers as DataTableHeaderType[],
        options: { ...dataTableOptionConst },
        result: { ...dataTableResultType },
    } as DataTableType<TData>)

    return table
}

export { useDataTable }
