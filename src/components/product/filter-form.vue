<script setup lang="ts">
const tableRef = useTemplateRef('table')

const state = reactive({
    master: {
        status: [
            { id: true, text: 'Active' },
            { id: false, text: 'InActive' },
        ],
    },
    search: {
        // autoComplateServer: '0d464588-56a6-4831-b085-f26cb65ee7fd',
        // autoComplateMultipleServer: ['0d464588-56a6-4831-b085-f26cb65ee7fd', 'd85f5eb3-4b9c-4483-9b77-29010b0a93a3', 'dc79347f-90b2-4ffb-9140-69e54648e180'],
    } as Product,
})

const func = {
    onClear: async () => {
        state.search = {} as Product
    },
    onSearch: async () => {
        await tableRef.value?.onSearch(state.search)
    },
}

// watch(() => state.search.files, async (files) => {
//     const result = await _file.GetBase64(files)
//     console.log(result)
// })
</script>

<template>
    <VCard @keyup.enter="func.onSearch()">
        <VCardTitle>
            <VChip color="primary" prepend-icon="fa-search" label>
                Filter
            </VChip>
        </VCardTitle>

        <VCardText>
            <VRow>
                <VCol cols="12" md="4">
                    <VTextField v-model="state.search.brand" label="Brand" />
                </VCol>

                <VCol cols="12" md="4">
                    <VTextField v-model="state.search.title" label="Title" />
                </VCol>

                <VCol cols="12" md="4">
                    <VSelect
                        v-model="state.search.status"
                        :dirty="true"
                        :items="state.master.status" label="Status"
                    />
                </VCol>
            </VRow>

            <VRow>
                <VCol cols="12" md="4">
                    <VCurrency v-model="state.search.discountPercentage" label="Discount" />
                </VCol>

                <VCol cols="12" md="4">
                    <VDate id="start" v-model="state.search.start" :max="state.search.end" label="Start Date" />
                </VCol>

                <VCol cols="12" md="4">
                    <VDate id="end" v-model="state.search.end" :min="state.search.start" label="End Date" />
                </VCol>
            </VRow>

            <VRow>
                <VCol cols="12" md="4">
                    <VAutocompleteServer
                        v-model="state.search.autoComplateServer"
                        label="Autocomplete server side"
                        base-url="http://localhost:7213"
                        url="/customer/AutocompleteServer"
                    />
                </VCol>

                <VCol cols="12" md="6">
                    <VAutocompleteMultipleServer
                        v-model="state.search.autoComplateMultipleServer"
                        label="Autocomplete Multiple server side"
                        base-url="http://localhost:5224"
                        url="/customer/AutocompleteServer"
                    />
                </VCol>
            </VRow>

            <VRow>
                <VCol cols="12" md="4">
                    <v-file-input v-model="state.search.files" label="File input" />
                </VCol>
            </VRow>
        </VCardText>

        <VCardActions class="justify-end">
            <VBtn color="warning" prepend-icon="fa-refresh" text="Clear" @click="func.onClear" />
            <VBtn color="primary" prepend-icon="fa-search" text="Search" @click="func.onSearch" />
        </VCardActions>
    </VCard>

    <!-- table -->
    <ProductTable ref="table" />
</template>
