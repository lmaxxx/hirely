import {Database} from "../database.types.ts";

export type Company = Database["public"]["Tables"]["company"]["Row"]
export type CompanyWithApplicationCount = Company & {application: {count: number}[]}

export type Application = Database["public"]["Tables"]["application"]["Row"]
export type ApplicationUpdate = Database["public"]["Tables"]["application"]["Update"]
export type JoinedApplicationCompany = Application & {company: Partial<Company>}