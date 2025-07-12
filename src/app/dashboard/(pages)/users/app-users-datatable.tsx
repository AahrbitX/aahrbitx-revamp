import React from 'react'
import { DataTable } from '../../components/data-table'
import { columns } from './columns'
import { AppUser } from '@/types/App.types';

function AppUsersDataTable({appUsers}: {appUsers: AppUser[]}) {
  return (
    <div className='mt-4'>
      <DataTable columns={columns} data={appUsers} />
    </div>
  )
}
  
export default AppUsersDataTable