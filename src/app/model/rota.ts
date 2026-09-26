import { UUIDTypes } from "uuid";
import { Imagem } from "./imagem";

export interface Rota {
    id?: UUIDTypes,
    titulo?: string,
    descricao?: string,
    data?: string,
    projeto: UUIDTypes,
    longitude: number,
    latitude: number,
    imagens: Imagem[]
}