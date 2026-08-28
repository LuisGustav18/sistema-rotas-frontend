import { UUIDTypes } from "uuid";

export interface Rota {
    id?: UUIDTypes,
    titulo?: string,
    descricao?: string,
    longitude: number,
    latitude: number,
}