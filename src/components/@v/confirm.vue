<script setup lang="ts">
import store from './confirm'

const colorIconTitle = computed(() => {
    if (store.state.options.btnOk) {
        return store.state.options.btnOk.color
    }
    else {
        return ''
    }
})
</script>

<template>
    <Teleport to="body">
        <div v-if="store.state.isOpen">
            <VRow justify="center">
                <VDialog v-model="store.state.isOpen" persistent width="auto">
                    <VCard min-height="160px">
                        <VCardTitle class="pa-1 pl-2 font-weight-black">
                            <VIcon
                                v-if="store.state.options.iconTitle"
                                class="animate-tada animate-count-infinite animate-duration-3s"
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
