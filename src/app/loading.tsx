import { CircularProgress } from '@mui/material'
import React from 'react'

export default function loading() {
  return (
    <div className='w-full min-h-[90vh] flex items-center justify-center'>
        <CircularProgress />
    </div>
  )
}
