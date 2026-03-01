<script setup lang="ts">
import { useUserStore } from '@/stores/Central';
import UserCard from './components/UserCard.vue';

const { user } = useUserStore();


</script>
<template>
    <div>
        <UserCard :user="user.usuario " />

    </div>
</template>