<script lang="ts" setup>
const { state, logIn } = useAuthStore()
const user = ref({
  username: 'kminchelle',
  password: '0lelplR',
  visible: false,
})
</script>

<template>
  <div fluid class="d-flex fill-height align-center justify-center">
    <v-row>
      <v-col>
        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="450"
          rounded="lg"
        >
          <v-form @submit.prevent="logIn(user.username, user.password)">
            <v-img
              transition="fade-transition"
              class="mx-auto ma-16"
              max-width="250"
              height="60"
              src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
            />

            <v-text-field
              v-model="user.username"
              class="mb-2"
              placeholder="User Name"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
            />

            <v-text-field
              v-model="user.password"
              class="mb-4"
              :append-inner-icon="user.visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="user.visible ? 'text' : 'password'"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="user.visible = !user.visible"
            />

            <v-btn
              type="submit"
              block
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              :loading="state.loading"
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
