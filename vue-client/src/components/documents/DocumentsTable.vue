<template>
    <v-data-table
            :headers="headers"
            :items="documents"
            class="elevation-2"
    >
        <template v-slot:items="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.number}}</td>
            <td>{{props.item.type}}</td>
            <td>{{props.item.created_at}}</td>
        </template>
    </v-data-table>
</template>

<script>

    import {HTTP} from "../../plugins/http-common";

    export default {
        data: () => ({
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
                    text: 'Registered In',
                    align: 'center',
                    sortable: true,
                    value: 'created_at'
                }
            ],
            documents: []
        }),
        async created() {
            try{
               const {data} = await HTTP.get('documents');
               this.documents = data.result.docs;

            }catch (error) {
                throw error;
            }
        }

    }
</script>

<style scoped>

</style>