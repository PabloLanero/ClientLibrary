<script setup lang="ts">
import type { Usuario } from '@/models/Usuario';

const props = defineProps<{
    user?: Usuario
}>()
</script>
<template>
    <v-card class="user-card">
        <v-card-text class="user-card-content">
            <div class="user-avatar">
                <v-icon size="80" color="primary">mdi-account-circle</v-icon>
            </div>
            <div class="user-info">
                <h2 class="user-name">{{ user?.nombre }} {{ user?.apellido }}</h2>
                <p class="user-email"><v-icon size="18">mdi-email</v-icon> {{ user?.email }}</p>
                <p class="user-role" v-if="user?.rol === 'admin'"><v-icon size="18">mdi-shield-account</v-icon> {{ user?.rol }}</p>
                <p class="user-date"><v-icon size="18">mdi-calendar</v-icon> {{ user?.fechaRegistro }}</p>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.user-card {
    max-width: 500px;
    margin: 20px auto;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.user-card-content {
    display: flex;
    gap: 24px;
    padding: 32px;
}

.user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-info {
    flex: 1;
}

.user-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1976d2;
}

.user-email,
.user-role,
.user-date {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: #666;
    font-size: 14px;
}

.user-status {
    margin-top: 12px;
}
</style>