import { Router } from "express";
import { campaignsController, groupController, groupLeadsController, leadCampaignController, leadController } from "./container";

export const router = Router();

router.get("/groups", groupController.index);
router.post("/groups", groupController.create);
router.get("/groups/:id", groupController.find);
router.put("/groups/:id", groupController.update);
router.delete("/groups/:id", groupController.delete);


router.get("/leads", leadController.index);
router.post("/leads", leadController.create);
router.get("/leads/:id", leadController.find);
router.put("/leads/:id", leadController.update);
router.delete("/leads/:id", leadController.delete);

router.get("/campaigns", campaignsController.index);
router.post("/campaigns", campaignsController.create);
router.get("/campaigns/:id", campaignsController.find);
router.put("/campaigns/:id", campaignsController.update);
router.delete("/campaigns/:id", campaignsController.delete);

router.get("/groups/:groupId/leads", groupLeadsController.findLeads);
router.post("/groups/:groupId/leads", groupLeadsController.addLead);
router.delete("/groups/:groupId/leads/:leadId", groupLeadsController.deleteLead);

router.get("/campaigns/:campaignId/leads", leadCampaignController.findLead);
router.post("/campaigns/:campaignId/leads", leadCampaignController.addLead);
router.put("/campaigns/:campaignId/leads/:leadId", leadCampaignController.updateLead);
router.delete("/campaigns/:campaignId/leads/:leadId", leadCampaignController.removeLead);