import { z } from "zod";
import { SuccessMessage } from "../../shared/shared.types";
import { inviteUserSchema } from "./invite.schemas";

export type DecodedInviteToken = {
  tasklistName: string;
  tasklistId: string;
  category: string;
  inviteDate: string;
  inviter: string;
  inviterEmail: string;
  invitedUserEmail: string;
  members: string | null;
};

export type InviteAccepted = SuccessMessage & {
  tasklistId: number;
  categoryName: string;
};

export type InvitedUser = {
  message: string;
};

export type InviteUser = z.infer<typeof inviteUserSchema>;
