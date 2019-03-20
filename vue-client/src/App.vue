<template>
    <v-app id="inspire">
        <side-navigation
                :drawer="drawer"
        ></side-navigation>
        <top-bar
                @toggleMenu="drawer = !drawer"
                title="Documents App"
        ></top-bar>
        <v-content>
            <v-container fluid fill-height class="grey lighten-4">
                <v-layout justify-center>
                    <v-flex xs12 sm12 md12>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import SideNavigation from './components/layout/SideNavigation';
    import TopBar from "./components/layout/TopBar";

    export default {
        components: {TopBar, SideNavigation},
        data() {
            return {
                drawer: true
            }
        }
    }
</script>
