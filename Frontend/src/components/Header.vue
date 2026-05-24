<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

// Variables
const router = useRouter()
const { user } = useUserStore()
function irLogin(){
    router.push('/LogIn')
}
function irSigIn(){
    router.push('/SigIn')
}
function irLibros(){
    router.push('/Books')
}

function irUser() {
    if(user.usuario?.rol === 'admin') router.push('/Admin' )
    else router.push('/User')
}
function administrarUsuarios() {
    router.push('/Admin/Users')
}
</script>
<template>
    <header>
        <v-row cols="12" class="header" align="center">
            <v-col md="1">

            </v-col>
            <v-col md="2">
                <v-btn prepend-icon="mdi-arch" @click="router.push('/Landing')">
                    Logo
                </v-btn> 
            </v-col>
            <v-col md="3">
                <span>Estas en {{ router.currentRoute.value.name }}</span>
            </v-col>
            <v-col md="6">
                <v-row cols="12" align="end">
                    <v-col md="4">
                         <v-btn :text="$t('header.btnLibros')" append-icon="mdi-book" @click="irLibros" color="red" />
                    </v-col>
                    <v-col v-if="(user.token === '')" md="4">
                        <v-btn :text="$t('header.btnLogin')" append-icon="mdi-account-circle" @click="irLogin" color="red" />
                    </v-col>
                    <v-col v-if="(user.token === '')" md="4">
                        <v-btn :text="$t('header.btnSignin')" append-icon="mdi-key" @click="irSigIn" color="red" />
                    </v-col>
                    <v-col v-if="user.token !== ''" md="4">
                        <v-btn :text="$t('header.btnProfile')" append-icon="mdi-account-circle" @click="irUser" color="red" />
                    </v-col>
                    <v-col v-if="user.usuario?.rol === 'admin'" md="4">
                        <v-btn :text="$t('header.btnAdmin')" append-icon="mdi-account-circle" @click="administrarUsuarios" color="red" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </header>
</template>
<style scoped>
.header {
    margin-bottom: 30px;
}
</style>