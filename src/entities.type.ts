import {Database} from "../database.types.ts";

export type Company = Database["public"]["Tables"]["company"]["Row"]
export type Application = Database["public"]["Tables"]["application"]["Row"]