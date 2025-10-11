import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";
import Domain from "../models/domains.model.js";

// Add new field to a domain
// export const addField = async (req, res) => {
//   try {
//     const field = await Field.create({
//       name: req.body.name,
//       domainId: req.params.domainId,
//     });
//     res.json(field);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all fields of a domain
// export const getFields = async (req, res) => {
//   try {
//     const fields = await Field.find({ domainId: req.params.domainId });
//     res.json(fields);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const addField = async (req, res) => {
  try {
    const { name } = req.body;
    const { domainId } = req.params;

    // Check that user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "UnauthorizedDDDD" });
    }

    // Check if the domain belongs to the user
    const domain = await Domain.findOne({
      _id: domainId,
      userId: req.user._id,
    });
    if (!domain) {
      return res
        .status(403)
        .json({ error: "Domain not found or unauthorized" });
    }

    // Create the field under that domain
    const field = await Field.create({
      name,
      domainId,
    });

    res.status(201).json(field);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getFields = async (req, res) => {
  try {
    const { domainId } = req.params;

    // Check that user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the domain belongs to the user
    const domain = await Domain.findOne({
      _id: domainId,
      userId: req.user._id,
    });
    if (!domain) {
      return res
        .status(403)
        .json({ error: "Domain not found or unauthorized" });
    }

    // Get fields only for that domain
    const fields = await Field.find({ domainId });
    res.json(fields);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDailyFieldValues = async (req, res) => {
  try {
    const { domainId } = req.params;
    const { values, date } = req.body; // [{ fieldId, value }]

    if (!Array.isArray(values) || values.length === 0) {
      return res.status(400).json({ message: "No values provided" });
    }

    // Server sets today's date
    // const today = new Date().toISOString().split("T")[0]; // e.g., "2025-10-11"

    const createdValues = await Promise.all(
      values.map(({ fieldId, value }) =>
        Value.create({
          fieldId,
          value,
          date,
        })
      )
    );

    res.status(201).json({
      message: "Values added successfully",
      data: createdValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add values" });
  }
};
