<script setup lang="ts">
import store from '@/@core/utils/confirm'

const state = store.state
</script>

<template>
  <teleport to="body">
    <div v-if="state.isOpen">
      <v-row justify="center">
        <v-dialog v-model="state.isOpen" persistent width="auto">
          <v-card>
            <v-card-title class="pa-1 pl-2">
              {{ state.title }}
            </v-card-title>
            <v-divider />
            <v-card-text>
              {{ state.message }}
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                min-width="116px"
                :color="store.state.options.btnCancel.color" prepend-icon="mdi-close"
                :text="store.state.options.btnCancel.text" @click="store.onCancel()"
              />
              <v-btn
                min-width="116px"
                :color="store.state.options.btnOk.color" prepend-icon="mdi-check"
                :text="store.state.options.btnOk.text" @click="store.onOk()"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </teleport>
</template>
./confirm
