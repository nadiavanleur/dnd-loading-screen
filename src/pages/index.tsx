import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import ProgressBar from "../components/ProgressBar";
import Hints, { generateRandomHint } from "../components/Hints";
import Footer from "../components/Footer";
import PauseButton from "../components/PauseButton";

const IndexPage: React.FC<PageProps> = () => {
  const TIME_PER_TIP = 20000;
  const [randomHint, setRandomHint] = React.useState<number | null>(null);
  const [timeLeft, setTimeLeft] = React.useState<number>(TIME_PER_TIP);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const requestRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number | null>(null);

  const timer = (currentTime: number) => {
    if (startTimeRef.current !== null) {
      const deltaTime = currentTime - startTimeRef.current;

      if (deltaTime >= TIME_PER_TIP) {
        setRandomHint(generateRandomHint());
        startTimeRef.current = currentTime;
      }

      setTimeLeft(Math.max(TIME_PER_TIP - deltaTime, 0));
    }

    requestRef.current = requestAnimationFrame(timer);
  };

  React.useEffect(() => {
    setRandomHint(generateRandomHint());
    startTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(timer);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handlePauseResume = () => {
    setIsPaused((prev) => {
      const newPausedState = !prev;
      if (newPausedState) {
        // Pausing simply halts animation
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
      } else {
        // Resume timer, resetting startTimeRef
        startTimeRef.current = performance.now() - (TIME_PER_TIP - timeLeft);
        requestRef.current = requestAnimationFrame(timer);
      }

      return newPausedState;
    });
  };

  return (
    <main>
      <h1 className="visually-hidden">Dungeons & Dragons loading screen hints</h1>
      <header className="header">
        <h2 className="loading">Loading...</h2>

        <PauseButton onClick={handlePauseResume} isPaused={isPaused} />
      </header>
      <div className="container">
        <Hints randomHint={randomHint} />
        <ProgressBar value={timeLeft} max={TIME_PER_TIP} label={`Time left: ${(timeLeft / 1000).toFixed(1)}s`} />
      </div>
      <Footer />
    </main>
  );
};

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
