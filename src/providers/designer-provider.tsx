"use client"

import { createContext, useState } from "react"

import type { FormElementInstance } from "@/lib/types"

interface DesignerContextState {
  elements: FormElementInstance[]
  addElement: (index: number, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesignerContextState | null>(null)

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([])

  function addElement(index: number, element: FormElementInstance) {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, element)
      return newElements
    })
  }
  return (
    <DesignerContext.Provider value={{ elements, addElement }}>
      {children}
    </DesignerContext.Provider>
  )
}
