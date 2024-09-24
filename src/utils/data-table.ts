function useDataTable<TItems>(headers: DataTableHeader[], sortBy: DataTableSortBy[], onSubmit: Function) {
    const table = reactive({
        headers,
        options: {
            page: 1,
            itemsPerPage: 20,
            sortBy,
        },
        result: {
            items: [],
            itemsLength: 0,
        },
    } as DataTableType<TItems>)

    function onPageChange(page: number) {
        onSubmit({ page })
    }

    function onSortByChange(sortBy: any) {
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
