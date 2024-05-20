import React, { FC } from "react";
import PageGraciasComponent from "@/components/MSK/crear-cuenta/Page";
export async function generateMetadata() {
  return {
    title: "Gracias",
  };
}
const PageGracias: FC = () => {
  return <PageGraciasComponent/>;
};

export default PageGracias;