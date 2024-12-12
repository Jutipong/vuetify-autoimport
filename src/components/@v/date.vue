<script lang="ts" setup>
const props = defineProps<{ modelValue: Date | null | undefined }>()
const emit = defineEmits<{ 'update:modelValue': [value: Date | null] }>()

const state = ref<Date | null>()

function onClear() {
    state.value = null
    emit('update:modelValue', null)
}

onMounted(() => {
    watch(() => props.modelValue, (newVal, oldVal) => {
        if (`${newVal}` === `${oldVal}`)
            return

        if (`${state.value}` === `${newVal}`)
            return

        state.value = newVal ? new Date(newVal) : null
    })

    watch(state, (newVal, oldVal) => {
        if (`${newVal}` === `${oldVal}`)
            return

        if (`${newVal}` === `${props.modelValue}`)
            return

        emit('update:modelValue', newVal ?? null)
    })
})
</script>

<template>
    <VDateInput
        v-model="state"
        autocomplete="off"
        hide-details="auto"
        @click:clear="onClear()"
    />
</template>
