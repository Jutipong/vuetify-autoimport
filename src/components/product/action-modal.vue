<script setup lang="ts">
import { Product } from '@/types/product';

const { Create } = useProductStore();
const active = defineModel<boolean>();
// const props = defineProps<Product>();

function onClosed() {
  active.value = false;
}
</script>

<template>
  <teleport to="body">
    <v-row justify="center">
      <v-dialog v-model="active" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5">Create Product</span>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Title"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Price"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Rating"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Stock"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Brand"></v-text-field>
              </v-col>
              <v-col cols="12" md="4"> </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              prepend-icon="mdi-content-save"
              text="Save"
              @click=""></v-btn>
            <v-btn
              color="warning"
              text="Close"
              prepend-icon="mdi-close"
              @click="onClosed()"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </teleport>
</template>
