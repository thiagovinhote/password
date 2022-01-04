import React, { ReactElement, useState } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import { ModeItem } from './tab-mode-item'

type Props = {
  children: ReactElement[]
}

export const TabsModel: React.FC<Props> = props => {
  const [selectedTab, setSelectedTab] = useState(0)
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  return (
    <>
      <AnimateSharedLayout>
        <ul className="flex flex-row space-x-4">
          {children.map((item, index) => {
            return (
              <ModeItem
                {...item.props}
                setSelectedTab={setSelectedTab}
                active={index === selectedTab}
                index={index}
                key={index}
              />
            )
          })}
        </ul>
      </AnimateSharedLayout>
      <div className="mt-4">{children[selectedTab]}</div>
    </>
  )
}
