<script setup lang="ts">
import type { Libro } from '@/models/Libros';


const props = defineProps<{
    libro: Libro
}>()
</script>
<template>
    <v-card class="book-card">
        <div class="book-header" :class="{ 'available': libro.disponible, 'unavailable': !libro.disponible }">
            <v-icon size="60" color="white">mdi-book-open-page-variant</v-icon>
        </div>
        <v-card-text class="book-content">
            <h3 class="book-title">{{ libro.titulo }}</h3>
            <p class="book-genre"><v-icon size="16">mdi-tag</v-icon> {{ libro.genero }}</p>
            <p class="book-isbn"><v-icon size="16">mdi-barcode</v-icon> {{ libro.isbn }}</p>
            <p class="book-pages"><v-icon size="16">mdi-file-document</v-icon> {{ libro.numeroPaginas }} páginas</p>
            <p class="book-date"><v-icon size="16">mdi-calendar</v-icon> {{ new Date(libro.fechaPublicacion).toLocaleDateString() }}</p>
            <div class="book-footer">
                <span class="book-price">${{ libro.precio.toFixed(2) }}</span>
                <v-chip :color="libro.disponible ? 'success' : 'error'" size="small">
                    {{ libro.disponible ? 'Disponible' : 'No disponible' }}
                </v-chip>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.book-card {
    width: 280px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.book-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.book-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    border-radius: 12px 12px 0 0;
}

.book-header.available {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.book-header.unavailable {
    background: linear-gradient(135deg, #757575 0%, #424242 100%);
}

.book-content {
    padding: 20px;
}

.book-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #1976d2;
    min-height: 48px;
}

.book-genre,
.book-isbn,
.book-pages,
.book-date {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: #666;
    font-size: 13px;
}

.book-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
}

.book-price {
    font-size: 20px;
    font-weight: 700;
    color: #4caf50;
}
</style>