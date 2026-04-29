import { Router } from "express";
import {
  getSkincare,
  getSkincares,
  createSkincare,
  updateSkincare,
  deleteSkincare,
  getDeletedSkincares,
  restoreSkincare,
} from "../controllers/skincareControllers.js";
import validate from "../middleware/validate.js";
import {
  getSkincareSchema,
  updateSkincareSchema,
  createSkincareSchema,
  deleteSkincareSchema,
} from "../validators/skincareschema.js";

const skincareRoutes = Router();

skincareRoutes.get("/", getSkincares);
skincareRoutes.get("/deleted", getDeletedSkincares);
skincareRoutes.get("/:id", validate(getSkincareSchema), getSkincare);
skincareRoutes.post("/", validate(createSkincareSchema), createSkincare);
skincareRoutes.put("/restore/:id", restoreSkincare);
skincareRoutes.put("/:id", validate(updateSkincareSchema), updateSkincare);
skincareRoutes.delete("/:id", validate(deleteSkincareSchema), deleteSkincare);

export default skincareRoutes;
