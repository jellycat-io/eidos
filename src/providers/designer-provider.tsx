"use client"

import { createContext, useState } from "react"

import type { ElementType, FormElementInstance } from "@/lib/types"

interface DesignerContextState {
  elements: FormElementInstance<ElementType>[]
  addElement: (index: number, element: FormElementInstance<ElementType>) => void
  removeElement: (id: string) => void
  reorderElements: (oldIndex: number, newIndex: number) => void
}

export const DesignerContext = createContext<DesignerContextState | null>(null)

export function DesignerProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance<ElementType>[]>(
    [],
  )

  function addElement(
    index: number,
    element: FormElementInstance<ElementType>,
  ) {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  function removeElement(id: string) {
    setElements((prev) => prev.filter((el) => el.id !== id))
  }

  function reorderElements(oldIndex: number, newIndex: number) {
    setElements((prev) => {
      const updated = [...prev]
      const [removed] = updated.splice(oldIndex, 1)
      updated.splice(newIndex, 0, removed)
      return updated
    })
  }

  return (
    <DesignerContext.Provider
      value={{ elements, addElement, removeElement, reorderElements }}
    >
      {children}
    </DesignerContext.Provider>
  )
}
