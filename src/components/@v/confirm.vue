<script setup lang="ts">
import store from '../../utils/confirm'

const display = useDisplay()
const colorIconTitle = computed(() => {
    if (store.state.options.btnOk) {
        return store.state.options.btnOk.color
    }
    else {
        return ''
    }
})

const card_min_width = computed(() => display.mobile.value ? '0px' : '300px')
</script>

<template>
    <Teleport to="body">
        <div v-if="store.state.isOpen">
            <VRow>
                <VDialog v-model="store.state.isOpen" persistent width="auto">
                    <VCard :min-width="card_min_width">
                        <VCardTitle class="pa-1 pl-2 font-weight-black">
                            <VIcon
                                v-if="store.state.options.iconTitle"
                                class="animate-tada animate-count-infinite animate-duration-2s"
                                :color="colorIconTitle"
                                :icon="store.state.options.iconTitle ?? ' mdi-alert-circle-outline'"
                            />
                            {{ store.state.title }}
                        </VCardTitle>
                        <VDivider />
                        <VCardText mt2 mb1>
                            <span v-html="store.state.message" />
                        </VCardText>
                        <VCardActions class="justify-center">
                            <VBtn
                                v-if="store.state.options.btnCancel"
                                min-width="116px"
                                :color="store.state.options.btnCancel?.color ?? 'default'"
                                :prepend-icon="store.state.options.btnCancel?.icon ?? 'mdi-close'"
                                :text="store.state.options.btnCancel?.text ?? 'Cancel'"
                                @click="store.onCancel()"
                            />
                            <VBtn
                                v-if="store.state.options.btnOk"
                                min-width="116px"
                                :color="store.state.options.btnOk?.color ?? 'success'"
                                :prepend-icon="store.state.options.btnOk?.icon ?? 'mdi-check'"
                                :text="store.state.options.btnOk?.text ?? 'Yes'"
                                @click="store.onOk()"
                            />
                        </VCardActions>
                    </VCard>
                </VDialog>
            </VRow>
        </div>
    </Teleport>
</template>
