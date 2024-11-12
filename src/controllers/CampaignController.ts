import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/campaignRequestSchema";
import { CampaignRepository } from "../repository/CampaignRepository";

export class CampaignController {

    private campaignRepository: CampaignRepository

    constructor(campaignRepository: CampaignRepository) {
        this.campaignRepository = campaignRepository
    }


    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignRepository.index()
            res.json(campaigns);
        } catch (error) {
            res.json(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body);
            const newCampaign = await this.campaignRepository.create(body)
            res.json(newCampaign);
        } catch (error) {
            res.json(error)
        }
    }

    find: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignRepository.find(+req.params.id)
            res.json(campaign);
        } catch (error) {
            res.json(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateCampaignRequestSchema.parse(req.body);
            const updatedCampaign = await this.campaignRepository.update(+req.params.id, body)
            res.json(updatedCampaign);
        } catch (error) {
            res.json(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const deletedCampaign = await this.campaignRepository.delete(+req.params.id)
            res.json(deletedCampaign)
        } catch (error) {
            res.json(error)
        }
    }

}