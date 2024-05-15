<script setup lang="ts">
const inputData = ref('')
const countdown = ref(0)
let timer: number | undefined

watch(inputData, _.debounce(() => {
    startCountdown()
}, 1000))

function startCountdown() {
    countdown.value = 5 // 5 seconds countdown
    if (timer)
        clearInterval(timer)

    timer = setInterval(() => {
        if (countdown.value > 0)
            countdown.value--
        else
            clearInterval(timer)
    }, 1000)
}
</script>

<template>
    <div>
        <h1>Counter Component</h1>
        <VInput v-model="inputData" />
        <VTextField v-model="inputData" label="Last name" />
        <p v-if="countdown > 0">
            Countdown: {{ countdown }}
        </p>
    </div>
</template>
