<script setup lang="ts">
  import { useCurrencyInput } from 'vue-currency-input'
  import { PropType } from 'vue'

  enum CurrencyDisplay {
    symbol = 'symbol',
    narrowSymbol = 'narrowSymbol',
    code = 'code',
    name = 'name',
    hidden = 'hidden',
  }

  const props = defineProps({
    modelValue: {
      type: [Number, null] as PropType<number | null>,
      required: false,
    },
  })

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
  })

  watch(
    () => props.modelValue,
    (val) => {
      setValue(val as number | null)
    }
  )

  const onClear = () => setValue(null)
</script>

<template>
  <VTextField
    ref="inputRef"
    type="text"
    :clearable="false"
    v-model="formattedValue"
    @click:clear="onClear"></VTextField>
</template>
