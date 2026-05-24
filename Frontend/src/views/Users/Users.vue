<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Usuario } from '@/models/Usuario';
import UserData from './components/UserData.vue';


const users = ref<Usuario[]>()
const usuarioSeleccionado = ref<Usuario>({
    id: 0,
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    rol: '',
    estaActivo: true
})
const showUpdate = ref<boolean>(false)


function getUsuarios() {
    fetch('http://localhost:8941/api/Usuario').then(res => res.json())
    .then(res => users.value = res)
}

function updateUsuario(usuario: Usuario){
    let header = {
    'Content-Type': 'application/json',
  }
    fetch('http://localhost:8941/api/Usuario',{
        method: 'PUT',
        headers: header,
        body: JSON.stringify(usuario)
    }).then(res => res.json())
    .then((res: boolean) => {
        if(res){
            
        }
    })
}

function deleteUsuario(usuario: Usuario){
    let header = {
    'accept': 'text/plain',
  }
    fetch('http://localhost:8941/api/Usuario?idUsuario='+usuario.id,{
        method: 'DELETE',
        headers: header,
    }).then(res => res.json())
    .then((res: boolean) => {
        if(res){
            
        }
    })
}

function selectUser(usuario: Usuario){
    usuarioSeleccionado.value = usuario
    showUpdate.value = true
    updateUsuario(usuarioSeleccionado.value)
}

onMounted( () => {
    getUsuarios()
})

</script>
<template>
    <v-row  cols="12">
        <v-col v-for="usuario in users" md="4">
            
            <UserData :usuario="usuario" @update-usuario="selectUser" @delete-usuario="deleteUsuario"></UserData>
        </v-col>
    </v-row>
    <v-dialog :model-value="showUpdate">
        <v-card>
            <v-card-title>
                {{ usuarioSeleccionado?.nombre }}
            </v-card-title>
            <v-card-text>
                <v-text-field :label="$t('users.update.name')" v-model:model-value="usuarioSeleccionado.nombre"></v-text-field>
                <v-text-field :label="$t('users.update.surname')" v-model:model-value="usuarioSeleccionado.apellido"></v-text-field>
                <v-text-field :label="$t('users.update.email')" v-model:model-value="usuarioSeleccionado.email"></v-text-field>
                <v-text-field :label="$t('users.update.password')" v-model:model-value="usuarioSeleccionado.password"></v-text-field>
                <v-switch :label="$t('users.update.active')" v-model:model-value="usuarioSeleccionado.estaActivo"></v-switch>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="updateUsuario(usuarioSeleccionado)">{{ $t('users.update.save') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>