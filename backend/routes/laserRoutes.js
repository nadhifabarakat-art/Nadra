import { Router } from "express";
import {
  getLaser,
  getLasers,
  createLaser,
  updateLaser,
  deleteLaser,
  getDeletedLasers, // ✅ أضفناها
  restoreLaser, // ✅ أضفناها
} from "../controllers/LaserControllers.js";
import validate from "../middleware/validate.js";
import {
  getLaserSchema,
  updateLaserSchema,
  createLaserSchema,
  deleteLaserSchema,
} from "../validators/laserSchema.js";

const laserRoutes = Router();

laserRoutes.get("/", getLasers);
laserRoutes.get("/deleted", getDeletedLasers);
laserRoutes.get("/:id", validate(getLaserSchema), getLaser);
laserRoutes.post("/", validate(createLaserSchema), createLaser);
laserRoutes.put("/restore/:id", restoreLaser);
laserRoutes.put("/:id", validate(updateLaserSchema), updateLaser);
laserRoutes.delete("/:id", validate(deleteLaserSchema), deleteLaser);

export default laserRoutes;
