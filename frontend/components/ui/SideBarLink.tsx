"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type SideBarPropsTypes = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  path: string;
};

const SidebarLink = ({
  icon,
  label,
  active = false,
  onClick,
  path,
}: SideBarPropsTypes) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    router.push(`/${path}`);
  };
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition
        ${
          active
            ? "bg-indigo-600 text-white font-medium"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default SidebarLink;
