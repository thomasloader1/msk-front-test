
import { FC } from "react";
import StoreLayout from "@/components/MSK/StoreLayout";
import StoreContent from "@/components/MSK/Store/StoreContent";
import { cookies } from "next/headers";
import ssr from "../../../../Services/ssr";
import {
  getAllCourses,
  getAllStoreSpecialties,
  setAllCourses,
  setAllStoreSpecialties,
} from "@/lib/allData";
import { Metadata } from "next";

type Props = {
  params: { lang: string, page: string }
  searchParams: { page: string; };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    //console.log(searchParams)
    const currentCountry = params.lang || cookies().get("country")?.value;  
    const nextPrevUrls = Number(searchParams.page) > 1 ? 
              [
                { rel: 'next', url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=3` },
                { rel: 'prev', url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=1` }
              ] :
              [
                { rel: 'next', url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=2` },
              ]

    return {
            title: 'Tienda',
            alternates:{
              canonical: "/tienda",
            },
            icons: {
              other: nextPrevUrls
            }
          };
}

export interface PageStoreProps {
  className?: string;
  params?: any;
}

const PageStore: FC<PageStoreProps> = async ({ className = "", params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;
  if (!getAllCourses().length) {
    const fetchedCourses = await ssr.getAllCourses(currentCountry);
    setAllCourses(fetchedCourses);
  }
  if (!getAllStoreSpecialties().length) {
    const fetchedSpecialties = await ssr.getSpecialtiesStore(currentCountry);
    setAllStoreSpecialties(fetchedSpecialties);
  }
  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      <StoreLayout
        subHeading=""
        headingEmoji=""
        heading="Tienda"
        country={currentCountry}
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreContent
            products={getAllCourses()}
            productsLength={getAllCourses().length}
            specialties={getAllStoreSpecialties()}
          />
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
