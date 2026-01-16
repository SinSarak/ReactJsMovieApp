import React from 'react'
import { Outlet } from "react-router";

const MasterLayoutWeb = () => {
  return (
    <main>
      <div className="pattern"></div>
      <Outlet/>
    </main>
  )
}

export default MasterLayoutWeb
