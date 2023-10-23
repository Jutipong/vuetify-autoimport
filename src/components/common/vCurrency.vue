<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';

enum CurrencyDisplay {
  symbol = 'symbol',
  narrowSymbol = 'narrowSymbol',
  code = 'code',
  name = 'name',
  hidden = 'hidden',
}

type currencyType = Number | null;

const props = defineProps({ modelValue: Number || null });

const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
  currency: 'USD',
  currencyDisplay: CurrencyDisplay.hidden,
  precision: 2,
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: true,
});

watch(
  () => props.modelValue,
  (val) => {
    setValue(val as number | null);
  }
);

const onClear = () => setValue(null);
</script>

<template>
  <VTextField
    ref="inputRef"
    type="text"
    :clearable="false"
    v-model="formattedValue"
    @click:clear="onClear"></VTextField>
  <!-- <VTextField v-model="formattedValue" density="compact" variant="solo" ref="inputRef">
    <template #prepend>
      <VBtn size="x-small" icon @click="setValue(--numberValue)">➖</VBtn>
    </template>
    <template #append>
      <VBtn size="x-small" icon @click="setValue(++numberValue)">➕</VBtn>
    </template>
  </VTextField> -->
</template>
