import React from 'react'
import { Metadata } from 'next'
import AvailableTemplates from './components/available-templates'
import { createClient } from '@/utils/supabase/client'

export const metadata :Metadata = {
  title: "Revenue - Templates"
}

async function SalesPage() {

      const supabase = createClient();
      const templates = await supabase.from('templates').select('*').order('created_at', { ascending: false })    ;
      console.log(templates.data);
  
      if(!templates.data){
          return (
              <div>
                  <p>No templates found</p>
              </div>
          )
      }

  return (
    <section className="@container flex flex-1 flex-col gap-4 p-4 pt-0 ">
       <h1 className="text-2xl font-bold">Templates</h1>
       <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4 grid grid-cols-[1fr_1fr_1.2fr] gap-4 grid-rows-[350px_1fr]" >
        <div className='bg-muted/50 col-span-2 rounded-xl'></div>
        <div className='bg-muted/50 col-span-1 rounded-xl'></div>
        <AvailableTemplates templates={templates.data}/>
       </div>
    </section>  
  )
}

export default SalesPage
