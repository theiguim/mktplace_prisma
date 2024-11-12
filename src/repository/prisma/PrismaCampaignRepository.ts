import { Campaign } from "@prisma/client";
import { AddLeadCampaignAttributes, CampaignRepository, CreateCampaignAttributes } from "../CampaignRepository";
import { prisma } from "../../database";


export class PrismaCampaignRepository implements CampaignRepository {
    index(): Promise<Campaign[] | null> {
        return prisma.campaign.findMany();
    };
    create(attributes: CreateCampaignAttributes): Promise<Campaign> {
        return prisma.campaign.create({ data: attributes })
    };
    find(id: number): Promise<Campaign | null> {
        return prisma.campaign.findUnique({ where: { id } })
    };
    update(id: number, attributes: Partial<CreateCampaignAttributes>): Promise<Campaign | null> {
        return prisma.campaign.update({ where: { id }, data: attributes })
    };
    delete(id: number): Promise<Campaign | null> {
        return prisma.campaign.delete({ where: { id } })
    };

    async addLead(attributes: AddLeadCampaignAttributes): Promise<void> {
        await prisma.leadsCampaign.create({
            data: {
                campaignId: attributes.campaignId,
                leadsId: attributes.leadId,
                status: attributes.status
            }
        })
    };

    async updateLead(attributes: AddLeadCampaignAttributes): Promise<void> {
        await prisma.leadsCampaign.update({
            where: {
                leadsId_campaignId: {
                    campaignId: attributes.campaignId,
                    leadsId: attributes.leadId
                },
            },
            data: attributes
        })
    };

    async removeLead(campaignId: number, leadId: number): Promise<void> {
        await prisma.leadsCampaign.delete({
            where: {
                leadsId_campaignId: {
                    campaignId: campaignId,
                    leadsId: leadId
                }
            }
        })
    };









} 