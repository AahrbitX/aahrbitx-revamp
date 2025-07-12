"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

function AvailableTemplates({templates}: {templates: any}) {

    console.log(templates);

    if(!templates){
        return (
            <div>
                <p>No templates found</p>
            </div>
        )
    }
    
  return (
    <div className='bg-muted/50 col-span-3 rounded-xl row-span-2  px-4'>
        <Table className="min-w-[800px] my-4">
            <TableHeader>
                <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Template Description</TableHead>
                        <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {templates.map((template: any) => (
                    <TableRow key={template.id} >
                        <TableCell>{template.title}</TableCell>
                        <TableCell>{template.description}</TableCell>
                        <TableCell className="flex gap-2">

                            <Button
                                asChild
                                className="bg-primary text-primary-foreground"
                            >
                                <Link href={`/marketplace/${template.slug}`}>View</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground"
                            >
                                <Link href={template.link} target="_blank">Site</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground"
                            >
                                <Link href={`/dashboard/templates/${template.id}/edit`}>Edit</Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground"
                            >
                                <Link href={`/dashboard/templates/${template.id}/details`}>Details</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AvailableTemplates