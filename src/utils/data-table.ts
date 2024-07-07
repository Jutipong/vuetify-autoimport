function useDataTable<TDataTableResultType>(headers: DataTableHeaderType[]) {
    const table = reactive({
        headers: headers as DataTableHeaderType[],
        options: { ...dataTableOptionConst },
        result: { ...dataTableResultType },
    } as DataTableType<TDataTableResultType>)

    return table
}

export { useDataTable }
