<script lang="ts" setup>
const { setToken, setUser } = useAuthStore()

const state = reactive({
    user: {
        username: 'emilys',
        password: 'emilyspass',
        visible: false,
    },
    isLoading: false,
})

async function logIn() {
    state.isLoading = true

    const res = await api.post<UserLogin>('/auth/login', {
        username: state.user.username,
        password: state.user.password,
    }, { isLoading: false })

    state.isLoading = false

    setToken(res.token)
    setUser(res)

    router.push('/')
}
</script>

<template>
    <div fluid class="flex h-full items-center justify-center">
        <v-row>
            <v-col>
                <v-card
                    class="mx-auto pa-12 pb-8"
                    elevation="8"
                    max-width="450"
                    rounded="lg"
                >
                    <v-form @submit.prevent="logIn">
                        <v-img
                            transition="fade-transition"
                            class="mx-auto ma-16"
                            max-width="250"
                            height="60"
                            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                        />

                        <v-text-field
                            v-model="state.user.username"
                            class="mb-2"
                            placeholder="User Name"
                            prepend-inner-icon="mdi-account-outline"
                            variant="outlined"
                        />

                        <v-text-field
                            v-model="state.user.password"
                            class="mb-4"
                            :append-inner-icon="state.user.visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="state.user.visible ? 'text' : 'password'"
                            placeholder="Enter your password"
                            prepend-inner-icon="mdi-lock-outline"
                            variant="outlined"
                            @click:append-inner="state.user.visible = !state.user.visible"
                        />

                        <v-btn
                            type="submit"
                            block
                            class="mb-8"
                            color="blue"
                            size="large"
                            variant="tonal"
                            :loading="state.isLoading"
                        >
                            Log In
                            <v-icon icon="mdi-login" />
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
