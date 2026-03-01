<script setup lang="ts">
import { useValidation } from '@/stores/Central';
import type { Libro } from '@/models/Libros';
import { Form, Field, ErrorMessage } from 'vee-validate';

const nuevoLibro = defineModel<Libro>('nuevoLibro',{required: true})

const emits = defineEmits(['addBook'])

const  { validateString, validateNumber } = useValidation()

function submit(values: any){
    nuevoLibro.value.isbn = values.isbn.trim()
    nuevoLibro.value.titulo = values.titulo.trim()
    nuevoLibro.value.genero = values.genero.trim()
    nuevoLibro.value.numeroPaginas = values.numeroPaginas
    nuevoLibro.value.precio = values.precio
    emits('addBook',nuevoLibro.value)
    
    
}

</script>
<template>
<v-card class="book-card">
    <v-card-title class="book-title">Añadir Libro</v-card-title>
    <Form @submit="submit" class="book-form">
        <v-card-text class="book-form-content">
            <Field name="isbn" :placeholder="$t('book.isbn')" :rules="validateString" class="form-input" />
            <ErrorMessage name="isbn" class="error-message" />
            <Field name="titulo" :placeholder="$t('book.title')" :rules="validateString" class="form-input" />
            <ErrorMessage name="titulo" class="error-message" />
            <Field name="genero" :placeholder="$t('book.gender')" :rules="validateString" class="form-input" />
            <ErrorMessage name="genero" class="error-message" />
            <Field name="numeroPaginas" :placeholder="$t('book.pages')" type="number" :rules="validateNumber" class="form-input" />
            <ErrorMessage name="numeroPaginas" class="error-message" />
            <Field name="precio" :placeholder="$t('book.price')" :rules="validateNumber" type="number" class="form-input" />
            <ErrorMessage name="precio" class="error-message" />

        </v-card-text>
        <v-card-actions class="book-actions">
            <button class="submit-btn">{{ $t('book.btnUpload') }}</button>
        </v-card-actions>
    </Form>
</v-card>
</template>

<style scoped>
.book-card {
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1.5rem;
}

.book-form-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.book-actions {
  padding: 1.5rem;
  justify-content: center;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}
</style>