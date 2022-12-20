import type React from "react"
import type { ReactElement } from "react"

export const Paragraph = ({
  text = "Boop",
}: {
  text?: string
}): ReactElement => {
  return (
    <>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero harum
        omnis nulla maiores praesentium hic? Eos molestias, ex deserunt quisquam
        doloremque dolore nostrum molestiae quos quam enim, harum deleniti
        natus!
      </h1>
    </>
  )
}
