import React from 'react'
import AppUsersDataTable from './app-users-datatable'
import getAppUsers from '@/actions/user/getAppUsers';

async function DashboardUsersPage() {

  const appUsers = await getAppUsers();

  return (
    <div className='px-4'>
        <h1 className='text-2xl font-bold'>Dashboard Users</h1>
        <AppUsersDataTable appUsers={appUsers} />
    </div>
  )
}

export default DashboardUsersPage