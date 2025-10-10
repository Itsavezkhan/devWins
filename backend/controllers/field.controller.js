import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";

// Add new field to a domain
export const addField = async (req, res) => {
  try {
    const field = await Field.create({
      name: req.body.name,
      domainId: req.params.domainId,
    });
    res.json(field);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all fields of a domain
export const getFields = async (req, res) => {
  try {
    const fields = await Field.find({ domainId: req.params.domainId });
    res.json(fields);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
