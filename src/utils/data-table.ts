function useDataTable<TDataTableResultType>(headers: DataTableHeaderType[], onSubmit: Function) {
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

    function onPageChange(page: number) {
        if (table.options.page === page)
            return

        onSubmit({ page })
    }

    function onSortByChange(sortBy: DataTableSortByType[]) {
        onSubmit({ sortBy })
    }

    function functionOnSubmit({ page } = { page: 1 }) {
        onSubmit({ page })
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortByChange,
    }
}

export { useDataTable }
