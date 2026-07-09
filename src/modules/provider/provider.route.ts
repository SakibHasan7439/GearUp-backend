import { Router } from "express";
import { providerController } from "./provider.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/orders", auth(Role.PROVIDER), providerController.getProviderComingOrders);
router.patch("/orders/:id", auth(Role.PROVIDER), providerController.updateProviderOrderStatus);

export const providerRoute = router;