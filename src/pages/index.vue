<script setup lang="ts">
// import { Icon } from '@iconify/vue'

const items = [
    {
        color: 'red-lighten-2',
        icon: 'mdi-star',
    },
    {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
    },
    {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
    },
    {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
    },
]
function alertInfo() {
    _alert.Info('Title infomation', 'sub title infomation')
}

function alertSuccess() {
    _alert.Success('Title success', 'sub title success')
}

function alertWarning() {
    _alert.Warning('Title warning', 'sub title warning')
}

function alertError() {
    _alert.Err('Title error', 'sub title error')
}
</script>

<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-countdown />
            </v-card-text>
            <v-card-actions justify-end>
                <v-btn color="primary" @click="alertInfo">
                    alert info
                </v-btn>

                <v-btn color="success" @click="alertSuccess">
                    alert success
                </v-btn>

                <v-btn color="warning" @click="alertWarning">
                    alert warning
                </v-btn>

                <v-btn color="error" @click="alertError">
                    alert error
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card>
            <v-card-text>
                <div class="mdi-airplane-edit text-pink-400" />

                <div
                    cursor-pointer
                    class="mdi-emoticon text-green-400"
                    hover="mdi-emoticon-angry text-red-400"
                />

                <div class="mdi-emoticon-sad-outline" />
                <div class="mdi:checkbox-marked-circle-outline" />

                <v-timeline align="start">
                    <v-timeline-item
                        v-for="(item, i) in items"
                        :key="i"
                        :dot-color="item.color"
                        :icon="item.icon"
                        fill-dot
                    >
                        <v-card>
                            <v-card-title class="text-h6" :class="[`bg-${item.color}`]">
                                Lorem Ipsum Dolor
                            </v-card-title>
                            <v-card-text class="text--primary bg-white">
                                <p>
                                    Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                                    convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
                                    salutandi sententiae.
                                </p>
                                <v-btn
                                    :color="item.color"
                                    variant="outlined"
                                >
                                    Button
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
        </v-card>
    </v-container>
</template>
