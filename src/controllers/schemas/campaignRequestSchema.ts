import { z } from "zod";


export const CreateCampaignRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional()
});

export const UpdateCampaignRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional()
});

export const AddLeadCampaignRequestSchema = z.object({
leadId: z.number(),
campaignId: z.number(),
status: z.enum([
  "New",
  "Engaged",
  "FollowUp_Scheduled",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Re_Engaged",
  "Opted_out"
]).optional()
});

export const UpdateLeadCampaignRequestSchema = z.object({
    leadId: z.number().optional(),
    campaignId: z.number().optional(),
    status: z.enum([
      "New",
      "Engaged",
      "FollowUp_Scheduled",
      "Contacted",
      "Qualified",
      "Converted",
      "Unresponsive",
      "Disqualified",
      "Re_Engaged",
      "Opted_out"
    ])
    });