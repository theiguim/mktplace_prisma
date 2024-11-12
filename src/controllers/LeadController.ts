import { Handler } from "express";
import { CreateLeadRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadRequestSchema";
import { LeadsRepository } from "../repository/LeadsRepository";


export class LeadController {
    private leadRepository: LeadsRepository

    constructor(leadRepository: LeadsRepository) {
        this.leadRepository = leadRepository
    }

    index: Handler = async (req, res, next) => {
        try {
            const leads = await this.leadRepository.index();
            res.json(leads)
        } catch (error) {
            res.json(error)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body);
            const newLead = await this.leadRepository.create(body)
            res.json(newLead);
        } catch (error) {
            res.json(error)
        }
    }
    find: Handler = async (req, res, next) => {
        try {
            const lead = await this.leadRepository.find(+req.params.id)
            res.json(lead)
        } catch (error) {
            res.json(error)
        }
    }
    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadRequestSchema.parse(req.body);
            const updatedLead = await this.leadRepository.update(+req.params.id, body)
            res.json(updatedLead);
        } catch (error) {
            res.json(error)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const deletedLead = await this.leadRepository.delete(+req.params.id)
            res.json(deletedLead)
        } catch (error) {
            res.json(error)
        }
    }
}