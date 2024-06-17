<script setup lang="ts">
import store from '@/utils/confirm'
</script>

<template>
    <Teleport to="body">
        <div v-if="store.state.isOpen">
            <VRow justify="center">
                <VDialog v-model="store.state.isOpen" persistent width="auto">
                    <VCard min-height="160px">
                        <VCardTitle class="pa-1 pl-2">
                            <VIcon
                                :color="store.state.options.btnOk?.color ?? ''"
                                :icon="store.state.options.iconTitle ?? ' mdi-alert-circle-outline'"
                            />
                            {{ store.state.title }}
                        </VCardTitle>
                        <VDivider />
                        <VCardText>
                            <span v-html="store.state.message" />
                        </VCardText>
                        <VCardActions>
                            <VSpacer />
                            <VBtn
                                v-if="!store.state.options.btnCancelDisabled"
                                min-width="116px"
                                :color="store.state.options.btnCancel?.color ?? 'default'"
                                :prepend-icon="store.state.options.btnCancel?.icon ?? 'mdi-close'"
                                :text="store.state.options.btnCancel?.text ?? 'Cancel'"
                                @click="store.onCancel()"
                            />
                            <VBtn
                                v-if="!store.state.options.btnOkDisabled"
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
