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
      <StoreLayout subHeading="" headingEmoji="" heading="Tienda">
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
