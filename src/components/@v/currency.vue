<script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, null] as PropType<number | null>,
    required: false,
  },
})

enum CurrencyDisplay {
  symbol = 'symbol',
  narrowSymbol = 'narrowSymbol',
  code = 'code',
  name = 'name',
  hidden = 'hidden',
}

const { inputRef, formattedValue, setValue } = useCurrencyInput({
  currency: 'USD',
  currencyDisplay: CurrencyDisplay.hidden,
  precision: 2,
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  useGrouping: true,
  accountingSign: true,
})

watch(
  () => props.modelValue,
  (val) => {
    setValue(val as number | null)
  },
)

const onClear = () => setValue(null)
</script>

<template>
  <VTextField
    ref="inputRef"
    v-model="formattedValue"
    type="text"
    :clearable="false"
    @click:clear="onClear"
  />
</template>
