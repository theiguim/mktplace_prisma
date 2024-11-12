import { Campaign } from "@prisma/client"

export type LeadCampaignStatus = "New" | "Engaged" | "FollowUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Re_Engaged" | "Opted_out"
export interface CreateCampaignAttributes {
    name: string
    description: string
    startDate: Date,
    endDate?: Date
}

export interface AddLeadCampaignAttributes {
    campaignId: number
    leadId: number
    status: LeadCampaignStatus
}

export interface CampaignRepository {
    index: () => Promise<Campaign[] | null>
    create: (attributes: CreateCampaignAttributes) => Promise<Campaign>
    find: (id: number) => Promise<Campaign | null>
    update: (id: number, attributes: Partial<CreateCampaignAttributes>) => Promise<Campaign | null>
    delete: (id: number) => Promise<Campaign | null>


    addLead: (attributes: AddLeadCampaignAttributes) => Promise<void>
    updateLead: (attributes: AddLeadCampaignAttributes) => Promise<void>
    removeLead: (campaignId: number, leadId: number) => Promise<void>
}


