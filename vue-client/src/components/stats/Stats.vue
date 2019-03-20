<template>
    <v-card>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs10 sm10 md10 align-center flexbox>
                    <span class="headline">API Server Stats</span>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 sm12 md12 align-center flexbox>
                    <p>Uptime: {{uptime}} seconds</p>
                    <p>Total Memory: {{totalMemory}}</p>
                    <p>Free Memory: {{freeMemory}}</p>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>

    import {HTTP} from "../../plugins/http-common";

    export default {
        data: () => ({
            uptime: null,
            totalMemory: null,
            freeMemory: null,
            sessionRequests: null
        }),
        async mounted() {
            try{
                let {data} = await HTTP.get('stats');
                this.uptime = data.uptime;
                this.totalMemory = data.totalMemory;
                this.freeMemory = data.freeMemory;
            }catch (error) {
                throw error;
            }
        }
    }
</script>

<style scoped>

</style>