import fetch from "node-fetch";
import Insight from "../models/insights.model.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("gemini key", GEMINI_API_KEY);

export const getAIInsight = async (req, res) => {
  try {
    const { summary } = req.body;

    if (!summary)
      return res.status(400).json({ message: "summaryInput is required" });

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `In 1–2 sentences, generate a short, punchy, motivational insight for this user data: ${summary}. Use emojis where appropriate and keep it under 30 words.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("ai data", data);
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI insight generated.";

    res.json({ insight: aiText });
    await Insight.create({
      userId: req.user._id,
      input: summary,
      insight: aiText,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ message: "Error generating AI insight" });
  }
};

export const listGeminiModels = async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    console.log("📋 List models:", JSON.stringify(data, null, 2));
    res.json(data);
  } catch (error) {
    console.error("Error listing Gemini models:", error);
    res.status(500).json({ message: "Failed to list models" });
  }
};

// const listModels = async () => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`,
//       {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     const data = await response.json();
//     console.log("Available models:", JSON.stringify(data, null, 2));
//   } catch (error) {
//     console.error("Error listing models:", error);
//   }
// };

// listModels();


export const getRepoAIInsight = async (req, res) => {
  try {
    const { codeFreq, commits, prs, issues } = req.body;

    if (!codeFreq || !commits || !prs || !issues) {
      return res.status(400).json({ message: "All repo stats are required" });
    }

    // Convert the stats into a concise summary string for the AI prompt
    const summary = `
      Repository Summary:
      - Total commits: ${commits.length}
      - Pull requests: ${prs.length}
      - Issues: ${issues.length}
      - Weekly code frequency (additions/deletions for last 5 weeks): ${codeFreq
        .slice(-5)
        .map(([week, additions, deletions]) => `Week ${week}: +${additions}/-${deletions}`)
        .join(", ")}
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `In 1–2 sentences, generate a short, punchy, motivational insight based on this repository data: ${summary}. Use emojis where appropriate and keep it under 30 words.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("AI repo data", data);

    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI insight generated.";

    res.json({ insight: aiText });

    // Optional: save this insight to DB
    await Insight.create({
      userId: req.user._id,
      input: summary,
      insight: aiText,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ message: "Error generating AI insight" });
  }
};
