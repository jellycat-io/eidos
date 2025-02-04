import React from "react"

export interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  children: React.ReactNode
}

export const Clickable = React.forwardRef<HTMLElement, ClickableProps>(
  ({ as: Component = "div", onClick, children, ...rest }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        e.currentTarget.click()
      }
    }

    const interactiveElements = ["button", "a", "input"]
    const isInteractive =
      typeof Component === "string" && interactiveElements.includes(Component)

    const extraProps = isInteractive
      ? {}
      : { role: "button", tabIndex: 0, onKeyDown: handleKeyDown }

    return (
      <Component ref={ref} onClick={onClick} {...extraProps} {...rest}>
        {children}
      </Component>
    )
  },
)

Clickable.displayName = "Clickable"
