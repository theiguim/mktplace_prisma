import { Group, Lead } from "@prisma/client";



export interface CreateAttributes {
    name: string,
    description: string
}


export interface GroupRepository {
    index: () => Promise<Group[] | null>
    create: (attributes: CreateAttributes) => Promise<Group>
    find: (id: number) => Promise<Group | null>
    updated: (id: number, attributes: Partial<CreateAttributes>) => Promise<Group | null>
    delete: (id: number) => Promise<Group | null>

    addLead: (groupId: number, leadId:number)=> Promise<Group | null>
    deleteLead: (groupId: number, leadId:number) => Promise<Group | null>
}



