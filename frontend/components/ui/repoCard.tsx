"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const RepoCard = ({ repo }: { repo: any }) => {
  const router = useRouter()

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/dashboard/repos/${repo.name}`)}
      className="cursor-pointer rounded-2xl p-6 bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all font-poppins duration-300 flex flex-col gap-5 w-full sm:w-[320px] md:w-[340px]"
    >
      {/* Repo Name */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 truncate">{repo.name}</h3>
        <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-3 text-sm text-gray-500">
          <span>⭐ {repo.stars}</span>
          <span>📝 {repo.commits}</span>
          <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Optional Progress or Activity Bar (like DomainCard) */}
      {repo.progress !== undefined && (
        <div>
          <p className="text-sm text-gray-700 mb-1">Progress</p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
              style={{ width: `${repo.progress}%` }}
            />
          </div>
          <p className="text-sm text-right mt-1 text-gray-700 font-medium">{repo.progress}%</p>
        </div>
      )}

      {/* Bottom Row for avatars or additional info */}
      {repo.users && repo.users.length > 0 && (
        <div className="flex justify-between items-center mt-2">
          <div className="flex -space-x-2">
            {repo.users.slice(0, 3).map((user: any, index: number) => (
              <img
                key={index}
                src={user.avatar || "/avatars/1.png"}
                className="w-8 h-8 rounded-full border border-white"
                alt={user.name || "user"}
              />
            ))}
          </div>
          {repo.daysLeft && (
            <span className="text-sm font-medium text-indigo-600">{repo.daysLeft} Days Left</span>
          )}
        </div>
      )}
    </motion.div>
  )
}

export default RepoCard

