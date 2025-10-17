"use client";

import { useState } from "react";
import { Card, Title, Text, Button } from "@tremor/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const insights = [
  {
    key: "commit_activity",
    label: "Commits & Code Growth Trend",
    apis: ["commit_activity", "code_frequency"],
  },
  {
    key: "punch_card",
    label: "Most Productive Time of Day",
    apis: ["punch_card", "commits"],
  },
  {
    key: "contributors",
    label: "Team Contribution Ratio",
    apis: ["contributors", "participation"],
  },
  {
    key: "traffic",
    label: "Repo Popularity Conversion Rate",
    apis: ["traffic/views", "clones"],
  },
  {
    key: "actions",
    label: "Build Success Correlation with Commits",
    apis: ["actions/runs", "commits"],
  },
  {
    key: "issues",
    label: "Issue/PR Activity Health Index",
    apis: ["issues", "pulls"],
  },
];

export default function GitHubAnalytics({
  params,
}: {
  params: { repo: string };
}) {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const repos = useSelector((state: RootState) => state.repos.repos);

  const handleSelect = (repoName: string) => {
    console.log("🟢 Selected repo:", repoName);
  };

  const handleInsightClick = (insight: any) => {
    setSelectedInsight(insight.label);
    console.log(
      "🔵 Selected function:",
      insight.label,
      "| APIs:",
      insight.apis
    );
  };

  return (
    <>
      {/* Repos */}
      <div className="flex flex-wrap gap-3 p-4">
        {repos && repos.length > 0 ? (
          repos.map((repo) => (
            <button
              key={repo.id}
              onClick={() => handleSelect(repo.name)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {repo.name}
            </button>
          ))
        ) : (
          <p>No repositories found.</p>
        )}
      </div>

      {/* Insights */}
      <div className="p-6 space-y-6">
        <Title>GitHub Analytics for {params.repo}</Title>
        <div className="flex flex-wrap gap-3">
          {insights.map((insight) => (
            <Button
              key={insight.key}
              onClick={() => handleInsightClick(insight)}
              variant="secondary"
              color="blue"
            >
              {insight.label}
            </Button>
          ))}
        </div>

        <Card className="mt-6">
          {selectedInsight ? (
            <Text>
              ✅ You selected: <b>{selectedInsight}</b>
            </Text>
          ) : (
            <Text>Select an insight to view analytics</Text>
          )}
        </Card>
      </div>
    </>
  );
}
