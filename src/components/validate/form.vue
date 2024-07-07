<script lang="ts" setup>
const schema = z.object({
    title: requiredString('Title is required'),
    price: requiredNumber('Price is required'),
    rating: requiredNumber('Rating is required'),
    stock: requiredNumber('Stock is required'),
    brand: z.string().optional(),
    discountPercentage: requiredNumber('Discount is required'),
})

const { dataForm, errors, validateForm, resetForm } = useZodValidate(schema)

function onSubmit() {
    if (!validateForm())
        return

    vAlert.success('Successful', `Submit data successfully`)
    resetForm()
}
</script>

<template>
    <VForm @submit.prevent="onSubmit()">
        <VCard>
            <VCardTitle>
                <VChip color="success" prepend-icon="mdi mdi-plus">
                    Create Product
                </VChip>
            </VCardTitle>

            <VCardText>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="dataForm.title" :error-messages="errors?.title" label="Title" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="dataForm.price" :error-messages="errors?.price" label="Price" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="dataForm.rating" :error-messages="errors?.rating" label="rating" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="dataForm.stock" :error-messages="errors?.stock" label="stock" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="dataForm.brand" label="Brand" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="dataForm.discountPercentage" :error-messages="errors?.discountPercentage" label="Discount" />
                    </VCol>
                </VRow>
            </VCardText>

            <VCardActions class="justify-end">
                <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="resetForm()" />
                <VBtn color="primary" prepend-icon="mdi-content-save" text="Save" type="submit" />
            </VCardActions>
        </VCard>
    </VForm>
</template>
