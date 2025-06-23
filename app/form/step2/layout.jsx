'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Step2Layout({ children }) {
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('reflecta-user') || '{}')
    if (!user.code || !user.gender || !user.id) {
      console.log(sth)
      router.replace('/form/step1')
    }
  }, [])

  return <>{children}</>
}
