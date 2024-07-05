<script lang="ts" setup>
import { z } from 'zod'

const requiredString = z.union([z.string(), z.null(), z.undefined()])
const requiredNumber = z.union([z.number(), z.null(), z.undefined()])

const schema = z.object({
    title: requiredString.refine(val => !!val, {
        message: 'Title is required',
    }),
    price: requiredNumber.refine(val => !!val, {
        message: 'Price is required',
    }),
    rating: requiredNumber.refine(val => !!val, {
        message: 'Rating is required',
    }),
    stock: requiredNumber.refine(val => !!val, {
        message: 'Stock is required',
    }),
    brand: z.string().optional(),
    discountPercentage: requiredNumber.refine(val => !!val, {
        message: 'Discount is required',
    }),
    // discountPercentage: requiredNumber.refine(val => val !== null && val !== undefined, {
    //     message: 'Discount is required',
    // }),
})

const { dataForm, errors, validateForm, resetForm } = useValidate(schema)

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
