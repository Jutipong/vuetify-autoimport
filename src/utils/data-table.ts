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
        table.options.page = page
        onSubmit({ page })
    }

    function onSortByChange(sortBy: any) {
        table.options.sortBy = sortBy
        onSubmit({ sortBy })
    }

    function onPageLengthChange(itemsPerPage: number) {
        table.options.itemsPerPage = itemsPerPage
        onSubmit({ itemsPerPage })
    }

    function functionOnSubmit({ page } = { page: 1 }) {
        table.options.page = page
        onSubmit({ page })
    }

    return {
        table,
        onSubmit: functionOnSubmit,
        onPageChange,
        onSortByChange,
        onPageLengthChange
    }
}

export { useDataTable }
