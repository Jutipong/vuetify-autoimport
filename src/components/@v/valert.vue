<script setup lang="ts">
import store from '../../utils/alert'

const display = useDisplay()
const card_min_width = computed(() => display.mobile.value ? '0px' : '460px')
</script>

<template>
    <Teleport to="body">
        <div v-if="store.state.isOpen">
            <VRow>
                <VDialog v-model="store.state.isOpen" persistent width="auto">
                    <VCard :min-width="card_min_width" sm>
                        <VCardText mb1 mt2 text-center>
                            <v-icon
                                class="mb-6 animate-tada animate-duration-2s animate-count-infinite"
                                :color="store.state.color"
                                :icon="store.state.icon"
                                size="128"
                            />

                            <div v-if="store.state.title" class="font-weight-bold text-h4">
                                <span v-html="store.state.title" />
                            </div>

                            <div v-if="store.state.subTitle">
                                <span v-html="store.state.subTitle" />
                            </div>
                        </VCardText>

                        <VCardActions class="justify-center">
                            <VBtn
                                min-width="116px"
                                :color="store.state.color"
                                text="Close"
                                @click="store.onClose()"
                            />
                        </VCardActions>
                    </VCard>
                </VDialog>
            </VRow>
        </div>
    </Teleport>
</template>
