import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import tips from "../data/tips.json"
import Icon from "../components/Icon"
import ProgressBar from "../components/ProgressBar"

type Tip = {
  label: string
}

const IndexPage: React.FC<PageProps> = () => {
  const TIME_PER_TIP = 15000;
  const [randomTip, setRandomTip] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(TIME_PER_TIP);
  let animationRequest = 0;
  let startTime: number | null = null;

  // Get random tip
  const generateRandomTip = () => Math.floor(Math.random() * tips.length);

  // Process time
  const timer = (time: number) => {
    if (!!startTime) {
      const deltaTime = time - startTime;

      if (deltaTime >= TIME_PER_TIP) {
        setRandomTip(generateRandomTip());
        startTime = time;
      };

      setTimeLeft(TIME_PER_TIP - deltaTime);
    } else startTime = time;

    animationRequest = requestAnimationFrame(timer);
  }

  React.useEffect(() => {
    setRandomTip(generateRandomTip());
    animationRequest = requestAnimationFrame(timer);
    return () => cancelAnimationFrame(animationRequest);
  }, []);

  return (
    <main>
      <h1 className="visually-hidden">Dungeons & Dragons loading screen tips</h1>
      <h2 className="loading">Loading...</h2>
      <div className="container">
        <ul className="tips">
          {tips.map((tip: Tip, n: number) => (
            <li key={n} className={`tip ${randomTip === n ? 'active' : 'inactive'}`}>
              {tip.label}
            </li>
          ))}
        </ul>
        <ProgressBar value={timeLeft} max={TIME_PER_TIP} label={`Time left: ${timeLeft / 1000}`} />
      </div>
      <footer className="footer">
        <Icon icon="logo" />
      </footer>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>D&D loading screen tips</title>
