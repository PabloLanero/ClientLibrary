import { createI18n } from "vue-i18n";
import {useConfigurationStore } from '@/stores/Central'
// const { idioma } = useConfigurationStore()

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en: {
        placeholder: 'Something goes here',
        header:{
            btnLibros: 'View Books',
            btnSignin: 'Sign Up',
            btnLogin: 'Log In',
            btnProfile: 'View Profile',
        },
        footer: {
            language: 'Translate',
        },
        landing: {
            bienvenida: {
                titulo: 'Welcome to ClientLibrary',
                subtitulo: 'Discover your next great read',
                button: 'Explore Books'
            },
            cards: {
                primera: {
                    titulo: 'Wide Catalog',
                    texto: 'Thousands of books available'
                },
                segunda: {
                    titulo: 'Reviews',
                    texto: 'Reader opinions'
                },
                tercera: {
                    titulo: 'Favorites',
                    texto: 'Save your favorites'
                },
            }
        },
        sigin: {
            sigin: 'Sign Up',
            email: 'Email',
            password: 'Password',
            btnSigin: 'Sign Up',
        },
        login:{
            login: 'Log In',
            btnLogin: 'Log In',
        },
        forms:{
            isEmpty: 'This field is required',
            notValid: 'This field is not valid',
            notEmail: 'This field must be a valid email',
            invalidPassword: 'Password must contain at least 8 characters',
            userRegistered: 'This email already has an associated user',
            notExist: 'This user does not exist'
        },
        book:{
            isbn: 'ISBN',
            title: 'Title',
            gender: 'Genre',
            pages: 'Number of pages',
            price: 'Price',
            avaliable: 'Available',
            btnUpload: 'Create Book'
        }
    },
    es: {
        placeholder: 'Aqui va algo',
        header:{
            btnLibros: 'Ver Libros',
            btnSignin: 'Registrarse',
            btnLogin: 'Iniciar sesion',
            btnProfile: 'Ver Perfil',
        },
        footer: {
            language: 'Traducir',
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
            btnSigin: 'Registrarse',
        },
        login:{
            login: 'Logearse',
            btnLogin: 'Logearse',
        },
        forms:{
            isEmpty: 'Este campo es obligatorio',
            notValid: 'Este campo no es valido',
            notEmail: 'Este campo tiene que ser un email valido',
            invalidPassword: 'La contraseña debe contener al menos 8 caracteres',
            userRegistered: 'Este correo ya tiene un usuario asociado',
            notExist: 'Este usuario no existe'
        },
        book:{
            isbn: 'ISBN',
            title: 'Titulo',
            gender: 'Genero',
            pages: 'Numero de paginas',
            price: 'Precio',
            avaliable: 'Diponible',
            btnUpload: 'Crear Libro'
        }
    }
  }
})