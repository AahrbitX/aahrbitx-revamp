import React from 'react'
import { Metadata } from 'next'

export const metadata :Metadata = {
  title: "Revenue"
}

function SalesPage() {
  return (
    <section className="@container p-4">
      <div className="grid gap-4 @sm:grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3">
      </div>
    </section>
  )
}

export default SalesPage
