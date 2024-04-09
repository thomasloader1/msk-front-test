import React, { FC, ReactNode } from "react";

export interface SkeletonProps {
  className?: string;
  height?: string;
  name?: string;
  withStart?: ReactNode;
}

const ImageSkeleton: FC<SkeletonProps> = ({ className = "", height = "", name= 'spinner', withStart = null }) => {

  if(name == 'spinner'){
    return (
<div className={className}>
      {withStart}
      <div role="status"  style={{ height }}
      className={
        "flex items-center justify-center h-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700" +
        " " +
        className
      }>
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" className="h-16 text-gray-200 dark:text-gray-600 fill-gray-500"  x="0px" y="0px"
              viewBox="0 0 250 170"  >
            <path className="st0" d="M125,164.5l122.6-70.7l-14.3-24.7L125,131.7L16.7,69.1L2.3,93.8l122.6,70.8h0.1L125,164.5L125,164.5L125,164.5z
              "/>
            <path className="st0" d="M179.1,74.9l27.1-37.9l-24.3-17.3L155.2,57C164.4,61.1,172.6,67.3,179.1,74.9z"/>
            <path className="st0" d="M127.4,50.3c4.8,0,9.5,0.4,14.2,1.3V5h-31v47C116.1,50.8,121.8,50.3,127.4,50.3z"/>
            <path className="st0" d="M97.5,55.9L69.8,19.2L46,37.1l27.7,37C80.2,66.4,88.3,60.1,97.5,55.9z"/>
            </svg>
          <span className="sr-only">Loading...</span>
      </div>
</div>
      )
  }

  return (
    <div
      role="status"
      style={{ height }}
      className={
        "flex items-center justify-center h-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700" +
        " " +
        className
      }
    >
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ImageSkeleton;
