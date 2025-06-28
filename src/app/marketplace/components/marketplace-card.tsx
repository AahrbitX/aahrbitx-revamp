import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TemplateProps } from "@/types/Marketplace";

function MarketPlaceCard(props: Partial<TemplateProps>) {
  const { id, title, description, imageUrls, comingSoon } = props;

  const fullpageImage = imageUrls.fullpage;

  return (
    <Link
      href={comingSoon ? "" : `/marketplace/${id}`}
      className="group relative h-[25rem] overflow-hidden rounded-xl "
    >
      <div className="transition-transform duration-700 ease-in-out group-hover:-translate-y-[calc(100%-25rem)]">
        <Image
          src={fullpageImage}
          alt={`full page preview image of ${title}`}
          width={340}
          height={1000}
          className="w-full object-cover"
        />
      </div>
      <div className="invisible absolute bottom-0 h-[12rem] w-full group-hover:visible">
        <div className="h-full w-full bg-gradient-to-t from-white from-50% to-transparent dark:from-black" />
        <div className="absolute bottom-10 left-4 text-black dark:text-white ">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm ">{description}</p>
        </div>
      </div>
      <div></div>
    </Link>
  );
}

export default MarketPlaceCard;
