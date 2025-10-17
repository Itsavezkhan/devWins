// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Card, Title, Text } from "@tremor/react";
// import { useDispatch } from "react-redux";
// import { setRepos } from "@/redux/repoSlice";
// import
// import { Button } from "@/components/ui/button";
// import { useAppDispatch, useAppSelector } from "../../redux/store";

// import { fetchDomains } from "@/redux/domain/domainThunks";

// export default function Dashboard() {
//   const dispatch = useDispatch();
//   const {
//     domains,
//     loading: domainloading,
//     error,
//   } = useAppSelector((state) => state.domain);
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);

//         // Run both requests in parallel
//         const [githubRes, domainsRes] = await Promise.all([
//           axios.get("http://localhost:5001/user/githubdata", {
//             withCredentials: true,
//           }),
//           axios.get("http://localhost:5001/api/domains"),
//         ]);

//         // GitHub data
//         const githubData = githubRes.data;
//         setData(githubData);

//         const topRepos = [...githubData.repos]
//           .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
//           .slice(0, 3);

//         dispatch(setRepos(topRepos));
//         dispatch(setDomains(domainsRes.data));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
//   if (!data) return <p>No data available.</p>;

//   // const topRepos = [...data.repos]
//   //   .sort(
//   //     (a: any, b: any) =>
//   //       new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
//   //   )
//   //   .slice(0, 3);

//   return (
//     <div className="p-6 space-y-6">
//       {/* --- User Info Card --- */}
//       <Card className="flex items-center space-x-4">
//         <img
//           src={data.user.avatar}
//           alt="avatar"
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <Title>{data.user.name}</Title>
//           <Text>{data.user.bio || "No bio available"}</Text>
//           <Text className="text-gray-500">@{data.user.login}</Text>
//         </div>
//       </Card>

//       <div>
//         <Title>Top 3 Recently Updated Repositories</Title>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {data.repos
//             .sort(
//               (a: any, b: any) =>
//                 new Date(b.updated_at).getTime() -
//                 new Date(a.updated_at).getTime()
//             )
//             .slice(0, 3)
//             .map((repo: any) => (
//               <a
//                 key={repo.name}
//                 href={repo.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Card className="cursor-pointer hover:shadow-lg transition">
//                   <Title>{repo.name}</Title>
//                   <Text>{repo.description || "No description"}</Text>
//                   <Text className="text-gray-500 text-sm mt-2">
//                     ⭐ {repo.stars} | Updated:{" "}
//                     {new Date(repo.updated_at).toLocaleDateString()}
//                   </Text>
//                 </Card>
//               </a>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.tsx

// ye wala

// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRepos } from "../../redux/repo/repoThunks";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { fetchDomains, addDomain } from "../../redux/domain/domainThunks";
// import type { RootState, AppDispatch } from "../../redux/store";

// const Dashboard = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [name, setName] = useState("");

//   const router = useRouter();

//   // 👇 Select data from Redux store
//   const {
//     repos,
//     loading: repoLoading,
//     error: repoError,
//   } = useSelector((state: RootState) => state.repos);
//   const {
//     domains,
//     loading: domainLoading,
//     error: domainError,
//   } = useSelector((state: RootState) => state.domains);

//   // 👇 Fetch data when the component mounts
//   useEffect(() => {
//     dispatch(fetchRepos());
//     dispatch(fetchDomains());
//   }, [dispatch]);

//   // 👇 Handle loading states
//   if (repoLoading || domainLoading) return <p>Loading dashboard data...</p>;

//   // 👇 Handle errors
//   if (repoError || domainError)
//     return <p>Error loading data: {repoError || domainError}</p>;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // setMessage("");

//     try {
//       const resultAction = await dispatch(addDomain(name));
//       if (addDomain.fulfilled.match(resultAction)) {
//         // setMessage(`Domain added: ${resultAction.payload.name}`);
//         setName("");
//         dispatch(fetchDomains());
//       } else {
//         // rejected
//         // setMessage(resultAction.payload || "Failed to add domain");
//       }
//     } catch (error) {
//       // setMessage("Failed to add domain");
//     }
//   };

//   // 👇 Once loaded, render data
//   return (
//     <>
//       <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//         <h2>Add Domain</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter domain name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={{ width: "100%", padding: 8, marginBottom: 10 }}
//           />
//           <button type="submit" style={{ padding: "8px 16px" }}>
//             Add Domain
//           </button>
//         </form>
//       </div>
//       <div className="p-4 space-y-6">
//         <section>
//           <h2 className="text-xl font-bold mb-2">Top Repositories</h2>
//           <div className="grid gap-3">
//             {repos.map((repo) => (
//               <div key={repo.id} className="p-3 border rounded">
//                 <h3 className="font-semibold">{repo.name}</h3>
//                 <p>{repo.description || "No description"}</p>
//                 <p className="text-sm text-gray-500">
//                   ⭐ {repo.stars} | Updated:{" "}
//                   {new Date(repo.updated_at).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section>
//           <h2 className="text-xl font-bold mb-2">Available Domains</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
//             {domains.map((d) => (
//               <motion.div
//                 key={d._id}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={() => router.push(`/dashboard/domains/${d._id}`)}
//                 className="cursor-pointer p-4 rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-blue-100
//                      hover:shadow-md border border-blue-200 hover:border-blue-300
//                      flex flex-col items-center justify-center text-center transition-all duration-200"
//               >
//                 <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold shadow-sm mb-2">
//                   {d.name.charAt(0).toUpperCase()}
//                 </div>
//                 <p className="text-sm font-medium text-gray-700">{d.name}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFieldsByDomain,
//   addDailyFieldValues,
// } from "@/redux/field/fieldThunks";
// import { fetchDomainFieldValues } from "@/redux/value/valueThunks";
// import type { RootState, AppDispatch } from "../../redux/store";
// import AddFieldPage from "../dashboard/domains/[domainId]/addField";
// import { Card, Title, LineChart } from "@tremor/react";

// interface DomainPageProps {
//   params: { domainId: string };
// }

// export default function DomainPage({ params }: DomainPageProps) {
//   const { domainId } = params;
//   const dispatch = useDispatch<AppDispatch>();

//   const { fields, loading, error } = useSelector(
//     (state: RootState) => state.fields
//   );

//   const { data: fieldValuesData, loading: valuesLoading } = useSelector(
//     (state: RootState) => state.values
//   );

//   const [values, setValues] = useState<Record<string, string>>({});
//   const [date, setDate] = useState("");

//   // fetch domain fields and their values
//   useEffect(() => {
//     if (domainId) {
//       dispatch(fetchFieldsByDomain(domainId));
//       dispatch(fetchDomainFieldValues(domainId));
//     }
//   }, [domainId, dispatch]);

//   const handleChange = (fieldId: string, value: string) => {
//     setValues((prev) => ({ ...prev, [fieldId]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date) {
//       alert("Please select a date");
//       return;
//     }

//     const payload = fields
//       .map((f) => ({
//         fieldId: f._id,
//         value: Number(values[f._id] || 0),
//       }))
//       .filter((v) => !isNaN(v.value));

//     if (payload.length === 0) {
//       alert("Please enter at least one value.");
//       return;
//     }

//     dispatch(addDailyFieldValues({ domainId, date, values: payload }));
//     setValues({});
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <AddFieldPage />
//       <h1 className="text-2xl font-semibold">Domain ID: {domainId}</h1>

//       {loading && <p>Loading fields...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-4">
//         <div>
//           <label className="font-medium">Select Daate:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="border p-2 rounded ml-2"
//           />
//         </div>

//         {fields.map((f) => (
//           <div key={f._id} className="flex flex-col gap-2">
//             <label className="font-medium">{f.name}</label>
//             <input
//               type="number"
//               placeholder="Enter value"
//               value={values[f._id] || ""}
//               onChange={(e) => handleChange(f._id, e.target.value)}
//               className="border p-2 rounded"
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Submit Valuess
//         </button>
//       </form>

//       {/* Chart Section */}
//       <div className="space-y-6 mt-8">
//         <Title>Recent Field Values</Title>
//         {valuesLoading && <p>Loading charts...</p>}

//         {fieldValuesData?.fields?.map((field: any) => {
//           const chartData = field.recentValues.map((v: any) => ({
//             date: new Date(v.date).toLocaleDateString("en-GB"),
//             [field.fieldName]: v.value,
//           }));

//           return (
//             <Card key={field.fieldName} className="p-4">
//               <Title className="capitalize mb-2">{field.fieldName}</Title>
//               <LineChart
//                 className="h-64"
//                 data={chartData}
//                 index="date"
//                 categories={[field.fieldName]}
//                 colors={["blue"]}
//                 yAxisWidth={40}
//               />
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReposWithCommits } from "../../redux/repo/repoThunks";
import { fetchDomains, addDomain } from "../../redux/domain/domainThunks";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { RootState, AppDispatch } from "../../redux/store";
import DomainCard from "@/components/ui/domainCard";
import { fetchInsight } from "@/redux/insight/insightThunks";
import { fetchCurrentUser } from "@/redux/user/userThunks";
import Loading from "./loading";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const { insight, loading, error } = useSelector(
    (state: RootState) => state.insights
  );

  // const {
  //   repos,
  //   loading: repoLoading,
  //   error: repoError,
  // } = useSelector((state: RootState) => state.repos);
  const {
    topRepos,
    totalCommits,
    loading: repoLoading,
    error: repoError,
  } = useSelector((state: RootState) => state.repos);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state: RootState) => state.users);
  console.log("user", user);
  console.log("abcd", totalCommits);
  const {
    domains,
    loading: domainLoading,
    error: domainError,
  } = useSelector((state: RootState) => state.domains);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchDomains());
    if (
      totalCommits === undefined ||
      totalCommits === null ||
      totalCommits === 0
    ) {
      return;
    } else {
      const summaryInput = `GitHub commits: ${totalCommits}`;
      console.log("summaryinput before", summaryInput);
      // dispatch(fetchInsight(summaryInput));
      console.log("summaryinput after", summaryInput);
    }
  }, [dispatch, totalCommits]);

  useEffect(() => {
    if (!user) return;

    if (user.provider === "google") {
      console.log("login with google");
      return;
    }

    if (user.provider === "github") {
      dispatch(fetchReposWithCommits());
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(addDomain(name));
      if (addDomain.fulfilled.match(resultAction)) {
        setName("");
        setShowModal(false);
        dispatch(fetchDomains());
      }
    } catch (error) {
      console.error("Failed to add domain");
    }
  };

  if (repoLoading || domainLoading) return <p>Loading dashboard data...</p>;
  if (repoError || domainError)
    return <p>Error loading data: {repoError || domainError}</p>;

  return (
    <div className="p-6 space-y-10 ">
      {/* ---------- TOP BAR ---------- */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Available Domains
        </h2>

        {user?.provider === "github" && <p>Insight : {insight}</p>}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-all duration-200"
        >
          + Add Domain
        </button>
      </div>

      {/* ---------- DOMAIN GRID ---------- */}
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6"> */}
      {/* ---------- DOMAIN SCROLL ---------- */}
      {domains.length === 0 ? (
        // <Loading />
        <div className="w-full h-90 bg-blue-50 flex justify-center items-center">
          {" "}
          <p>
            Add domains and get started with your comprehensive dev journey{" "}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto p-2 ">
          <div className="flex gap-4 min-w-max">
            {domains.map((d) => (
              <div key={d._id} className="flex-shrink-0">
                <DomainCard d={d} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- GITHUB REPOS ---------- */}
      {user?.provider === "github" && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-3 text-gray-800">
            Top Repositories
          </h2>
          <div className="flex flex-wrap gap-4">
            {/* {repos.map((repo) => (
            <div
              key={repo.id}
              className="w-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-200 
                         hover:shadow-md transition-all duration-200"
            >
              <h3 className="font-semibold text-sm text-gray-800 truncate">
                {repo.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {repo.description || "No description"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                ⭐ {repo.stars} |{" "}
                {new Date(repo.updated_at).toLocaleDateString()}
              </p>
            </div>
          ))} */}
            {topRepos?.map((repo: any) => (
              <div
                key={repo.id}
                className="w-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-semibold text-sm text-gray-800 truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {repo.description || "No description"}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  ⭐ {repo.stars} | 📝 {repo.commits} |{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- ADD DOMAIN MODAL ---------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add New Domain
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter domain name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all"
              >
                Add Domain
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
