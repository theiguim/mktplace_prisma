import { Lead, LeadCampaignStatus } from "@prisma/client";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Archived"

export interface LeadWhereParams {
name?:{
    contains?: string
    mode?: "default" | "insensitive"
    equals?:string
}
status?: LeadStatus
campaignStatus?: LeadCampaignStatus
groupId?: number
campaignId?: number
}

export interface FindLeadParams {
    where?: LeadWhereParams
    orderBy?: {}
    skip?: number
    take?: number
    include?: {
        groups?: boolean
        campaigns?: boolean
    }
}

export interface LeadAtributtesInter {
    name: string
    email: string
    phone: string
    status?: LeadStatus
}

export interface LeadsRepository {
    index: (params?:FindLeadParams) => Promise<Lead[] | null>
    create: (attributes: LeadAtributtesInter) => Promise<Lead>
    find: (id: number) => Promise<Lead | null>
    update: (id: number, attributes: Partial<LeadAtributtesInter>) => Promise<Lead | null>
    delete: (id: number) => Promise<Lead | null>
}