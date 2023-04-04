import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>Dungeons & Dragons loading screen tips</h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>D&D loading screen tips</title>
