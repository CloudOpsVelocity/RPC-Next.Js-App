import React from 'react'
import Footer from '../components/layouts/primary/footer'
import Header from '@/app/components/layouts/primary/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}