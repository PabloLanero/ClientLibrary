<script setup lang="ts">
import { useUserStore } from '@/stores/Central';

const { user } = useUserStore();


</script>
<template>
    <div>
        {{ user }}

    </div>
</template>