import { Router } from "express";
import { categoryController } from "./category.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();

// Public
router.get('/categories', categoryController.getAllCategories);


router.post('/admin/categories', auth(Role.ADMIN), categoryController.createNewCategory);
// router.put('/admin/categories/:id', auth(Role.ADMIN), CategoryControllers.updateCategory);
// router.delete('/admin/categories/:id', auth(Role.ADMIN), CategoryControllers.deleteCategory);


export const categoryRoute = router;