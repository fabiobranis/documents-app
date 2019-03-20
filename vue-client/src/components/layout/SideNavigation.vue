<template>
    <v-navigation-drawer
            fixed
            clipped
            class="grey lighten-4"
            app
            v-model="drawer"
    >
        <v-list
                dense
                class="grey lighten-4"
        >
            <template v-for="(item, i) in items">
                <v-layout
                        row
                        v-if="item.heading"
                        align-center
                        :key="i"
                >
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-right">
                        <v-btn small flat>edit</v-btn>
                    </v-flex>
                </v-layout>
                <v-divider
                        dark
                        v-else-if="item.divider"
                        class="my-3"
                        :key="i"
                ></v-divider>
                <v-list-tile
                        :key="i"
                        v-else
                        :to="{path: item.path}"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="grey--text">
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {icon: 'contacts', text: 'Documents', path: '/documents'},
                    {icon: 'thumb_down', text: 'Black List', path: '/blacklist'},
                    {divider: true},
                    {icon: 'settings', text: 'Server Stats', path: '/stats'}
                ]
            }
        },
        props: {
            drawer: {
                type: Boolean,
                required: true
            }
        }
    }
</script>