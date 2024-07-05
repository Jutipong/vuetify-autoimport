import { ref } from 'vue'
import type { z } from 'zod'

function useValidation<T extends z.ZodType<any, any>>(schema: T) {
    const dataForm = ref({} as z.infer<T>)
    const errors = ref({} as Record<string, string>)
    const hasValidated = ref(false)

    function validateForm(): boolean {
        hasValidated.value = true

        const result = schema.safeParse(dataForm.value)

        if (result.success) {
            errors.value = {}
            return true
        }

        const formattedErrors = {} as Record<string, string>

        result.error.errors.forEach((error) => {
            const fieldName = error.path[0] as string
            formattedErrors[fieldName] = error.message
        })

        errors.value = formattedErrors
        return false
    }

    function resetForm() {
        errors.value = {} as Record<string, string>
        dataForm.value = {} as z.infer<T>
        hasValidated.value = false
    }

    watch(dataForm, () => {
        if (!hasValidated.value)
            return

        validateForm()
    }, { deep: true })

    return { formData: dataForm, errors, validateForm, resetForm }
}

export { useValidation }
