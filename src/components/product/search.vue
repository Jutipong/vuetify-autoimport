<script setup lang="ts">
  import { SearchPropsType } from '@/types/product';

  const { state } = useProductStore();
  const props = defineProps<SearchPropsType>();
</script>

<template>
  <VCard @keyup.enter="props.GetProducts()">
    <VCardTitle>
      <VChip variant="outlined" color="primary" prepend-icon="mdi-magnify" label> Search </VChip>
    </VCardTitle>
    <VDivider />
    <VCardText>
      <VRow class="">
        <VCol cols="12" md="4">
          <VTextField label="First name" v-model="props.search.name"></VTextField>
        </VCol>

        <VCol cols="12" md="4">
          <VTextField label="Last name" v-model="props.search.last"></VTextField>
        </VCol>

        <VCol cols="12" md="4">
          <VSelect label="Status" :dirty="true" :items="state.master.status" v-model="props.search.status"></VSelect>
        </VCol>
      </VRow>
    </VCardText>
    <VDivider />
    <VCardActions class="justify-end">
      <VBtn color="primary" prepend-icon="mdi-magnify" text="Search" @click="props.GetProducts()"> </VBtn>
      <VBtn color="warning" prepend-icon="mdi-refresh" text="Clear" @click="props.onClear()"></VBtn>
    </VCardActions>
  </VCard>
</template>

<style lang="scss" scoped></style>
