<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input';

const props = defineProps<{ modelValue: Number; options: Object }>();

const inputCurrencyOption = {
  locale: undefined,
  currency: 'USD',
  currencyDisplay: 'hidden',
  valueRange: undefined,
  precision: 2,
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: false,
  hideNegligibleDecimalDigitsOnFocus: false,
  autoDecimalDigits: true,
  exportValueAsInteger: false,
  autoSign: false,
  useGrouping: true,
};
const { inputRef } = useCurrencyInput(inputCurrencyOption);
</script>

<template>
  <VTextField ref="inputRef" type="text"></VTextField>
</template>
