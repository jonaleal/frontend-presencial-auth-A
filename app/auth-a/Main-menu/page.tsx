"use client"
import Link from "next/link"
import React, { useState } from "react"
import { IconAirplane } from "components/components-Auth-a/IconAirplane"

const Header: React.FC = () => {
  const [validToken] = useState(false)

  const displaySessionState = () => {
    if (validToken) {
      return (
        <>
          <button className="bg-neutral-0 rounded border-2 border-blue-500 px-6 py-3 text-blue-500">
            Administrar roles
          </button>
          <div className="flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-neutral-500">
              <span className="text-xl">👤</span>
            </div>
            <span className="text-neutral-500">User Name</span>
          </div>
        </>
      )
    } else {
      return (
        <>
          <button className="rounded bg-blue-500 px-6 py-3 text-neutral-50">
            <Link href={"Login"}>Iniciar sesión</Link>
          </button>
          <button className="bg-neutral-0 rounded border-2 border-blue-500 px-6 py-3 text-blue-500">
            <Link href={"signup"}>Registrarse</Link>
          </button>
        </>
      )
    }
  }

  return (
    <header className="mb-4 flex items-center justify-between border-b border-gray-300 bg-neutral-50 p-4 text-white">
      <div className="flex items-center">
        <div className="flex space-x-4">
          <div className="w-10">
            <IconAirplane />
          </div>
          <button className="bg-white-600 rounded px-6 py-3 text-neutral-500">Reservar</button>
          <button className="bg-white-600 rounded px-6 py-3 text-neutral-500">Tus vuelos</button>
          <button className="bg-white-600 rounded px-6 py-3 text-neutral-500">Pagos</button>
          <button className="bg-white-600 rounded px-6 py-3 text-neutral-500">Check in</button>
        </div>
      </div>
      <div className="flex items-center space-x-4">{displaySessionState()}</div>
    </header>
  )
}

export default Header
