import { Router } from "express";
import {
  getOffer,
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
  getDeletedOffers,
  restoreOffer,
} from "../controllers/offersControllers.js";
import validate from "../middleware/validate.js";
import {
  getOfferSchema,
  updateOfferSchema,
  createOfferSchema,
  deleteOfferSchema,
} from "../validators/offersschema.js";

const offersRoutes = Router();

offersRoutes.get("/", getOffers);
offersRoutes.get("/deleted", getDeletedOffers); // ✅ قبل /:id
offersRoutes.get("/:id", validate(getOfferSchema), getOffer);
offersRoutes.post("/", validate(createOfferSchema), createOffer);
offersRoutes.put("/restore/:id", restoreOffer); // ✅ قبل /:id
offersRoutes.put("/:id", validate(updateOfferSchema), updateOffer);
offersRoutes.delete("/:id", validate(deleteOfferSchema), deleteOffer);

export default offersRoutes;
