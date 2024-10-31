import { UpdatedAdminDashboardComponent } from '@/components/updated-admin-dashboard'
import React from 'react'
import { db } from '../../../lib/db'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Admin() {

    
    const users = await db.user.findMany({
        where:{
            is_registered_IW:true,
        }
    })


    // console.log(users)
    // if (users?.length == 0) {
    //     return <div className='flex justify-center items-center'>No Users Found...</div>
    // }
  return (
    <UpdatedAdminDashboardComponent users={users}/>
  )
}
