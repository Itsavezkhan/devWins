import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";

// Add value for a field
export const addValue = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const { date, value } = req.body;
    const newValue = await Value.create({ fieldId, date, value });
    res.json(newValue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
