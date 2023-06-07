import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./SingleSidebar";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";

export interface SingleHeaderProps {
    pageData: SinglePageType;
    hiddenDesc?: boolean;
    metaActionStyle?: "style1" | "style2";
    titleMainClass?: string;
    className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
    pageData,
    titleMainClass,
    hiddenDesc = false,
    className = "",
    metaActionStyle = "style1",
}) => {
    const { excerpt, title } = pageData;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={excerpt} />
                <meta name="theme-color" content="#008f68" />
            </Helmet>
            <div className={`nc-SingleHeader ${className}`}>
                <div className="space-y-5">
                    {/* <CategoryBadgeList itemClass="!px-3" categories={categories} /> */}
                    <SingleTitle mainClass={titleMainClass} title={title} />
                    {!!excerpt && !hiddenDesc && (
                        <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                            {excerpt}
                        </span>
                    )}
                    <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                    <div className="flex  sm:flex-row justify-between ">

                        <p className="dark:text-neutral-100 msk-logo-text">
                            <img className="" src="/src/images/vectors/isotipo.svg" width="30" alt="" />
                            MSK - Medical & Scientific Knowledge
                        </p>
                        <SingleMetaAction2 meta={pageData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleHeader;
