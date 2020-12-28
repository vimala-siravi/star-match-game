import { useState, useEffect } from "react";
import utils from "./utils";

const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNumbers) => {
    if (utils.sum(newCandidateNumbers) !== stars) {
      setCandidateNumbers(newCandidateNumbers);
    } else {
      const newAvailableNumbers = availableNumbers.filter(
        (n) => !newCandidateNumbers.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNumbers, 9));
      setAvailableNumbers(newAvailableNumbers);
      setCandidateNumbers([]);
    }
  };
  return {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState
  };
};

export default useGameState;
