<script lang="ts" setup>
import { z } from 'zod'

const schema = z.object({
    title: z.union([z.string(), z.null(), z.undefined()])
        .refine(val => val !== null && val !== undefined, {
            message: 'Title is required',
        }),
    price: z.union([z.number(), z.null(), z.undefined()])
        .refine(val => val !== null && val !== undefined, {
            message: 'Price is required',
        }),
    rating: z.union([z.number(), z.null(), z.undefined()])
        .refine(val => val !== null && val !== undefined, {
            message: 'Rating is required',
        }),
    stock: z.union([z.number(), z.null(), z.undefined()])
        .refine(val => val !== null && val !== undefined, {
            message: 'Stock is required',
        }),
    brand: z.string(),
    discountPercentage: z.number(),
})

type FormData = z.infer<typeof schema>
type ErrorField = Partial<keyof FormData>

const formData = ref({} as FormData)
const errors = ref ({} as Record<ErrorField, string>)
const hasValidated = ref(false)

function validateForm(): boolean {
    const result = schema.safeParse(formData.value)

    if (result.success) {
        errors.value = {} as Record<ErrorField, string>
        hasValidated.value = true
        return true
    }

    const formattedErrors = {} as Record<ErrorField, string>

    result.error.errors.forEach((error) => {
        const fieldName = error.path[0] as ErrorField
        formattedErrors[fieldName] = error.message
    })

    errors.value = formattedErrors
    hasValidated.value = true
    return false
}

function resetValidate() {
    errors.value = {} as Record<ErrorField, string>
    formData.value = {} as FormData
    hasValidated.value = false
}

watch(formData, () => {
    if (!hasValidated.value)
        return

    validateForm()
}, { deep: true })
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

            <VCardActions>
                <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="resetValidate()" />
                <VBtn color="primary" prepend-icon="mdi-content-save" text="Save" type="submit" />
            </VCardActions>
        </VCard>
    </VForm>
</template>
