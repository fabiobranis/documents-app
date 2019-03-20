<template>
    <v-layout row wrap>
        <v-flex xs6 md4>
            <v-select
                    :items="selectFields"
                    item-text="text"
                    item-value="value"
                    v-model="search.field"
            ></v-select>
        </v-flex>
        <v-flex xs6 md4>
            <v-text-field v-model="search.query"></v-text-field>
        </v-flex>
        <v-flex xs6 md4>
            <v-btn @click="searchData">Search</v-btn>
            <v-btn @click="clearSearchData">Clear</v-btn>
        </v-flex>
        <v-flex xs12 md12>
            <v-data-table
                    :headers="headers"
                    :items="documents"
                    :pagination.sync="pagination"
                    :total-items="totalItems"
                    :loading="loading"
                    class="elevation-2"
            >
                <template v-slot:items="props">
                    <td>{{props.item.name}}</td>
                    <td>{{props.item.number}}</td>
                    <td>{{props.item.type}}</td>
                    <td>
                        <v-icon
                                small
                                class="mr-2"
                                @click="blacklist(props.item._id)"
                        >
                            thumb_up
                        </v-icon>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>

    import {HTTP} from "../../plugins/http-common";
    import DocumentMasker from '../../helpers/DocumentMasker';

    export default {
        data: () => ({
            total: 0,
            loading: true,
            totalItems: 0,
            search: {
                field: null,
                query: null
            },
            pagination: {
                descending: true,
                page: 1,
                rowsPerPage: 5,
                sortBy: 'name'
            },
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: true,
                    value: 'name'
                },
                {
                    text: 'Number',
                    align: 'left',
                    sortable: true,
                    value: 'number',
                },
                {
                    text: 'Type',
                    align: 'left',
                    sortable: true,
                    value: 'type'
                },
                {
                    text: 'Actions',
                    value: 'name',
                    sortable: false,
                }
            ],
            documents: []
        }),
        computed: {
            selectFields() {
                return this.headers.map(h => {
                    return {
                        text: h.text,
                        value: h.value
                    }
                });
            }
        },
        methods: {
            async blacklist(id) {
                this.$emit('blacklist', id)
            },
            async clearSearchData() {
                this.search = {
                    field: null,
                    query: null
                };
                this.setData();
            },
            async searchData() {
                this.pagination.page = 1;
                await this.setData();
            },
            async setData() {
                const data = await this.fetchDataFromApi();
                this.documents = data.result.docs.map(i => {
                    i.number = DocumentMasker(i.number, i.type);
                    return i
                });
                this.totalItems = data.result.totalDocs;
            },
            async fetchDataFromApi() {
                try {
                    const sortDirection = this.pagination.descending ? '-' : '+';
                    let searchParams = {};

                    if (this.search.field && this.search.query) {
                        searchParams[this.search.field] = this.search.query;
                    }

                    const params = {
                        page: this.pagination.page,
                        sort: `${sortDirection}${this.pagination.sortBy}`,
                        pageLength: this.pagination.rowsPerPage,
                        ...searchParams
                    };

                    this.loading = true;
                    const {data} = await HTTP.get('blacklist', {params});
                    this.loading = false;
                    return data;
                } catch (error) {
                    throw error;
                }
            }
        },
        watch: {
            pagination: {
                async handler() {
                    await this.setData();
                },
                deep: true
            }
        },
        async created() {
            this.setData();
        }

    }
</script>

<style scoped>

</style>