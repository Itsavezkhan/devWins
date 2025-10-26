// import React from "react";
// import { Card, Title, BarChart, LineChart, Grid, Metric } from "@tremor/react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchRepoDetails } from '@/redux/repo/repoThunks';
// import { RootState } from '@/redux/store';
// import Loading from "./loading";
  



// // import React from "react";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../store";
// // import { Card, Title, BarChart, LineChart, Metric } from "@tremor/react";

// const GitHubStats = () => {
//   const repoDetails = useSelector((state: RootState) => state.repos.repoDetails);

//   if (!repoDetails) return <Loading/>;

//   console.log("repoDetails", repoDetails)
  

//   const { codeFreq, commits, prs, issues, owner, repo } = repoDetails;

//   // Transform code frequency
//     const codeData = codeFreq.map(([week, additions, deletions]) => ({
//     week: new Date(week * 1000).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     }),
//     additions,
//     deletions: Math.abs(deletions), // make deletions positive
//   }));

//   // Transform commit activity
//   const commitData = commits.map((week) => ({
//     week: new Date(week.week * 1000).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     }),
//     commits: week.total,
//   }));

//   return (
//     <div className="space-y-6 p-4">
//       {/* Code Frequency */}
//        <Card>
//       <Title>Code Frequency (Additions vs Deletions)</Title>
//       <BarChart
//         className="mt-4 h-72"
//         data={codeData}
//         index="week"
//         categories={["additions", "deletions"]}
//         colors={["green", "red"]}
//         yAxisWidth={40}
//         showLegend
//       />
//     </Card>

//       {/* Commit Activity */}
//        <Card>
//       <Title>Commits per Week</Title>
//       <LineChart
//         className="mt-4 h-72"
//         data={commitData}
//         index="week"
//         categories={["commits"]}
//         colors={["blue"]}
//         yAxisWidth={40}
//         curveType="linear" // optional, can also be "natural"
//         showAnimation
//       />
//     </Card>
//       {/* Issues & PRs */}
//       <div className="grid grid-cols-2 gap-4">
//         <Card>
//           <Title>{`Total Issues in ${repoDetails?.repoName}`} </Title>
//           <Metric>{issues.length}</Metric>
//         </Card>
//         <Card>
//           <Title>{`Total PRs in ${repoDetails?.repoName}`}</Title>
//           <Metric>{prs.length}</Metric>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default GitHubStats;

"use client"

import React, {useEffect} from "react";
import { Card, Title, BarChart, LineChart, Metric } from "@tremor/react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchRepoInsight } from "@/redux/insight/insightThunks";
import { RootState } from "@/redux/store";
import { Button } from "@tremor/react";
import Loading from "./loading";

const GitHubStats = () => {

  const dispatch = useDispatch()
  const repoDetails = useSelector((state: RootState) => state.repos.repoDetails);
 const insight = useSelector((state: any) => state.insights.repoInsight);
  if (!repoDetails) return <Loading />;
   const loading = useSelector((state: any) => state.insights.loading);
    const { codeFreq, commits, prs, issues, repoName } = repoDetails;
  
    // useEffect(() => {
    //   console.log("repoinsights")
    //   dispatch(fetchRepoInsight({ codeFreq, commits, prs, issues }));
    // }, [codeFreq, commits, prs, issues, dispatch]);

 

  // Transform code frequency if available
  const codeData = codeFreq?.length
    ? codeFreq.map(([week, additions, deletions]) => ({
        week: new Date(week * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        additions,
        deletions: Math.abs(deletions), // make deletions positive
      }))
    : [];

  // Transform commit activity if available
  const commitData = commits?.length
    ? commits.map((week) => ({
        week: new Date(week.week * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        commits: week.total,
      }))
    : [];

  return (
    <div className="space-y-6 p-4">
      {/* Code Frequency */}
     <p> {insight}</p>
     <Button className="bg-black text-white rounded-xl" onClick={() => dispatch(fetchRepoInsight({ codeFreq, commits, prs, issues }))}>Get AI Insights</Button>
      <Card>
        <Title>Code Frequency (Additions vs Deletions)</Title>
        {codeData.length ? (
          <BarChart
            className="mt-4 h-72"
            data={codeData}
            index="week"
            categories={["additions", "deletions"]}
            colors={["green", "red"]}
            yAxisWidth={40}
            showLegend
          />
        ) : (
          <p className="text-gray-500 mt-4">No code frequency data available.</p>
        )}
      </Card>

      {/* Commit Activity */}
      <Card>
        <Title>Commits per Week</Title>
        {commitData.length ? (
          <LineChart
            className="mt-4 h-72"
            data={commitData}
            index="week"
            categories={["commits"]}
            colors={["blue"]}
            yAxisWidth={40}
            curveType="linear"
            showAnimation
          />
        ) : (
          <p className="text-gray-500 mt-4">No commit activity data available.</p>
        )}
      </Card>

      {/* Issues & PRs */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <Title>{`Total Issues in ${repoName}`}</Title>
          <Metric>{issues?.length ?? 0}</Metric>
          {!issues?.length && <p className="text-gray-500 mt-1">No issues found</p>}
        </Card>
        <Card>
          <Title>{`Total PRs in ${repoName}`}</Title>
          <Metric>{prs?.length ?? 0}</Metric>
          {!prs?.length && <p className="text-gray-500 mt-1">No PRs found</p>}
        </Card>
      </div>
    </div>
  );
};

export default GitHubStats;


