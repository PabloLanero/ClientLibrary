export interface LibroFiltro {
    ISBN:string,
    Title: string,
    Genero: string,
    minPaginas?: number,
    maxPaginas?: number,
    minPrecio?: number,
    maxPrecio?: number,
    minFecha: string,
    maxFecha: string,
    OrderAsc: boolean
}