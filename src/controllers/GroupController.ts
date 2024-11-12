import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas/GroupRequestSchema";
import { GroupRepository } from "../repository/GroupRepository";




export class GroupController {
    private groupRepository: GroupRepository

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository
    }

    index: Handler = async (req, res, next) => {
        try {
            const group = await this.groupRepository.index();
            res.json({message: "deu certo..", data:group})
        } catch (error) {
            res.json(error)
        }
    };

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body);
            const newGroup = this.groupRepository.create(body)
            res.json(newGroup);
        } catch (error) {
            res.json(error)
        }
    };
    find: Handler = async (req, res, next) => {
        try {
            const group = await this.groupRepository.find(+req.params.id)
            res.json(group)
        } catch (error) {
            res.json(error)
        }
    };
    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateGroupRequestSchema.parse(req.body);
            const updatedGroup = await this.groupRepository.updated(+req.params.id, body)
            res.json(updatedGroup)
        } catch (error) {
            res.json(error)
        }
    };
    delete: Handler = async (req, res, next) => {
        try {
            const deletedGroup = await this.groupRepository.delete(+req.params.id)
            res.json(deletedGroup)
        } catch (error) {
            res.json(error)
        }
    };
}