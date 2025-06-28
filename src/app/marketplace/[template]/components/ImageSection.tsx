"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/simple-carousel";

import Image from "next/image";

type ImageGalleryProps = {
  images: { src: string; alt: string }[];
};

export default function ImageSection({ images }: ImageGalleryProps) {
  return (
    <>
      <ImagesCarousel images={images} />
      <div className="hidden grid-cols-1 gap-4 lg:grid">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={1000}
            height={300}
            className="overflow-hidden rounded-xl"
          />
        ))}
      </div>
    </>
  );
}

function ImagesCarousel(props: ImageGalleryProps) {
  return (
    <Carousel
      className="mb-6 w-full lg:hidden"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent className="rounded-xl">
        {props.images.map((image, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <CarouselItem className="" key={`carousel-image-${index}`}>
            <Image
              alt={image.alt}
              className=" h-full w-full rounded-xl"
              height={200}
              src={image.src}
              width={300}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
