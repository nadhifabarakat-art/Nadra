import { Offer } from "../Models/OfferModel.js";

export const getOffers = async (req, res) => {
  const offers = await Offer.find({ isDeleted: { $ne: true } });
  res.json(offers);
};

export const getDeletedOffers = async (req, res) => {
  const offers = await Offer.find({ isDeleted: true });
  res.json(offers);
};

export const getOffer = async (req, res) => {
  const offer = await Offer.findById(req.params.id);
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json(offer);
};

export const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.json({ message: "Offer added successfully", offer });
};

export const updateOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ message: "Offer updated successfully", offer });
};

export const deleteOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true },
  );
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ message: "Offer deleted successfully" });
};

export const restoreOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(
    req.params.id,
    { isDeleted: false },
    { new: true },
  );
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ message: "Offer restored successfully" });
};
