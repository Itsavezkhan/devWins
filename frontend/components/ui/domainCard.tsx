"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const pastelColors = [
  "from-rose-100 to-pink-50",
  "from-blue-100 to-indigo-50",
  "from-green-100 to-emerald-50",
  "from-yellow-100 to-amber-50",
  "from-purple-100 to-violet-50",
  "from-cyan-100 to-sky-50",
];

interface Domain {
  _id: number;
  name: string;
  // updated_at: string;
  // fieldsCount: number;
}

interface DomainCardProps {
  d: Domain;
}
const DomainCard: React.FC<DomainCardProps> = ({ d }) => {
  const router = useRouter();
  const randomColor = useMemo(() => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }, []);
  const progress = Math.floor(Math.random() * 40) + 60; // random 60–100%

  return (
    <motion.div
      // whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/dashboard/domains/${d._id}`)}
      className={`cursor-pointer rounded-2xl p-7 bg-gradient-to-br ${randomColor}
                  border border-white/50 shadow-md hover:shadow-xl
                  transition-all duration-300 flex flex-col gap-5 
                  w-full sm:w-[320px] md:w-[340px]`}
    >
  
      <p className="text-sm text-gray-600">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

   
      <div>
        <h3 className="text-xl font-semibold text-gray-900 capitalize">
          {d.name}
        </h3>
        <p className="text-sm text-gray-600">Active Domain</p>
      </div>
     

     
      {/* <div className="flex justify-between items-center mt-2">
        <div className="flex -space-x-2">
          <img
            src="/avatars/1.png"
            className="w-8 h-8 rounded-full border border-white"
            alt="user"
          />
          <img
            src="/avatars/2.png"
            className="w-8 h-8 rounded-full border border-white"
            alt="user"
          />
          <img
            src="/avatars/3.png"
            className="w-8 h-8 rounded-full border border-white"
            alt="user"
          />
        </div>
        <span className="text-sm font-medium text-indigo-600">
          {Math.floor(Math.random() * 5) + 1} Days Left
        </span>
      </div> */}
    </motion.div>
  );
};

export default DomainCard;
