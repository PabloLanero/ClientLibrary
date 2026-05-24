<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import UserCard from '../../../components/UserCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
const { user } = useUserStore();
const router = useRouter()
onMounted( () => {
    if(user.token === ''){
        router.go(-1)
    }
})
</script>
<template>
    <div>
        <UserCard :user="user.usuario " />

    </div>
</template>