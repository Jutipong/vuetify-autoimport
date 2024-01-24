<script setup lang="ts">
import store from '@/@core/utils/confirm'
</script>

<template>
  <teleport to="body">
    <div v-if="store.state.isOpen">
      <v-row justify="center">
        <v-dialog v-model="store.state.isOpen" persistent width="auto">
          <v-card
            min-width="400px"
            min-height="160px"
          >
            <v-card-title class="pa-1 pl-2">
              <v-icon
                :color="store.state.options.btnOk?.color ?? ''"
                :icon="store.state.options.iconTitle ?? ' mdi-alert-circle-outline'"
              />
              {{ store.state.title }}
            </v-card-title>
            <v-divider />
            <v-card-text>
              {{ store.state.message }}
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                min-width="116px"
                :color="store.state.options.btnCancel?.color ?? 'default'"
                :prepend-icon="store.state.options.btnCancel?.icon ?? 'mdi-close'"
                :text="store.state.options.btnCancel?.text ?? 'Cancel'"
                @click="store.onCancel()"
              />
              <v-btn
                min-width="116px"
                :color="store.state.options.btnOk?.color ?? 'success'"
                :prepend-icon="store.state.options.btnOk?.icon ?? 'mdi-check'"
                :text="store.state.options.btnOk?.text ?? 'Yes'"
                @click="store.onOk()"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </teleport>
</template>
