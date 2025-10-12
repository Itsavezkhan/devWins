import Domain from "../models/domains.model.js";
import Field from "../models/fields.model.js";
import Value from "../models/values.model.js";

// Add new domain
export const addDomain = async (req, res) => {
  try {
    const { name } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create the domain with the authenticated user's ID
    console.log("adddomain", req.user._id);
    const domain = await Domain.create({
      name,
      userId: req.user._id,
    });

    res.status(201).json(domain);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all domains
// export const getDomains = async (req, res) => {
//   try {
//     const domains = await Domain.find();
//     res.json(domains);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all values for a domain (formatted for chart)
// export const getDomainValues = async (req, res) => {
//   try {
//     const domainId = req.params.domainId;
//     const fields = await Field.find({ domainId });
//     const fieldIds = fields.map((f) => f._id);
//     const values = await Value.find({ fieldId: { $in: fieldIds } });

//     // Format for Tremor chart
//     const data = values.reduce((acc, val) => {
//       const dateEntry = acc.find((d) => d.date === val.date) || {
//         date: val.date,
//       };
//       const fieldName = fields.find((f) => f._id.equals(val.fieldId)).name;
//       dateEntry[fieldName] = val.value;
//       if (!acc.includes(dateEntry)) acc.push(dateEntry);
//       return acc;
//     }, []);
//     res.json(data.sort((a, b) => a.date.localeCompare(b.date)));
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const getDomains = async (req, res) => {
  console.log("req of domain", req.user);
  console.log("req of domain8");
  try {
    // Ensure user is authenticated
    console.log("req of domain", req.user);
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorizedd" });
    }

    // Fetch only domains that belong to this user
    const domains = await Domain.find({ userId: req.user._id });
    res.json(domains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// export const getDomainValues = async (req, res) => {
//   try {
//     const domainId = req.params.domainId;

//     // Ensure user is authenticated
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Make sure the domain belongs to the user
//     const domain = await Domain.findOne({ _id: domainId, user: req.user._id });
//     if (!domain) {
//       return res
//         .status(404)
//         .json({ error: "Domain not found or unauthorized" });
//     }

//     // Fetch fields and values for the domain
//     const fields = await Field.find({ domainId });
//     const fieldIds = fields.map((f) => f._id);
//     const values = await Value.find({ fieldId: { $in: fieldIds } });

//     // Format for chart
//     const data = values.reduce((acc, val) => {
//       const dateEntry = acc.find((d) => d.date === val.date) || {
//         date: val.date,
//       };
//       const fieldName = fields.find((f) => f._id.equals(val.fieldId)).name;
//       dateEntry[fieldName] = val.value;
//       if (!acc.includes(dateEntry)) acc.push(dateEntry);
//       return acc;
//     }, []);

//     res.json(data.sort((a, b) => a.date.localeCompare(b.date)));
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getDomainFieldValues = async (req, res) => {
//   try {
//     const { domainId } = req.params;

//     // 1. Get domain and its fields
//     const domain = await Domain.findById(domainId).populate("fields");
//     if (!domain) return res.status(404).json({ message: "Domain not found" });

//     // 2. Fetch last 10 values per field
//     const result = await Promise.all(
//       domain.fields.map(async (field) => {
//         const values = await Value.find({ fieldId: field._id })
//           .sort({ date: -1 })
//           .limit(10)
//           .select("value date -_id");

//         return {
//           fieldName: field.name,
//           recentValues: values,
//         };
//       })
//     );

//     res.json({
//       domain: domain.name,
//       fields: result,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getDomainFieldValues = async (req, res) => {
//   try {
//     const { domainId } = req.params;
//     console.log("Received domainId:", domainId);

//     const domain = await Domain.findById(domainId).populate("fields");
//     if (!domain) {
//       console.log("Domain not found for ID:", domainId);
//       return res.status(404).json({ message: "Domain not found" });
//     }

//     console.log(
//       "Fetched domain:",
//       domain.name,
//       "with fields:",
//       domain.fields.length
//     );

//     const result = await Promise.all(
//       domain.fields.map(async (field) => {
//         console.log("Fetching values for field:", field.name, field._id);

//         const values = await Value.find({ fieldId: field._id })
//           .sort({ date: -1 })
//           .limit(10)
//           .select("value date -_id");

//         return {
//           fieldName: field.name,
//           recentValues: values,
//         };
//       })
//     );

//     res.json({
//       domain: domain.name,
//       fields: result,
//     });
//   } catch (err) {
//     console.error("Error in getDomainFieldValues:", err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

export const getDomainFieldValues = async (req, res) => {
  try {
    const { domainId } = req.params;
    console.log("Received domainId:", domainId);

    // 1. Verify domain exists
    const domain = await Domain.findById(domainId);
    if (!domain) {
      console.log("Domain not found for ID:", domainId);
      return res.status(404).json({ message: "Domain not found" });
    }

    // 2. Find all fields belonging to this domain
    const fields = await Field.find({ domainId });
    console.log(`Found ${fields.length} fields for domain:`, domain.name);

    // 3. Fetch last 10 values for each field
    const result = await Promise.all(
      fields.map(async (field) => {
        console.log("Fetching values for field:", field.name, field._id);

        const values = await Value.find({ fieldId: field._id })
          .sort({ date: -1 })
          .limit(10)
          .select("value date -_id");

        return {
          fieldName: field.name,
          recentValues: values.reverse(), // reverse so it’s oldest → newest for charts
        };
      })
    );

    // 4. Return structured response
    res.json({
      domain: domain.name,
      fields: result,
    });
  } catch (err) {
    console.error("Error in getDomainFieldValues:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
