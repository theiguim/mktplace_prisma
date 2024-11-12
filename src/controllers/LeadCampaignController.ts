import { Handler } from "express";
import { AddLeadCampaignRequestSchema, UpdateLeadCampaignRequestSchema } from "./schemas/campaignRequestSchema";
import { LeadCampaignStatus, Prisma } from "@prisma/client";
import { LeadsRepository, LeadWhereParams } from "../repository/LeadsRepository";
import { CampaignRepository } from "../repository/CampaignRepository";

export class LeadCampaignController {

    private leadRepository: LeadsRepository
    private campaignRepository: CampaignRepository

    constructor(leadRepository: LeadsRepository, campaignRepository: CampaignRepository) {
        this.leadRepository = leadRepository
        this.campaignRepository = campaignRepository
    }

    findLead: Handler = async (req, res, next) => {
        try {

            const query = req.query;
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const orderBy = { [sortBy as string]: order === "asc" ? "asc" : "desc" }
            const skip = (+page - 1) * +pageSize
            const take = +pageSize

            const where: LeadWhereParams = {
                campaignId: +req.params.campaignId
            }

            if (name) where.name = { contains: name as string, mode: "insensitive" }
            if (status) where.campaignStatus = status as LeadCampaignStatus 

            const findLead = await this.leadRepository.index({where, orderBy, skip, take, include: {campaigns: true}})
            res.json(findLead)
        } catch (error) {
            res.json(error)
        }
    };

    addLead: Handler = async (req, res, next) => {
        try {
            const { leadId, status = "New" } = AddLeadCampaignRequestSchema.parse(req.body);
            const addLead = await this.campaignRepository.addLead({ campaignId: +req.params.campaignId, leadId, status })
            res.json(addLead)
        } catch (error) {
            res.json(error)
        }
    }

    updateLead: Handler = async (req, res, next) => {
        try {
            const { status } = UpdateLeadCampaignRequestSchema.parse(req.body);
            const updatedLead = await this.campaignRepository.updateLead({ campaignId: +req.params.campaignId, leadId: +req.params.leadId, status })
            res.json(updatedLead)
        } catch (error) {
            res.json(error)
        }

    }
    removeLead: Handler = async (req, res, next) => {
        try {
            const removeLead = await this.campaignRepository.removeLead(+req.params.campaignId, +req.params.leadId)
            res.json(removeLead)
        } catch (error) {
            res.json(error)
        }
    }
}