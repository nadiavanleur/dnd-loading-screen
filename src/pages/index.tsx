import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import ProgressBar from "../components/ProgressBar"
import Tips, { generateRandomTip } from "../components/Tips"
import Footer from "../components/Footer"

const IndexPage: React.FC<PageProps> = () => {
  const TIME_PER_TIP = 15000;
  const [randomTip, setRandomTip] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(TIME_PER_TIP);
  let animationRequest = 0;
  let startTime: number | null = null;

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

  // Start timer
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
        <Tips randomTip={randomTip} />
        <ProgressBar value={timeLeft} max={TIME_PER_TIP} label={`Time left: ${timeLeft / 1000}`} />
      </div>
      <Footer />
    </main>
  )
}

export default IndexPage;

export const Head: HeadFC = () => <title>D&D loading screen tips</title>;
