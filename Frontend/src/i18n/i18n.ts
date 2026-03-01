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
            btnLibros: 'Ver Libros',
            btnSignin: 'Registrarse',
            btnLogin: 'Iniciar sesion'
        },
        landing: {
            bienvenida: {
                titulo: 'Bienvenido a ClientLibrary',
                subtitulo: 'Descubre tu próxima gran lectura',
                button: 'Explorar Libros'
            },
            cards: {
                primera: {
                    titulo: 'Amplio Catálogo',
                    texto: 'Miles de libros disponibles'
                },
                segunda: {
                    titulo: 'Reseñas',
                    texto: 'Opiniones de lectores'
                },
                tercera: {
                    titulo: 'Favoritos',
                    texto: 'Guarda tus preferidos'
                },
            }
        },
        sigin: {
            sigin: 'Registrarse',
            email: 'Correo',
            password: 'Contraseña',
            btnSigin: 'Inciar sesion',
            
        },
        forms:{
            isEmpty: 'Este campo es obligatorio',
            notEmail: 'Este campo tiene que ser un email valido',
            invalidPassword: 'La contraseña debe contener al menos 8 caracteres',
            userRegistered: 'Este correo ya tiene un usuario asociado'
        }
    }
  }
})