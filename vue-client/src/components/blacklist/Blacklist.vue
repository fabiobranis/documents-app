<template>
    <v-card>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs10 sm10 md10 align-center flexbox>
                    <span class="headline">Black List</span>
                    <v-alert
                            type="success"
                            v-model="success"
                            dismissible
                    >
                        {{message}}
                    </v-alert>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 sm12 md12 align-center flexbox>
                    <blacklist-table
                            ref="blacklistTable"
                            @blacklist="blacklist"
                    ></blacklist-table>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import BlacklistTable from "./BlacklistTable";
    import {HTTP} from "../../plugins/http-common";

    export default {
        components: { BlacklistTable},
        data: () => ({
            success: false,
            message: null
        }),
        methods: {
            showSuccessAlert(message) {
                this.message = message;
                this.success = true;
            },
            closeSuccessAlert() {
                this.message = null;
                this.success = false;
            },
            async blacklist(id) {

                this.closeSuccessAlert();

                if (!confirm('Are sure you want to remove this document from the Black List?')) {
                    return;
                }

                try{
                    await HTTP.delete(`/documents/${id}/blacklist`);
                    this.showSuccessAlert('Success!The document is now out of the Black List!');
                    this.updateTable();
                }catch (error) {
                    throw error;
                }
            },
            updateTable() {
                this.$refs.blacklistTable.setData();
            }
        }
    }
</script>

<style scoped>

</style>