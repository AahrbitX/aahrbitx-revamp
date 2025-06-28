"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const AboutSectionTwo = () => {
  const [index, setIndex] = useState(0);

  const svgArray = ["bike", "support", "upgrade"];

  const variants = {
    initial: { opacity: 0, scale: 0.6, x: -200, y: -200 },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.4, x: 200, y: 200 },
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-4 flex flex-wrap items-center justify-center">
          <div className="w-full px-4 lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] p-6 text-center lg:m-0"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={`/images/about/${svgArray[index]}.svg`}
                  alt="about image"
                  fill
                  className="drop-shadow-three dark:drop-shadow-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full px-4 lg:w-[480px]">
            <div className="max-w-[470px] space-y-3 transition-colors duration-150">
              {[
                "Flawless Execution",
                "Dedicated Support",
                "Tailored Innovation",
              ].map((title, i) => (
                <div
                  key={i}
                  className={cn(
                    "cursor-pointer rounded-xl p-4 hover:bg-primary/15",
                  )}
                  onClick={() => setIndex(i)}
                >
                  <h3
                    className={cn(
                      "mb-4 text-xl font-bold sm:text-2xl lg:text-xl xl:text-2xl",
                      index === i && "text-primary",
                    )}
                  >
                    {title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    {i === 0 &&
                      "Our custom solutions are designed to deliver seamless, bug-free performance, ensuring your business operations run smoothly and efficiently."}
                    {i === 1 &&
                      "With our expert team by your side, we provide unmatched support to help your business overcome challenges and achieve success effortlessly."}
                    {i === 2 &&
                      "Leveraging advanced technologies like AI, IoT, and SaaS, we craft solutions tailored to meet your unique business needs and goals."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
