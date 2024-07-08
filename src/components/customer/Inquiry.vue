<script setup lang="ts">
const customer = ref<Customer>({ Address: 'ที่อยู่', Details: [{ id: 'id', name: 'name' }] })

// =============== Modal 01 ===============
const modalOpen_01 = ref(false)
function openModal_01() {
    modalOpen_01.value = true
}
function updateCustomer(value: Customer) {
    Object.assign(customer.value, value)
}

// =============== Modal 02 ===============
const modalOpen_02 = ref(false)
function openModal_02() {
    modalOpen_02.value = true
}
function closeModal02(value1: boolean, value2: Customer) {
    if (_.isEmpty(value2)) {
        customer.value = value2
    }
    else {
        Object.assign(customer.value, value2)
    }

    modalOpen_02.value = value1
}

// =============== Modal 03 ===============
const modalOpen_03 = ref(false)
function openModal_03() {
    modalOpen_03.value = true
}
function closeModal03(value: boolean) {
    modalOpen_03.value = value
}

// type in component
// =============== Modal 04 ===============
const modalOpen_04 = ref(false)
function openModal_04() {
    modalOpen_04.value = true
}
function closeModal04(value: boolean) {
    modalOpen_04.value = value
}

const th = dateFormat(new Date(), 'DD/MM/YYYY HH:mm:ss')
</script>

<template>
    <div>
        <!-- one way binding -->
        <CustomerActionModal01 v-bind="customer" v-model="modalOpen_01" @update="updateCustomer" />

        <!-- two way binding -->
        <!-- recommend: use 'defineProps' and 'defineEmits' for props and emit -->
        <CustomerActionModal02 :customer="{ ...customer }" :modal-open="modalOpen_02" @onclose="closeModal02" />

        <!-- two way binding by 'defineModel' -->
        <CustomerActionModal03 v-model="customer" :modal-open="modalOpen_03" @onclose="closeModal03" />

        <!-- type in component -->
        <CustomerActionModal04 :customer="customer" :modal-open="modalOpen_04" @onclose="closeModal04" />
        <!-- <CustomerActionModal04 :customer="{ ...customer, Age: 0 }" :modal-open="modalOpen_04" @onclose="closeModal04" /> -->

        <VCard>
            <VCardTitle>
                <VChip color="primary" prepend-icon="mdi-magnify" label>
                    {{ th }}
                </VChip>
            </VCardTitle>

            <VCardText>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="customer.Name" label="Name" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="customer.Last" label="Last" />
                    </VCol>
                    <VCol cols="12" md="4" />
                </VRow>
            </VCardText>

            <VCardActions class="justify-end">
                <VBtn color="primary" text="1.Props+Emit-v-bin" @click="openModal_01" />
                <VBtn color="primary" text="2.Props {} +Emit('close')" @click="openModal_02" />
                <VBtn color="primary" text="3.defineModel" @click="openModal_03" />
                <VBtn color="primary" text="4.type in component" @click="openModal_04" />
            </VCardActions>
        </VCard>
    </div>
</template>
