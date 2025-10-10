import Domain from "../models/domains.model.js";
import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";

// Add new domain
export const addDomain = async (req, res) => {
  try {
    const domain = await Domain.create({ name: req.body.name });
    res.json(domain);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all domains
export const getDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all values for a domain (formatted for chart)
export const getDomainValues = async (req, res) => {
  try {
    const domainId = req.params.domainId;
    const fields = await Field.find({ domainId });
    const fieldIds = fields.map((f) => f._id);
    const values = await Value.find({ fieldId: { $in: fieldIds } });

    // Format for Tremor chart
    const data = values.reduce((acc, val) => {
      const dateEntry = acc.find((d) => d.date === val.date) || {
        date: val.date,
      };
      const fieldName = fields.find((f) => f._id.equals(val.fieldId)).name;
      dateEntry[fieldName] = val.value;
      if (!acc.includes(dateEntry)) acc.push(dateEntry);
      return acc;
    }, []);
    res.json(data.sort((a, b) => a.date.localeCompare(b.date)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
