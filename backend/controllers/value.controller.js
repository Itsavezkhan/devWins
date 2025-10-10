import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";

// Add value for a field
// export const addValue = async (req, res) => {
//   try {
//     const { fieldId } = req.params;
//     const { date, value } = req.body;
//     const newValue = await Value.create({ fieldId, date, value });
//     res.json(newValue);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const addValue = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const { date, value } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Step 1: Find the field
    const field = await Field.findById(fieldId);
    if (!field) {
      return res.status(404).json({ error: "Field not found" });
    }

    // Step 2: Check if the domain of the field belongs to the user
    const domain = await Domain.findOne({
      _id: field.domainId,
      user: req.user._id,
    });
    if (!domain) {
      return res
        .status(403)
        .json({ error: "Unauthorized to add value to this field" });
    }

    // Step 3: Create the value
    const newValue = await Value.create({
      fieldId,
      date: date || new Date().toISOString().split("T")[0], // default to today
      value,
    });

    res.status(201).json(newValue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
