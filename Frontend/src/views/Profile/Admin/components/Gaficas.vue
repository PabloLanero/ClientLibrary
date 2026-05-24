<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
import type { ChartData, Point } from 'chart.js';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)
import type { Libro } from '@/models/Libros';
import type { Usuario } from '@/models/Usuario';
import type { Prestamo } from '@/models/Prestamo';

interface BarData {
    nombre: string,
    dato: number
}

// Variables
const props = defineProps<{
    usuarios: Usuario[],
    libros: Libro[],
    prestamo: Prestamo[]
}>()

const colores = [
    '#0f85fa',
    '#6200ff',
    '#bb00ff',
    '#ff00f6',
    '#ff0000',
    '#ff6200',
    '#fffb00',
]

const opcionLibros = ref(0)
const BarLibros = computed<ChartData<"bar">>(() => {
    let datos: BarData[] = []
    switch (opcionLibros.value) {
        case 0: // Los ordenamos por el genero
            props.libros.forEach(libro => {

                let dato: BarData | undefined = datos.find(element => element.nombre === libro.genero)
                if (dato === undefined) {

                    datos.push({
                        nombre: libro.genero,
                        dato: libro.precio
                    })


                } else {
                    dato.dato += libro.precio
                }
            })
            break;
        case 1: // Los ordenamos por fecha
            props.libros.forEach(libro => {
                let anyo : string = new Date(libro.fechaPublicacion!).getFullYear().toString()
                let dato: BarData | undefined = datos.find(element => element.nombre === anyo)
                if (dato === undefined) {
                    
                    datos.push({
                        nombre: anyo,
                        dato: libro.precio
                    })


                } else {
                    dato.dato += libro.precio
                }
            })
            datos.sort((a,b) => Number.parseInt(a.nombre)- Number.parseInt(b.nombre))
            break;

        default:
            break;

        }
        // Una vez sacado los datos que nos interesa, lo ponemos en la variable que necesitamos
        return {
            datasets: [{
                data: datos.map(dato => dato.dato),
                backgroundColor: colores,
                label: t('admin.charts.labels.prices')
            }],
            labels: datos.map(dato => dato.nombre)
        }
    
    })


const opcionPrestamo = ref(0)
const BarPrestamo = computed<ChartData<"line">>(() => {
    let datos : BarData[] = []
    
    switch (opcionPrestamo.value) {
        case 0: // Agrupamos por Año
            props.prestamo.forEach(prestamo => {
                
               let dato : BarData | undefined = datos.find(element => element.nombre === new Date(prestamo.fechaPrestamo).getFullYear().toString())

               if (dato === undefined){
                datos.push({
                    nombre: new Date(prestamo.fechaPrestamo).getFullYear().toString(),
                    dato: 1
                })
               }else{
                dato.dato++
               }

            })

            break;
         case 1: // Agrupamos por mes
            props.prestamo.forEach(prestamo => {
                let nombre: string = (new Date(prestamo.fechaPrestamo).getFullYear()).toString() +'/'+(new Date(prestamo.fechaPrestamo).getMonth()+1).toString()
               let dato : BarData | undefined = datos.find(element => element.nombre === nombre)

               if (dato === undefined){
                datos.push({
                    nombre: nombre,
                    dato: 1
                })
               }else{
                dato.dato++
               }

            })
            datos.sort((a,b) => Number.parseInt(a.nombre) - Number.parseInt(b.nombre))
            break;
        case 2: // Agrupamos por usuarios
            props.prestamo.forEach(prestamo => {
                let nombre: string = `${prestamo.usuario.nombre} (${prestamo.usuario.id})`
               let dato : BarData | undefined = datos.find(element => element.nombre === nombre)

               if (dato === undefined){
                datos.push({
                    nombre: nombre,
                    dato: 1
                })
               }else{
                dato.dato++
               }

            })
            datos.sort((a,b) => Number.parseInt(a.nombre) - Number.parseInt(b.nombre))
            break;
        case 3: // Agrupamos por libro
            props.prestamo.forEach(prestamo => {
                let nombre: string = `${prestamo.libro.titulo} (${prestamo.libro.isbn})`
               let dato : BarData | undefined = datos.find(element => element.nombre === nombre)

               if (dato === undefined){
                datos.push({
                    nombre: nombre,
                    dato: 1
                })
               }else{
                dato.dato++
               }

            })
            datos.sort((a,b) => Number.parseInt(a.nombre) - Number.parseInt(b.nombre))
            break;
    
        default:
            break;
    }



    // Ya tratados los datos, lo devolvemos
    return {
            datasets: [{
                data: datos.map(dato => dato.dato),
                borderColor: '#0f85fa',
                label: t('admin.charts.labels.loans'),
                
            }],
            
            type: 'line',
            labels: datos.map(dato => dato.nombre)
        }
})




</script>
<template>
    <h1 style="text-align: center;">{{ $t('admin.charts.bookPrices.title') }}</h1>
    <v-tabs align-tabs="center" v-model:model-value="opcionLibros">
        <v-tab :value="0">{{ $t('admin.charts.bookPrices.byCategory') }}</v-tab>
        <v-tab :value="1">{{ $t('admin.charts.bookPrices.byDate') }}</v-tab>
    </v-tabs>
    
        
        
            <Bar :data="BarLibros" />
        
    <h1 style="text-align: center;">{{ $t('admin.charts.loans.title') }}</h1>
    <v-tabs align-tabs="center" v-model:model-value="opcionPrestamo">
        <v-tab :value="0">{{ $t('admin.charts.loans.byYear') }}</v-tab>
        <v-tab :value="1">{{ $t('admin.charts.loans.byMonth') }}</v-tab>
        <v-tab :value="2">{{ $t('admin.charts.loans.byUser') }}</v-tab>
        <v-tab :value="3">{{ $t('admin.charts.loans.byBook') }}</v-tab>
    </v-tabs>
        <Line :data="BarPrestamo" :options="{scales: {y: {beginAtZero: true}}}" />
    
</template>
