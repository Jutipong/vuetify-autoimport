import { ref } from 'vue'
import type { z } from 'zod'

export function useValidationHelper<T extends z.ZodType<any, any>>(schema: T) {
    const formData = ref({} as z.infer<T>)
    const errors = ref({} as Record<string, string>)
    const hasValidated = ref(false)

    function validateForm(): boolean {
        const result = schema.safeParse(formData.value)

        hasValidated.value = true

        if (result.success) {
            errors.value = {}
            return true
        }

        const formattedErrors: Record<string, string> = {}
        result.error.errors.forEach((error) => {
            const fieldName = error.path[0] as string
            formattedErrors[fieldName] = error.message
        })

        errors.value = formattedErrors
        return false
    }

    function resetValidate() {
        errors.value = {}
        formData.value = {} as z.infer<T>
        hasValidated.value = false
    }

    return { formData, errors, hasValidated, validateForm, resetValidate }
}
