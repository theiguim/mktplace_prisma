import { Handler } from "express";
import { AddLeadGroupRequestSchema } from "./schemas/GroupRequestSchema";
import { LeadStatus, Prisma } from "@prisma/client";
import { GroupRepository } from "../repository/GroupRepository";
import { LeadsRepository, LeadWhereParams } from "../repository/LeadsRepository";


export class GroupLeadsController {
private groupRepository: GroupRepository
private leadsRepository: LeadsRepository

constructor(groupRepository:GroupRepository, leadsRepository:LeadsRepository){
    this.groupRepository = groupRepository
    this.leadsRepository = leadsRepository
}


    findLeads: Handler = async (req, res, next) => {
        try {

            const query = req.query;
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const orderBy = {[sortBy as string]:order === "asc"?"asc":"desc"}
            const skip = (+page -1) * +pageSize
            const take = +pageSize

            const where: LeadWhereParams = {
                groupId: +req.params.groupId
            }

            if (name) where.name = { contains: name as string, mode: "insensitive" }
            if (status) where.status = status as LeadStatus

            const leads = await this.leadsRepository.index({where, orderBy, skip, take, include:{groups: true}})
            res.json(leads);
        } catch (error) {
            res.json(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const body = AddLeadGroupRequestSchema.parse(req.body);
            const addLead = await this.groupRepository.addLead(+req.params.groupId, body.leadId)
            res.json(addLead)

        } catch (error) {
            res.json(error);
        }
    }

    deleteLead: Handler = async (req, res, next) => {
        try {
            const removeLead = await this.groupRepository.deleteLead(+req.params.groupId, +req.params.campaignId)
            res.json(removeLead)
        } catch (error) {
            res.json(error)
        }
    }
}