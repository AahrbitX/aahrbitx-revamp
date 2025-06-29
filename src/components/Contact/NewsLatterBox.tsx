"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const NewsLatterBox = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // fix hydration mismatch

  return (
    <div className="relative z-10 rounded-xl bg-neutral-200 dark:bg-neutral-900 p-8 shadow-three dark:bg-gray-dark sm:p-11 lg:p-8 xl:p-11">
      <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
        Stay Updated with AahrbitX°
      </h3>
      <p className="mb-11 border-b border-body-color border-opacity-25 pb-11 text-base leading-relaxed text-body-color dark:border-neutral-500 dark:border-opacity-25">
        Subscribe to get the latest updates, product launches, and exclusive content straight to your inbox.
      </p>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="border-stroke mb-4 w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="border-stroke mb-4 w-full rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
        />
        <input
          type="submit"
          value="Subscribe"
          className="mb-5 flex w-full rounded-xl cursor-pointer items-center justify-center bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
        />
        <p className="text-center text-base leading-relaxed text-body-color dark:text-body-color-dark">
          No spam — just the latest updates and insights from the team.
        </p>
      </div>

      {/* SVG elements with theme-based gradients */}
      <div>
        {/* Your existing <svg> elements here, no change needed */}
        {/* Replace `theme === "light"` with actual logic since now `theme` is available */}
        {/* Example shown for one stop: */}
        {/* stopColor={theme === "light" ? "#4A6CF7" : "#fff"} */}
      </div>
    </div>
  )
}

export default NewsLatterBox
