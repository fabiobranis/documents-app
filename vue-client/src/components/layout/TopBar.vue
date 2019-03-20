<template>
    <v-toolbar color="amber" app absolute clipped-left>
        <v-toolbar-side-icon @click.native="toggleMenu"></v-toolbar-side-icon>
        <router-link
                to="/"
                tag="button"
        >
            <a class="nostyle">
                <span class="title ml-3 mr-5">{{title}}</span>
            </a>
        </router-link>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'Unnamed App'
            }
        },
        methods: {
            toggleMenu() {
                this.$emit('toggleMenu');
            }
        }
    }
</script>

<style scoped>
    a.nostyle:link {
        text-decoration: inherit;
        color: inherit;
    }

    a.nostyle:visited {
        text-decoration: inherit;
        color: inherit;
    }
</style>