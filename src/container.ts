import { GroupController } from "./controllers/GroupController";
import { LeadController } from "./controllers/LeadController";
import { CampaignController } from "./controllers/CampaignController";
import { GroupLeadsController } from "./controllers/GroupLeadsController";
import { LeadCampaignController } from "./controllers/LeadCampaignController";
import { PrismaGroupRepository } from "./repository/prisma/PrismaGroupRepository";
import { PrismaLeadRepository } from "./repository/prisma/PrismaLeadRepository";
import { PrismaCampaignRepository } from "./repository/prisma/PrismaCampaignRepository";

export const groupRepository = new PrismaGroupRepository()
export const leadsRepository = new PrismaLeadRepository();
export const campaignRepository = new PrismaCampaignRepository();

export const groupController = new GroupController(groupRepository);
export const leadController = new LeadController(leadsRepository);
export const campaignsController = new CampaignController(campaignRepository);
export const groupLeadsController = new GroupLeadsController(groupRepository, leadsRepository);
export const leadCampaignController = new LeadCampaignController(leadsRepository, campaignRepository);
