import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearItemController } from "./gearItem.controller";

const router = Router();

router.get('/gear', gearItemController.getAllGearItems);
router.get('/gear/:id', gearItemController.getGearItemById);


router.post('/provider/gear', auth(Role.PROVIDER), gearItemController.createGear);
router.get('/provider/gear', auth(Role.PROVIDER), gearItemController.getMyGearItems);
router.put('/provider/gear/:id', auth(Role.PROVIDER), gearItemController.updateGearItem);
router.delete('/provider/gear/:id', auth(Role.PROVIDER), gearItemController.deleteGear);


router.get('/admin/gear', auth(Role.ADMIN), gearItemController.getAdminAllGearItems);


export const gearItemRoute = router;