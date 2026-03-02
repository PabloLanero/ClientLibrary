export interface Usuario {
    id: number,
    nombre: string,
    apellido: string,
    password: string,
    email: string,
    rol: string,
    fechaRegistro?: Date,
    estaActivo: true
  }