<template>
    <v-card>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs10 sm10 md10 align-center flexbox>
                    <span class="headline">Documents</span>
                    <v-alert
                            type="success"
                            v-model="success"
                            dismissible
                    >
                        {{message}}
                    </v-alert>
                </v-flex>
                <v-flex xs2 sm2 md2>
                    <v-btn color="amber" @click="createItem">New Document</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 sm12 md12 align-center flexbox>
                    <documents-table
                            ref="documentsTable"
                            @editItem="editItem"
                            @deleteItem="deleteItem"
                            @blacklist="blacklist"
                    ></documents-table>
                </v-flex>
            </v-layout>
        </v-container>
        <documents-form
                :dialog="dialog"
                :id="id"
                :operation="operation"
                @closeDialog="closeDialog"
                @success="formActionSuccess"
        ></documents-form>
    </v-card>
</template>

<script>
    import DocumentsTable from "./DocumentsTable";
    import DocumentsForm from "./DocumentsForm";
    import {HTTP} from "../../plugins/http-common";

    export default {
        components: {DocumentsForm, DocumentsTable},
        data: () => ({
            dialog: false,
            operation: null,
            id: null,
            success: false,
            message: null
        }),
        methods: {
            formActionSuccess() {
                this.showSuccessAlert('Success! The document is stored!');
            },
            showSuccessAlert(message) {
                this.message = message;
                this.success = true;
            },
            closeSuccessAlert() {
                this.message = null;
                this.success = false;
            },
            createItem() {
                this.activateDialog('create');
            },
            async editItem(id) {
                this.activateDialog('edit',id);
            },
            async deleteItem(id) {

                this.closeSuccessAlert();

                if (!confirm('Are sure you want to delete this document?')) {
                    return;
                }

                try{
                    await HTTP.delete(`/documents/${id}`);
                    this.showSuccessAlert('Success!The document was deleted!');
                    this.updateTable();
                }catch (error) {
                    throw error;
                }

            },
            async blacklist(id) {

                this.closeSuccessAlert();

                if (!confirm('Are sure you want to put this document in the Black List?')) {
                    return;
                }

                try{
                    await HTTP.post(`/documents/${id}/blacklist`);
                    this.showSuccessAlert('Success!The document is now on the Black List!');
                    this.updateTable();
                }catch (error) {
                    throw error;
                }
            },
            updateTable() {
                this.$refs.documentsTable.setData();
            },
            closeDialog() {
                this.operation = null;
                this.id = null;
                this.dialog = false;
                this.updateTable();
            },
            activateDialog(operation, id = null) {
                this.closeSuccessAlert();
                this.operation = operation;
                this.id = id;
                this.dialog = true;
            }
        }
    }
</script>

<style scoped>

</style>