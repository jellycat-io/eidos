"use client"

import { useContext } from "react"

import { DesignerContext } from "@/providers/designer-provider"

export function useDesigner() {
  const context = useContext(DesignerContext)

  if (!context)
    throw new Error("useDesigner can only be used inside a DesignerProvider")

  return context
}
