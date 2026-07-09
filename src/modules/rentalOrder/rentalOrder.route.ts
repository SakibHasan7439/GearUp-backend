import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalOrderController } from "./rentalOrder.controller";


const router = Router();

router.post("/rentals", auth(Role.CUSTOMER), rentalOrderController.createRentalOrder);
router.get("/admin/rentals", auth(Role.ADMIN), rentalOrderController.getAllRentalOrders);
router.get("/rentals", auth(Role.CUSTOMER), rentalOrderController.getMyRentalOrders);
router.get("/rentals/:id", auth(Role.ADMIN, Role.CUSTOMER, Role.PROVIDER), rentalOrderController.getRentalOrdersById)

export const rentalOrderRoute = router;