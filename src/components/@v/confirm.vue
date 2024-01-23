<script setup lang="ts">
import store from './confirm'

const state = store.state
</script>

<template>
  <Teleport to="body">
    <div v-if="state.isOpen">
      <v-row justify="center">
        <v-dialog v-model="state.isOpen" persistent width="auto">
          <v-card>
            <v-card-title class="text-h5">
              Use Google's location service?
            </v-card-title>
            <v-card-text>
              Let Google help apps determine location. This means sending anonymous location data to Google, even
              when no apps are running.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="green-darken-1" variant="text" @click="state.isOpen = false">
                Disagree
              </v-btn>
              <v-btn color="green-darken-1" variant="text" @click="state.isOpen = false">
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </Teleport>
</template>
./confirm
