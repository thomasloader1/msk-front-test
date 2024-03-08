import { TwMainColor } from "@/data/types";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export interface BadgeProps {
  className?: string;
  name: ReactNode;
  color?: TwMainColor | string;
  href?: string;
  textSize?: string;
  icon?: string;
  rounded?: string;
}

const Badge: FC<BadgeProps> = ({
  textSize = "text-xs",
  className = `relative ${textSize}`,
  color = "blue",
  rounded = "rounded",
  name,
  href,
  icon,
}) => {
  const getColorClass = (hasHover = true) => {
    switch (color) {
      case "pink":
        return `text-pink-800 bg-pink-100 ${
          hasHover ? "hover:bg-pink-800" : ""
        }`;
      case "red":
        return `text-red-800 bg-red-100 ${hasHover ? "hover:bg-red-800" : ""}`;
      case "red-strong":
        return `text-stone-700 bg-red-400 ${
          hasHover ? "hover:bg-red-800" : ""
        }`;
      case "gray":
        return `text-gray-800 bg-gray-100 ${
          hasHover ? "hover:bg-gray-800" : ""
        }`;
      case "green":
        return `text-green-800 bg-teal-300 ${
          hasHover ? "hover:bg-green-800" : ""
        }`;
      case "purple":
        return `text-purple-800 bg-purple-100 ${
          hasHover ? "hover:bg-purple-800" : ""
        }`;
      case "indigo":
        return `text-indigo-800 bg-indigo-100 ${
          hasHover ? "hover:bg-indigo-800" : ""
        }`;
      case "yellow":
        return `text-yellow-800 bg-yellow-100 ${
          hasHover ? "hover:bg-yellow-800" : ""
        }`;
      case "yellow-strong":
        return `text-yellow-800 bg-yellow-400 ${
          hasHover ? "hover:bg-yellow-800" : ""
        }`;
      case "blue":
        return `text-blue-800 bg-blue-100 ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "blue-post":
        return `text-neutral-900 bg-blue-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "yellow-strong-post":
        return `text-neutral-900 bg-yellow-strong-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "yellow-post":
        return `text-neutral-900 bg-yellow-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "orange-post":
        return `text-neutral-900 bg-orange-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "red-post":
        return `text-neutral-900 bg-red-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "emerald-post":
        return `text-neutral-800 bg-emerald-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "teal-active":
        return `text-slate-500 bg-teal-active ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      case "brown-post":
        return `text-neutral-900 bg-brown-post ${
          hasHover ? "hover:bg-blue-800" : ""
        }`;
      default:
        return `text-pink-800 bg-pink-100 ${
          hasHover ? "hover:bg-pink-800" : ""
        }`;
    }
  };
  /* transition-colors  */
  const CLASSES =
    "nc-Badge  inline-flex px-2.5 py-1 font-medium" +
    ` ${className}` +
    ` ${rounded}`;

  return !!href ? (
    <Link
      href={(href as any) || ""}
      className={`duration-300 ${CLASSES} ${getColorClass(false)}`}
    >
      {icon && (
        <img src={`/images/icons/${icon}.svg`} width="15" className="mr-1" />
      )}

      {name}
    </Link>
  ) : icon ? (
    <div className={`${CLASSES} ${getColorClass(false)}`}>
      <img src={`/images/icons/${icon}.svg`} width="15" className="mr-1" />
      <span className="font-normal">{name} </span>
    </div>
  ) : (
    <span className={`${CLASSES} ${getColorClass(false)} font-normal`}>
      {name}
    </span>
  );
};

export default Badge;
