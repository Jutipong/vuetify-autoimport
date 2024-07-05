<script lang="ts" setup>
import { z } from 'zod'

const requiredString = z.union([z.string(), z.null(), z.undefined()])
const requiredNumber = z.union([z.number(), z.null(), z.undefined()])

const schema = z.object({
    title: requiredString.refine(val => val !== null && val !== undefined, {
        message: 'Title is required',
    }),
    price: requiredNumber.refine(val => val !== null && val !== undefined, {
        message: 'Price is required',
    }),
    rating: requiredNumber.refine(val => val !== null && val !== undefined, {
        message: 'Rating is required',
    }),
    stock: requiredNumber.refine(val => val !== null && val !== undefined, {
        message: 'Stock is required',
    }),
    brand: z.string(),
    discountPercentage: z.number(),
})

const { formData, errors, validateForm, resetForm } = useValidation(schema)
</script>

<template>
    <VForm @submit.prevent="validateForm()">
        <VCard>
            <VCardTitle>
                <VChip color="success" prepend-icon="mdi mdi-plus">
                    Create Product
                </VChip>
            </VCardTitle>

            <VCardText>
                <VRow>
                    <VCol cols="12" md="4">
                        <VTextField v-model="formData.title" :error-messages="errors.title" label="Title" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="formData.price" :error-messages="errors.price" label="Price" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="formData.rating" :error-messages="errors.rating" label="rating" />
                    </VCol>
                </VRow>
                <VRow>
                    <VCol cols="12" md="4">
                        <VCurrency v-model="formData.stock" :error-messages="errors.stock" label="stock" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="formData.brand" label="Brand" />
                    </VCol>
                    <VCol cols="12" md="4">
                        <VTextField v-model="formData.discountPercentage" :error-messages="errors.discountPercentage" label="Discount" />
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
