import React from "react"
import * as style from "./style.module.scss"

type Props = {
  label: string,
  value: number,
  max: number,
}

const ProgressBar = ({ label, value, max }: Props) => {
  return (
    <div className={style.container}>
      <progress value={value} max={max}>{label}</progress>
    </div>
  )
}

export default ProgressBar