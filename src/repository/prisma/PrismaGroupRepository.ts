import { Group } from "@prisma/client";
import { CreateAttributes, GroupRepository } from "../GroupRepository";
import { prisma } from "../../database";

export class PrismaGroupRepository implements GroupRepository {
    index(): Promise<Group[] | null> {
        return prisma.group.findMany()
    }
    create(attributes: CreateAttributes): Promise<Group> {
        return prisma.group.create({
            data: attributes
        })
    };
    find(id: number): Promise<Group | null> {
        return prisma.group.findUnique({
            where: {
                id: id
            }
        })
    };
    updated(id: number, attributes: Partial<CreateAttributes>): Promise<Group | null> {
        return prisma.group.update({
            where: {
                id: id
            },
            data: attributes
        })
    };
    delete(id: number): Promise<Group | null> {
        return prisma.group.delete({
            where: { id }
        })
    };

    addLead(groupId: number, leadId: number): Promise<Group | null> {
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: {
                    connect: { id: leadId }
                }
            },
            include: {
                leads: true
            }

        })
    }

    deleteLead(groupId: number, leadId: number): Promise<Group | null> {
        return prisma.group.update({
            where: { id: groupId },
            data: {
                leads: {
                    disconnect: { id: leadId }
                }
            },
            include: {
                leads: true
            }
        })
    }

}