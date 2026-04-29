import Contact from "../Models/ContactModel.js";

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: 1 });
  res.json(contacts);
};
export const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!Contact) return res.status(404).json({ message: "Contact not found" });
  res.json({ message: "Contact deleted successfully" });
};
