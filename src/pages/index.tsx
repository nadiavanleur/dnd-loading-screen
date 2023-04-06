import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import ProgressBar from "../components/ProgressBar"
import Hints, { generateRandomHint } from "../components/Hints"
import Footer from "../components/Footer"

const IndexPage: React.FC<PageProps> = () => {
  const TIME_PER_TIP = 15000;
  const [randomHint, setRandomHint] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(TIME_PER_TIP);
  let animationRequest = 0;
  let startTime: number | null = null;

  // Process time
  const timer = (time: number) => {
    if (!!startTime) {
      const deltaTime = time - startTime;

      if (deltaTime >= TIME_PER_TIP) {
        setRandomHint(generateRandomHint());
        startTime = time;
      };

      setTimeLeft(TIME_PER_TIP - deltaTime);
    } else startTime = time;

    animationRequest = requestAnimationFrame(timer);
  }

  // Start timer
  React.useEffect(() => {
    setRandomHint(generateRandomHint());
    animationRequest = requestAnimationFrame(timer);
    return () => cancelAnimationFrame(animationRequest);
  }, []);

  return (
    <main>
      <h1 className="visually-hidden">Dungeons & Dragons loading screen hints</h1>
      <h2 className="loading">Loading...</h2>
      <div className="container">
        <Hints randomHint={randomHint} />
        <ProgressBar value={timeLeft} max={TIME_PER_TIP} label={`Time left: ${timeLeft / 1000}`} />
      </div>
      <Footer />
    </main>
  )
}

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>D&D loading screen hints</title>

    <meta property="og:type" content="website" />
    <meta property="og:title" content="D&D loading screen" />
    <meta property="og:url" content="https://dndloadingscreen.site/" />
    <meta property="og:image" content="https://dndloadingscreen.site/screenshot_v2.jpg" />
    <meta property="og:description" content="Dungeon Masters can't know everything and sometimes need to look things up. Inspired by /u/CountedCrow this loading screen / screensaver was made. You can put this on a screen at your D&D table to give your players something to talk about while you prepare the next encounter." />

    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="D&D loading screen" />
    <meta property="twitter:url" content="https://dndloadingscreen.site/" />
    <meta name="twitter:image" content="https://dndloadingscreen.site/screenshot_v2.jpg" />
    <meta name="twitter:image:alt" content="Loading... Multiple instances of vulnerability or resistance only count once each. [progress bar] [Dungeons and Dragons logo]" />
    <meta property="twitter:description" content="Dungeon Masters can't know everything and sometimes need to look things up. Inspired by /u/CountedCrow this loading screen / screensaver was made. You can put this on a screen at your D&D table to give your players something to talk about while you prepare the next encounter." />
    <meta name="twitter:site" content="https://reddit.com/" />
    <meta name="twitter:creator" content="/u/nachowithan_a" />
  </>
);
