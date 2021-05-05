import React, { Fragment, useCallback } from 'react'
import { classNames } from '~/presentation/helpers'

type Props = {
  title: string;
  color?: string;
  icon?: React.FC<any>
  active?: boolean
  index: number
  setSelectedTab: (index: number) => void
}

export const ModeItem: React.FC<Props> = (props) => {
  const Icon = props.icon
  const activeClasses = props.active === true ? "border-2 border-green-300" : "border-2 hover:border-blue-200"
  const cardClasses = classNames("flex w-1/6 p-3 cursor-pointer rounded-xl bg-white", activeClasses)

  const handleOnClick = useCallback(() => {
    props.setSelectedTab(props.index)
  }, [props.setSelectedTab, props.index])

  return (
    <li className={classNames(cardClasses)} onClick={handleOnClick}>
      <div className="flex flex-col mx-auto space-y-2">
        {Icon && <Icon className={classNames("h-10 w-auto", props.color)} />}
        <span className="font-normal block">{props.title}</span>
      </div>
    </li>
  )
}

export const ModeItemTab: React.FC<Omit<Props, 'index' | 'setSelectedTab'>> = (props) => {
  return (
    <Fragment>
      {props.children}
    </Fragment>
  )
}
