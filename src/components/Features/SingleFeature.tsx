"use client";

import { motion, Variants } from "motion/react";
import { Feature } from "@/types/feature";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function SingleFeature({ feature }: { feature: Feature }) {
  const { icon, title, paragraph } = feature;
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Optional: Only animate once
      className="group w-full cursor-pointer rounded-xl bg-secondary p-4 shadow-md transition-colors duration-200 selection:bg-white
    selection:text-black hover:bg-primary dark:bg-neutral-800 dark:bg-opacity-75 dark:hover:bg-neutral-950"
    >
      <div>
        <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-md p-3 text-primary group-hover:text-white">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-black group-hover:text-white dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color group-hover:text-neutral-200">
          {paragraph}
        </p>
      </div>
    </motion.div>
  );
}
