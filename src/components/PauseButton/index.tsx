import React from "react"
import Icon from "../Icon"

type Props = {
  isPaused: boolean,
  onClick: () => void,
}

const PauseButton = ({ isPaused, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <span className="visually-hidden">
        {isPaused ? "Resume" : "Pause"}
      </span>
      <Icon icon={isPaused ? "play" : "pause"} width={64} height={64} />
    </button>
  )
}

export default PauseButton