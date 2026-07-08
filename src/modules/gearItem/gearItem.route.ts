import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { gearItemController } from "./gearItem.controller";

const router = Router();

// router.get('/gear', GearItemControllers.getAllGearItems);
// router.get('/gear/:id', GearItemControllers.getGearItemById);


router.post('/provider/gear', auth(Role.PROVIDER), gearItemController.createGear);
// router.get('/provider/gear', auth(Role.PROVIDER), GearItemControllers.getMyGearItems);
// router.put('/provider/gear/:id', auth(Role.PROVIDER), GearItemControllers.updateGearItem);
// router.delete('/provider/gear/:id', auth(Role.PROVIDER), GearItemControllers.deleteGearItem);


// router.get('/admin/gear', auth(Role.ADMIN), GearItemControllers.getAllGearItemsAdmin);


export const gearItemRoute = router;