"use client"

import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

function InfoContent() {
  const searchParams = useSearchParams()

  let Information = {
    title: "Information Page",
    description: ["This is the information page."]
  }

  if (searchParams.get('signup-success') === 'true') {
    Information.title = "Signup Successful"
    Information.description = [
      "Your account has been created successfully.",
      "Please verify your email address to complete the signup process."
    ]
  }

  return (
    <section className='flex flex-col items-center justify-center min-h-screen p-6 bg-background'>
      <h1 className='text-primary font-bold text-2xl md:text-4xl mb-2'>
        {Information.title}
      </h1>
      {Information.description.map((desc, index) => (
        <p key={index}>{desc}</p>
      ))}
    </section>
  )
}

function InfoPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <InfoContent />
    </Suspense>
  )
}

export default InfoPage
