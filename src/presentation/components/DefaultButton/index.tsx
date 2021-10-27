import React, { AnchorHTMLAttributes, DetailedHTMLFactory, ElementType } from "react";
import { classNames } from "~/presentation/helpers";

type ExtractTag<T> = T extends DetailedHTMLFactory<infer P, any> ? P : unknown;

type Props<T extends ElementType> = {
  tag?: T;
  color: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'yellow' | 'indigo' | 'gray' | 'white'
  className?: string
  onClick?: () => void
  children?: React.ReactNode
  // attrs?: ExtractTag<React.ReactHTML[T]>
  attrs?: any
}

const DefaultButtonFC = <T extends ElementType,>(props: Props<T>, ref: any) => {
  const { tag, children, color, className, ...rest } = props;
  const elementType = tag ?? 'button'

  const buttonClasses = "focus:outline-none rounded text-sm px-4 py-2"
  const colorClasses = `active:text-${color}-900 active:bg-${color}-300 hover:bg-${color}-200 hover:text-${color}-800 bg-${color}-100 text-${color}-600`

  return React.createElement(
    elementType,
    { ...rest, ...rest.attrs, ref, className: classNames(className, buttonClasses, colorClasses) },
    children
  )
}

export const DefaultButton = React.forwardRef(DefaultButtonFC)
