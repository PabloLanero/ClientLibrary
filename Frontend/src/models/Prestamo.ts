import type { Libro } from "./Libros";
import type { Usuario } from "./Usuario";

export interface Prestamo {
    id: number,
    libro: Libro,
    usuario: Usuario,
    fechaPrestamo: Date,
    fechaDevolucionPrevista?: Date,
    fechaDevolucionReal?: Date,
    estadoPrestamo?: Date,
    multa?: number
}