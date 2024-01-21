<script setup lang="ts">
const cards = ['Today', 'Yesterday']
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="card in cards"
        :key="card"
        cols="12"
      >
        <v-card>
          <v-list lines="two">
            <v-list-subheader :title="card" />

            <template
              v-for="n in 6"
              :key="n"
            >
              <v-list-item>
                <template #prepend>
                  <v-avatar color="grey-darken-1" />
                </template>

                <v-list-item-title :title="`Message ${n}`" />

                <v-list-item-subtitle
                  title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"
                />
              </v-list-item>

              <v-divider
                v-if="n !== 6"
                :key="`divider-${n}`"
                inset
              />
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
