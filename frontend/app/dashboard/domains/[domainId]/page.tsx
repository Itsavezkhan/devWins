// "use client";

// import axios from "axios";
// import { useEffect } from "react";
// import AddFieldPage from "./addField";
// import { useDispatch, useSelector } from "react-redux";
// import { UseDispatch } from "react-redux";
// import { fetchFieldsByDomain } from "@/redux/field/fieldThunks";
// import type { RootState, AppDispatch } from "../../../../redux/store";

// interface DomainPageProps {
//   params: {
//     domainId: string;
//   };
// }

// export default function DomainPage({ params }: DomainPageProps) {
//   const { domainId } = params;
//   const dispatch = useDispatch<AppDispatch>();
//   const {
//     fields,
//     loading: repoLoading,
//     error: repoError,
//   } = useSelector((state: RootState) => state.fields);

//   //   const res = await fetch(`http://localhost:5001/api/domains/${domainId}`, {
//   //     cache: "no-store", // optional, for fresh data each time
//   //   });

//   useEffect(() => {
//     if (domainId) dispatch(fetchFieldsByDomain(domainId as string));
//   }, [domainId, dispatch]);

//   //   const data = await res.json();
//   const data = {
//     name: "avez",
//     status: "in",
//   };
//   return (
//     <div className="p-6">
//       <AddFieldPage />
//       <h1 className="text-2xl font-semibold">Domain: {data?.name}</h1>
//       <p className="text-gray-600">ID: {domainId}</p>
//       <p>Status: {data?.status}</p>
//       {fields.map((f) => (
//         <p>{f.name}</p>
//       ))}
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchFieldsByDomain,
//   addDailyFieldValues,
// } from "@/redux/field/fieldThunks";
// import type { RootState, AppDispatch } from "../../../../redux/store";
// import AddFieldPage from "./addField";

// interface DomainPageProps {
//   params: { domainId: string };
// }

// export default function DomainPage({ params }: DomainPageProps) {
//   const { domainId } = params;
//   const dispatch = useDispatch<AppDispatch>();
//   const { fields, loading, error } = useSelector(
//     (state: RootState) => state.fields
//   );

//   const [values, setValues] = useState<Record<string, string>>({});
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     if (domainId) dispatch(fetchFieldsByDomain(domainId));
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
//     <div className="p-6 space-y-6">
//       <AddFieldPage />
//       <h1 className="text-2xl font-semibold">Domain ID: {domainId}</h1>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {/* {success && <p className="text-green-600">Values added successfully!</p>} */}

//       <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-4">
//         <div>
//           <label className="font-medium">Select Date:</label>
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
//           Submit Values
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import * as React from "react"
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFieldsByDomain,
  addDailyFieldValues,
} from "@/redux/field/fieldThunks";
import { fetchDomainFieldValues } from "@/redux/value/valueThunks";
import type { RootState, AppDispatch } from "../../../../redux/store";
import AddFieldPage from "./addField";
import { Card, Title, LineChart, AreaChart } from "@tremor/react";

// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // keep this if you have it
// import AddFieldPage from "./addField";

import { Button } from "@/components/ui/button";

export default function DomainPage({
  params,
}: {
  params: { domainId: string };
}) {
const { domainId } = React.use(params);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { fields, loading, error } = useSelector(
    (state: RootState) => state.fields
  );
  console.log("fields", fields);
  const { data: fieldValuesData, loading: valuesLoading } = useSelector(
    (state: RootState) => state.values
  );

  const [values, setValues] = useState<Record<string, string>>({});
  const [date, setDate] = useState("");

  useEffect(() => {
    if (domainId) {
      dispatch(fetchFieldsByDomain(domainId));
      dispatch(fetchDomainFieldValues(domainId));
    }
  }, [domainId, dispatch]);

  const handleChange = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handle values submit");

    if (!date) {
      alert("Please select a date");
      return;
    }

    const payload = fields
      .map((f) => ({
        fieldId: f._id,
        value: Number(values[f._id] || 0),
      }))
      .filter((v) => !isNaN(v.value));

    if (payload.length === 0) {
      alert("Please enter at least one value.");
      return;
    }

    dispatch(addDailyFieldValues({ domainId, date, values: payload }));
    dispatch(fetchDomainFieldValues(domainId));
    setValues({});
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      {/* Top Row: Fields Left + Add Field Right */}
      <div className="flex flex-wrap items-center justify-between">
        {/* Field Buttons */}
        <div className="flex flex-wrap gap-3">
          {fields.map((f) => (
            <Button
              key={f._id}
              variant="secondary"
              className="rounded-xl text-sm px-4 py-2"
            >
              {f.name}
            </Button>
          ))}
        </div>

        {/* Add Field Modal */}
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              + Add a Field
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add a New Field</DialogTitle>
            </DialogHeader>
            <AddFieldPage />
          </DialogContent>
        </Dialog> */}
        {/* Add Field Modal */}
        <div className="flex gap-2">
          <AddFieldPage />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Values
          </Button>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                {/* <h2 className="text-lg font-semibold mb-4">Add a New Field</h2>

                <AddFieldPage />

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button> */}
                <Card className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="font-medium">Select Date:</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {fields.map((f) => (
                        <div key={f._id} className="flex flex-col gap-1">
                          <label className="font-medium text-sm">
                            {f.name}
                          </label>
                          <input
                            type="number"
                            placeholder="Enter value"
                            value={values[f._id] || ""}
                            onChange={(e) =>
                              handleChange(f._id, e.target.value)
                            }
                            className="border p-2 rounded"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Submit Values
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Value Form */}
      {/* <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="font-medium">Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fields.map((f) => (
              <div key={f._id} className="flex flex-col gap-1">
                <label className="font-medium text-sm">{f.name}</label>
                <input
                  type="number"
                  placeholder="Enter value"
                  value={values[f._id] || ""}
                  onChange={(e) => handleChange(f._id, e.target.value)}
                  className="border p-2 rounded"
                />
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Submit Values
          </Button>
        </form>
      </Card> */}
       <Title className="font-heading">Domain Tracker</Title>
        {valuesLoading && <p>Loading charts...</p>}

      {/* Line Chart Section */}
      <div className="space-y-6">
        {fieldValuesData?.fields?.length === 0 ? (
          <div className="h-90 w-full flex justify-center items-center"> <p>Add fields to get started your tracking journey</p></div>
         ) : (  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fieldValuesData?.fields?.map((field: any) => {
            // Get all dates from recentValues
            const allDates = field.recentValues
              .map((v: any) => new Date(v.date).toLocaleDateString("en-GB"))
              .sort(
                (a: string, b: string) =>
                  new Date(a).getTime() - new Date(b).getTime()
              );

            // Create chart data, filling missing values as null
            const chartData = allDates.map((date: any) => {
              const valueObj = field.recentValues.find(
                (v: any) =>
                  new Date(v.date).toLocaleDateString("en-GB") === date
              );
              return {
                date,
                [field.fieldName]: valueObj ? valueObj.value : null,
              };
            });

            return (
              <Card key={field.fieldName} className="p-4">
                <Title className="capitalize mb-2">{field.fieldName}</Title>
                <AreaChart
                  className="h-64"
                  data={chartData}
                  index="date"
                  categories={[field.fieldName]}
                  colors={["blue"]}
                  yAxisWidth={40}
                />
              </Card>
            );
          })}
        </div>)}
      

       

        {/* {fieldValuesData?.fields?.map((field: any) => {
          const chartData = field.recentValues.map((v: any) => ({
            date: new Date(v.date).toLocaleDateString("en-GB"),
            [field.fieldName]: v.value,
          }));

          return (
            <Card key={field.fieldName} className="p-4">
              <Title className="capitalize mb-2">{field.fieldName}</Title>
              <LineChart
                className="h-64"
                data={chartData}
                index="date"
                categories={[field.fieldName]}
                colors={["blue"]}
                yAxisWidth={40}
              />
            </Card>
          );
        })} */}
        {/* {fieldValuesData?.fields?.length > 0 && (  <Title>Recent Field Values</Title>)}
      
        {valuesLoading && <p>Loading charts...</p>} */}
        {/* single indi */}
        {/* {fieldValuesData?.fields?.map((field: any) => {
          const chartData = field.recentValues.map((v: any) => ({
            date: new Date(v.date).toLocaleDateString("en-GB"),
            [field.fieldName]: v.value,
          }));

          return (
            <Card key={field.fieldName} className="p-4">
              <Title className="capitalize mb-2">{field.fieldName}</Title>
              <LineChart
                className="h-64"
                data={chartData}
                index="date"
                categories={[field.fieldName]}
                colors={["blue"]}
                yAxisWidth={40}
              />
            </Card>
          );
        })} */}
      </div>
    </div>
  );
}
