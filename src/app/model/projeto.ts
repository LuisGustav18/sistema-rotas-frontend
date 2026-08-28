import { UUIDTypes } from "uuid";

export interface Projeto {
    id?: UUIDTypes,
    titulo: string,
    usuario: UUIDTypes,
    data: Date
}