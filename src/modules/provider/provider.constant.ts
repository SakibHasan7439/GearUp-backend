import { RentalStatus } from "../../../generated/prisma/enums";


export const VALID_STATUS_TRANSITIONS: Record<RentalStatus, RentalStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PICKED_UP', 'CANCELLED'],
  PICKED_UP: ['RETURNED'],
  RETURNED: [],
  CANCELLED: [],
};