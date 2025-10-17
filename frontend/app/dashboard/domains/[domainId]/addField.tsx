"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { Button } from "@/components/ui/button";
import { fetchFieldsByDomain } from "@/redux/field/fieldThunks";
import { fetchDomainFieldValues } from "@/redux/value/valueThunks";

export default function AddFieldPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { domainId } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domainId) {
      setMessage("Domain ID missing in route!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post(
        `http://localhost:5001/api/fields/${domainId}`,
        { name },
        { withCredentials: true }
      );

      setMessage("✅ Field added successfully!");
      setName("");
      dispatch(fetchFieldsByDomain(domainId as string));
      dispatch(fetchDomainFieldValues(domainId as string));

      // close modal after success
      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "❌ Failed to add field");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      {/* <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Add Field
      </button> */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        + Add Field
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-[90%] max-w-md z-10">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Field
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter field name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {loading ? "Adding..." : "Submit"}
              </button>
            </form>

            {message && (
              <p
                className={`text-sm mt-2 text-center ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Close button (X) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
