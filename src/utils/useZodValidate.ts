import { z } from 'zod'

//
// version 2
//
function useZodValidate<T extends z.ZodType<any, any>>(schema: T) {
type FormData = z.infer<typeof schema>
type ErrorField = Partial<keyof FormData>

const dataForm = ref({} as FormData)
const errors = ref<Record<ErrorField, string>>()
const hasValidated = ref(false)

function validateForm(): boolean {
    hasValidated.value = true

    const result = schema.safeParse(dataForm.value)

    if (result.success) {
        errors.value = {} as Record<ErrorField, string>
        return true
    }

    const formattedErrors = {} as Record<ErrorField, string>

    result.error.errors.forEach((error) => {
        const fieldName = error.path[0] as ErrorField
        formattedErrors[fieldName] = error.message
    })

    errors.value = formattedErrors
    return false
}

function resetForm() {
    errors.value = {} as Record<ErrorField, string>
    dataForm.value = {} as z.infer<T>
    hasValidated.value = false
}

watch(dataForm, () => {
    if (!hasValidated.value)
        return

    validateForm()
}, { deep: true })

return { dataForm, errors, validateForm, resetForm }
}

function requiredString(message: string, zodType: z.ZodType<any, any>[] = []) {
    return z.union([z.string(), z.null(), z.undefined(), ...zodType]).refine(val => !!val, { message })
}
function requiredNumber(message: string, zodType: z.ZodType<any, any>[] = []) {
    return z.union([z.number(), z.null(), z.undefined(), ...zodType]).refine(val => !!val, { message })
}

export { useZodValidate, requiredString, requiredNumber }

//
// version 1
//
// import { ref } from 'vue'
// import type { z } from 'zod'

// function useValidate<T extends z.ZodType<any, any>>(schema: T) {
//     const data = ref({} as z.infer<T>)
//     const errors = ref({} as Record<string, string>)
//     const hasValidated = ref(false)

//     function validate(): boolean {
//         hasValidated.value = true

//         const result = schema.safeParse(data.value)

//         if (result.success) {
//             errors.value = {}
//             return true
//         }

//         const formattedErrors = {} as Record<string, string>

//         result.error.errors.forEach((error) => {
//             const fieldName = error.path[0] as string
//             formattedErrors[fieldName] = error.message
//         })

//         errors.value = formattedErrors
//         return false
//     }

//     function reset() {
//         errors.value = {} as Record<string, string>
//         data.value = {} as z.infer<T>
//         hasValidated.value = false
//     }

//     watch(data, () => {
//         if (!hasValidated.value)
//             return

//         validate()
//     }, { deep: true })

//     return { data, errors, validate, reset }
// }

// export { useValidate }
