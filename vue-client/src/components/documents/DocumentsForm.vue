<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Document</span>
                    <v-alert
                            v-model="alert"
                            dismissible
                    >
                        <ul>
                            <li v-for="error in errors">{{error}}</li>
                        </ul>
                    </v-alert>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        v-model="name"
                                        label="Name*"
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-select
                                        v-model="type"
                                        :items="typeOptions"
                                        label="Type*"
                                        required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        v-model="number"
                                        label="Number*"
                                        hint="Must match to the document type"
                                        :disabled="type === null"
                                        :mask="numberMask"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="confirm">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>

    import {HTTP} from "../../plugins/http-common";

    export default {
        props: {
            dialog: {
                type: Boolean,
                required: true
            },
            id: {
                type: String
            },
            operation: {
                type: String
            }
        },
        data: () => ({
            alert: false,
            name: null,
            number: null,
            type: null,
            errors: [],
            typeOptions: [
                'Person',
                'Company'
            ]
        }),
        computed: {
            numberMask() {
                if (this.type === 'Person') {
                    return '###.###.###-##';
                }
                return '##.###.###/####-##';
            }
        },
        methods: {
            closeDialog() {
                this.resetForm();
                this.$emit('closeDialog');
            },
            resetForm() {
                this.name = null;
                this.number = null;
                this.type = null;
            },
            async confirm() {
                const method = this.operation === 'create' ? 'POST' : 'PUT';
                const url = this.id ? `/documents/${this.id}` : '/documents';
                const data = {
                    name: this.name,
                    number: this.number,
                    type: this.type
                };

                try {
                    const response = await HTTP.request({
                        method,
                        url,
                        data
                    });
                    this.$emit('success', response);
                    this.closeDialog();
                } catch (error) {
                    this.errors = error.response.data.map(d => `Field: ${d.param} Message: ${d.msg}`);
                    this.alert = true;
                }
            }
        },
        watch: {
            async id(value) {
                if (value) {
                    try {
                        const {data} = await HTTP.get(`/documents/${value}`);
                        this.name = data.document.name;
                        this.number = data.document.number;
                        this.type = data.document.type;
                    } catch (error) {
                        throw error;
                    }

                }
            },
            alert(value) {
                if (!value) {
                    this.errors = [];
                }
            }
        }
    }
</script>

<style scoped>

</style>