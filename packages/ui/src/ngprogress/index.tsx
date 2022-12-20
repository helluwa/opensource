import { useNProgress } from "@tanem/react-nprogress"
import type React from "react"

import Bar from "./Bar"
import Container from "./Container"
import Spinner from "./Spinner"

type NGProgressType = {
  isAnimating: boolean
  spinner?: boolean
  onlySpinner?: boolean
  barColor?: string
}

export const NGProgress: React.FC<NGProgressType> = ({
  isAnimating,
  onlySpinner,
  spinner,
  barColor,
}) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      {!onlySpinner && (
        <Bar
          animationDuration={animationDuration}
          progress={progress}
          color={barColor ?? "#29d"}
        />
      )}
      {(spinner || onlySpinner) && <Spinner />}
    </Container>
  )
}

