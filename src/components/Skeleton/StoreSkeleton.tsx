import React, { FC } from "react";
import ItemSkeleton from "@/components/Skeleton/ItemSkeleton";

const StoreSkeleton: FC = () => {
    const items =["card","card","card","card","card","card","card","card","card"];
    return (
        <>
            {items.map((el,i) => <ItemSkeleton key={`${el}_${i}`} className="" />)}
        </>
    );
};

export default StoreSkeleton;
