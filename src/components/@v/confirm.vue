<script setup lang="ts">
import useConfirm from './confirm'

const state = useConfirm.state
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
              <v-btn color="default" prepend-icon="mdi-close" text="Cancel" @click="state.isOpen = false" />
              <v-btn color="success" prepend-icon="mdi-check" text="Confirm" @click="state.isOpen = false" />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </teleport>
</template>
./confirm
