<script setup lang="ts">
import type { Usuario } from '@/models/Usuario';

const props = defineProps<{
    usuario: Usuario
}>()

const emit = defineEmits([
    'updateUsuario',
    'deleteUsuario'
    ])
</script>
<template>
    <v-card class="user-card">
        <div class="user-header" :class="{ 'active': props.usuario.estaActivo, 'inactive': !props.usuario.estaActivo }">
            <v-icon size="60" color="white">mdi-account-circle</v-icon>
        </div>
        <v-card-text class="user-content">
            <h3 class="user-name">{{ props.usuario.nombre }} {{ props.usuario.apellido }}</h3>
            <p class="user-email"><v-icon size="16">mdi-email</v-icon> {{ props.usuario.email }}</p>
            <p class="user-rol"><v-icon size="16">mdi-shield-account</v-icon> {{ props.usuario.rol }}</p>
            <p class="user-date"><v-icon size="16">mdi-calendar</v-icon> {{ props.usuario.fechaRegistro }}</p>
            <div class="user-footer">
                <v-chip :color="props.usuario.estaActivo ? 'success' : 'error'" size="small">
                    {{ props.usuario.estaActivo ? $t('users.status.active') : $t('users.status.inactive') }}
                </v-chip>
            </div>
        </v-card-text>
        <v-card-actions class="user-actions">
            <v-btn color="primary" variant="text" @click="emit('updateUsuario', props.usuario)">
                <v-icon>mdi-pencil</v-icon> {{ $t('users.action.update') }}
            </v-btn>
            <v-btn color="error" variant="text" @click="emit('deleteUsuario', props.usuario)">
                <v-icon>mdi-delete</v-icon> {{ $t('users.action.delete') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.user-card {
    width: 280px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.user-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    border-radius: 12px 12px 0 0;
}

.user-header.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.user-header.inactive {
    background: linear-gradient(135deg, #757575 0%, #424242 100%);
}

.user-content {
    padding: 20px;
}

.user-name {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1976d2;
    min-height: 48px;
}

.user-email,
.user-rol,
.user-date {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: #666;
    font-size: 13px;
}

.user-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
}

.user-actions {
    display: flex;
    justify-content: space-around;
    padding: 8px 16px 16px;
}
</style>