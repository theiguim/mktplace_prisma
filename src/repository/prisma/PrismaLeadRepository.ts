import { Lead } from "@prisma/client";
import { FindLeadParams, LeadAtributtesInter, LeadsRepository } from "../LeadsRepository";
import { prisma } from "../../database";


export class PrismaLeadRepository implements LeadsRepository {

    index(params?: FindLeadParams): Promise<Lead[] | null> {
        return prisma.lead.findMany({
            where: {
                name: {
                    contains: params?.where?.name?.contains,
                    equals: params?.where?.name?.equals,
                    mode: params?.where?.name?.mode 
                },
                status: params?.where?.status,
                groups: {some: {id: params?.where?.groupId}},
                campaigns: {some: {campaignId: params?.where?.campaignId, status: params?.where?.campaignStatus}}
            },
            orderBy: params?.orderBy,
            skip: params?.skip,
            take: params?.take,
            include: {
                groups: params?.include?.groups,
                campaigns: params?.include?.campaigns
            }

        })
    }
    create(attributes: LeadAtributtesInter): Promise<Lead> {
        return prisma.lead.create({ data: attributes })
    }
    find(id: number): Promise<Lead | null> {
        return prisma.lead.findUnique({ where: { id } })
    }
    update(id: number, attributes: Partial<LeadAtributtesInter>): Promise<Lead | null> {
        return prisma.lead.update({ where: { id }, data: attributes })
    }
    delete(id: number): Promise<Lead | null> {
        return prisma.lead.delete({ where: { id } })
    }

}