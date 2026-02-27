import { createI18n } from "vue-i18n";
// Copiado y pegado del tfg, cambiar contenido
export const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en: {
        message: {
            hello: 'hello world'
        },
    },
    es: {
        placeholder: 'Aqui va algo',
        header:{
            game: 'Jugar',
            classification: 'Clasificacion',
            signin: 'Registrarse',
            login: 'Iniciar sesion'
        },
        message: {
            hello: 'Pollas como ollas'
        }
    }
  }
})