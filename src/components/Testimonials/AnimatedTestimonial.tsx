"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { TestimonialsData } from "@/static/TestimonialsData";
import SectionTitle from "../Common/SectionTitle";

export function AnimatedTestimonials() {
  const testimonials = TestimonialsData.clients;
  const [currentSlide, setCurrentSlide] = useState(0);

  function handleNextSlide() {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }

  function handlePreviousSlide() {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }

  return (
    <div className="w-full p-4">
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900">
        <SectionTitle
          title={TestimonialsData.title}
          paragraph={TestimonialsData.subtitle}
          center
          mb="36px"
        />
        <div className="flex justify-end gap-2">
          <button
            className="group inline-flex size-7 items-center justify-center rounded-full bg-white p-1.5 dark:bg-neutral-950"
            disabled={currentSlide === 0}
            onClick={handlePreviousSlide}
            type="button"
          >
            <ArrowLeftIcon className="transform-gpu stroke-blue-500 transition-colors group-disabled:stroke-neutral-500/40" />
          </button>
          <button
            className="group inline-flex size-7 items-center justify-center rounded-full bg-white p-1.5 dark:bg-neutral-950"
            disabled={currentSlide === testimonials.length - 1}
            onClick={handleNextSlide}
            type="button"
          >
            <ArrowRightIcon className="transform-gpu stroke-blue-500 transition-colors group-disabled:stroke-neutral-500/40" />
          </button>
        </div>
        <section className="mt-8 flex w-full gap-2 *:shrink-0">
          {testimonials.map((testimonial, index) => {
            return (
              <AnimatePresence key={testimonial.name} mode="popLayout">
                {index >= currentSlide && (
                  <motion.div
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex h-60 w-[24rem] flex-col justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-neutral-800"
                    exit={{ opacity: 0, x: 0, scale: 0.8, rotate: 3 }}
                    initial={{ opacity: 0, x: 0, scale: 0.8 }}
                    layout={true}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="size-7 rounded-full bg-neutral-500/10" />
                    <p className="font-mono leading-5 tracking-tight text-neutral-600 dark:text-neutral-400">
                      {testimonial.blockquote}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      {testimonial.name} , {testimonial.occupation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default AnimatedTestimonials;
