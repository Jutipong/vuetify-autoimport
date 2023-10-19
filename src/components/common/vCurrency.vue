<template>
  <VTextField
    ref="inputRef"
    type="text"
    :clearable="false"
    @click:clear="onClear"></VTextField>
</template>

<script setup lang="ts">
import { CurrencyDisplay } from '@/types/common/currencyInput';
import { useCurrencyInput } from 'vue-currency-input';

const { inputRef, numberValue, setValue } = useCurrencyInput(
  {
    locale: undefined,
    currency: 'USD',
    currencyDisplay: CurrencyDisplay.hidden,
    valueRange: undefined,
    precision: 2,
    hideCurrencySymbolOnFocus: true,
    hideGroupingSeparatorOnFocus: false,
    hideNegligibleDecimalDigitsOnFocus: false,
    autoDecimalDigits: true,
    useGrouping: true,
  },
  false
);

type currencyType = number | null;

const vModel = defineModel<currencyType>();

setValue(vModel.value as currencyType);

watchDebounced(
  numberValue,
  (value: currencyType) => {
    inputRef.value.value = value?.toString() ?? '';
    if (vModel.value === value) return;

    vModel.value = value;
  },
  {
    debounce: 1000,
  }
);

const onClear = () => setValue(null);
</script>
