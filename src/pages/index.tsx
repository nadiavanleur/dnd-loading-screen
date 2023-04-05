import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import tips from "../data/tips.json"
import '../styles/global.scss'
import Icon from "../components/Icon"

type Tip = {
  label: string
}

const IndexPage: React.FC<PageProps> = () => {
  const generateRandomTip = () => Math.floor(Math.random() * tips.length);
  const [randomTip, setRandomTip] = React.useState(generateRandomTip());

  setInterval(() => {
    setRandomTip(generateRandomTip());
  }, 15000);


  return (
    <main>
      <h1 className="visually-hidden">Dungeons & Dragons loading screen tips</h1>
      <h2 className="loading">Loading...</h2>
      <ul className="tips">
        {tips.map((tip: Tip, n: number) => (
          <li key={n} className={`tip ${randomTip === n ? 'active' : ''}`}>
            {tip.label}
          </li>
        ))}
      </ul>
      <footer className="footer">
        <Icon icon="logo" />
      </footer>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>D&D loading screen tips</title>
