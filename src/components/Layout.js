import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Navbar />
      <main style={{ flex: 1, backgroundColor: '#1b263b', color: '#fff' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
