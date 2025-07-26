import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { templateData } from "@/static/templatesData";
import PriceBreakdown from "./components/price-breakdown";
import ImageSection from "./components/ImageSection";
import ActionButtons from "./components/action-buttons";
import TemplatePoints from "./components/template-points";
import SecondaryActions from "./components/secondary-actions";

type Props = {
  params: Promise<{ template: string }>;
};

export async function generateStaticParams() {
  return templateData
    .filter((template) => !template.comingSoon)
    .map((template) => ({
      template: template.id,
    }));
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { template: id } = await params;
  const template = templateData.find(
    (template) => template.id === id && !template.comingSoon
  );

  if (!template) {
    return {};
  }

  return {
    title: template.title,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      images: [
        {
          url: template.imageUrls.metaImage.src,
          alt: template.imageUrls.metaImage.alt,
        },
      ],
    },
  };
};

async function TemplatePage({ params }: Props) {
  const { template: id } = await params;

  const template = templateData.find((template) => template.id === id);

  if (!template || template.comingSoon) {
    notFound();
  }

  const { imageUrls } = template;
  const flatImages = [...imageUrls.illustrations, imageUrls.metaImage];

  return (
    <>
      <div className="relative grid min-h-screen grid-cols-1 grid-rows-[auto_auto] gap-8 lg:grid-cols-[2fr_400px] lg:grid-rows-1">
        <div className="h-fit">
          <ImageSection images={flatImages} />
        </div>
        <div className="w-full">
          <div className="sticky top-24 flex flex-col ">
            <div>
              <h1 className="text-center  text-3xl font-bold md:text-start">
                {template.title}
              </h1>
              <p className="mt-2  text-center opacity-65 md:text-start">
                {template.description}
              </p>
            </div>
            {/* <div className="py-3">
              <ColorTheme colors={template.colorSchema} />
            </div> */}
            <TemplatePoints template={template} />
            <SecondaryActions template={template} />
            <hr className="mb-6 opacity-35" />
            <ActionButtons template={template} />
            <div className="mt-6 opacity-80">
              <p className="text-justify">{template.full_description}</p>
            </div>
          </div>
        </div>
      </div>
      <PriceBreakdown template={template} />
    </>
  );
}

export default TemplatePage;
