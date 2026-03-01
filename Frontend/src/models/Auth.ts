import type { Usuario } from "./Usuario";

export interface Auth{
    token: string,
    usuario?:Usuario
}