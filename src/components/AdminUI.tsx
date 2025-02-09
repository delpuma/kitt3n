import React from 'react'
import { Nav } from 'payload/components/admin'

const AdminUI: React.FC = (props) => {
  return (
    <Nav {...props}>
      <div className="admin-logo">
        <img
          src="/Delpuma2025WhiteLogo.svg"
          alt="DelPuma Consulting Group"
          style={{ height: '40px' }}
        />
      </div>
    </Nav>
  )
}

export default AdminUI
