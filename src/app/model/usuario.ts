import { UUIDTypes } from "uuid";

export interface Usuario {
    id?: UUIDTypes,
    email: string,
    senha: string,
}