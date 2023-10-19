<script setup lang="ts">
const { GetProducts, Clear, state } = useProductStore();
function onClear() {
  console.log('onClear');
}
</script>

<template>
  <VCard>
    <VCardTitle>
      <VChip variant="outlined" color="primary" prepend-icon="mdi-magnify" label>
        Search
      </VChip>
    </VCardTitle>
    <VDivider />
    <VCardText>
      <VRow class="">
        <VCol cols="12" md="4">
          <VTextField
            label="First name"
            v-model="state.data.table.search"
            @click:clear="onClear"></VTextField>
        </VCol>

        <VCol cols="12" md="4">
          <VTextField label="Last name"></VTextField>
        </VCol>

        <VCol cols="12" md="4">
          <VSelect
            label="Status"
            :dirty="true"
            :items="state.master.status"
            v-model="state.data.status"></VSelect>
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
    <VCardActions class="justify-end">
      <VBtn
        color="primary"
        prepend-icon="mdi-magnify"
        text="Search"
        @click="GetProducts()">
      </VBtn>
      <VBtn
        color="warning"
        prepend-icon="mdi-refresh"
        text="Clear"
        @click="Clear()"></VBtn>
    </VCardActions>
  </VCard>
</template>

<style lang="scss" scoped></style>
