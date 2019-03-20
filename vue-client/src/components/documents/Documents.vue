<template>
    <v-card>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 sm12 md12 align-center flexbox>
                    <span class="headline">Documents</span>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 sm12 md12 align-center flexbox>
                    <documents-table></documents-table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import DocumentsTable from "./DocumentsTable";
    export default {
        components: {DocumentsTable}
    }
</script>

<style scoped>

</style>