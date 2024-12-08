import {Database} from "../database.types.ts";

export type Company = Database["public"]["Tables"]["company"]["Row"]


export type Application = Database["public"]["Tables"]["application"]["Row"]
export type JoinedApplicationCompany = Database["public"]["Tables"]["application"]["Row"] & {company: Partial<Company>}