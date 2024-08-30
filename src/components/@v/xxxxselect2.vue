<script setup lang="ts">
const person = ref<null | { id: string, name: string }>(null)
const personOptions = ref<Array<{ id: string, name: string }>>([])
const search = ref('')
const loadingPersons = ref(false)

const makeSearch = _.debounce(async (value: string) => {
    if (!value) {
        person.value = null
        return
    }

    if (loadingPersons.value)
        return

    loadingPersons.value = true

    personOptions.value = [
        { id: '1', name: 'Person 1' },
        { id: '2', name: 'Person 2' },
        { id: '3', name: 'Person 3' },
        { id: '4', name: 'Person 4' },
        { id: '5', name: 'Person 5' },
    ]

    // const res = await api.Post<any>('customer/Inquiry', { name: value }, { baseURL: 'http://localhost:7213/' })
    // personOptions.value = res.map((item: any) => ({ id: res.Id, name: `${item.name}` }))
    // console.log('personOptions', personOptions.value)

    loadingPersons.value = false
}, 2000)

watch(search, (value) => {
    if (value) {
        makeSearch(value)
    }
})
</script>

<template>
    <v-layout align-center row justify-center>
        <v-autocomplete
            v-model="person"
            v-model:search.lazy="search"
            :items="personOptions"
            :loading="loadingPersons"
            hide-no-data
            item-text="name"
            item-value="id"
            label="Person"
            prepend-icon="person"
            append-icon=""
            placeholder="Start typing to Search"
            clearable
            return-object
        />
    </v-layout>
</template>
