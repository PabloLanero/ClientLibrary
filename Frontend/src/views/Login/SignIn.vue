<script setup lang="ts">
// Imports
import { ErrorMessage, Field, Form} from 'vee-validate'
import { useValidation } from '@/stores/validationStore';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
// Type
import type { Register } from '@/models/DTOs/Register';
import type { Auth } from '@/models/Auth';



// Constantes
const usuario = ref<Register>({
    userName: '',
    userLastName: '',
    email: '',
    password: ''
})
const seLogueo = ref<boolean>()
const {  register } = useUserStore()
const { validateEmail, validatePassword, validateString } = useValidation()
const router = useRouter()
async function submit (values: any){
    usuario.value.userName = values.name
    usuario.value.userLastName = values.lastName
    usuario.value.email = values.email
    usuario.value.password = values.password

    let dejo = await register(usuario.value)
    if (dejo) router.push('/User')
    seLogueo.value = !dejo
  }


</script>
<template>
    <v-card class="signin-card">
        <v-card-title class="signin-title">{{ $t('sigin.sigin') }}</v-card-title>
        <Form @submit="submit">
        <v-card-text class="signin-content">
                <Field class="signin-field" :model-value="usuario.userName" name="name" :rules="validateString" 
                 placeholder="Nombre"/>
                <ErrorMessage class="signin-error" name="name"/>
                <Field class="signin-field" :model-value="usuario.userLastName" name="lastName" :rules="validateString"  placeholder="Apellido"/>
                <ErrorMessage class="signin-error" name="lastName"/>
                <Field class="signin-field" :model-value="usuario.email" name="email" :rules="validateEmail" 
                 :placeholder="$t('sigin.email')"/>
                <ErrorMessage class="signin-error" name="email"/>
                <Field class="signin-field" name="password" type="password" :model-value="usuario.password" 
                :rules="validatePassword" :placeholder="$t('sigin.password')"/>
                <ErrorMessage class="signin-error" name="password"/>
                <span v-if="seLogueo" class="signin-error">{{$t('forms.userRegistered')}}</span>
            </v-card-text>
            <v-card-actions class="signin-actions">
                <button  class="signin-btn" name="btn" >{{$t('sigin.btnSigin')}}</button>
            </v-card-actions>
        </Form>
    </v-card>
</template>


<style scoped>
.signin-card {
    max-width: 450px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.signin-title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #1976d2;
    margin-bottom: 20px;
}

.signin-content {
    padding: 20px 30px;
}

.signin-field {
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 8px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.signin-field:focus {
    outline: none;
    border-color: #1976d2;
}

.signin-error {
    display: block;
    color: #d32f2f;
    font-size: 13px;
    margin-bottom: 12px;
    margin-top: -4px;
}

.signin-actions {
    padding: 0 30px 30px;
}

.signin-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.signin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.signin-btn:active {
    transform: translateY(0);
}
</style>
