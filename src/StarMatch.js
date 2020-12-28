import utils from "./utils";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";
import useGameState from "./useGameState";

const StarMatch = (props) => {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState
  } = useGameState();

  const candidatesAreWrong = () => {
    return utils.sum(candidateNumbers) > stars;
  };

  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const OnNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    const newCandidateNumbers =
      currentStatus === "available"
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

    setGameState(newCandidateNumbers);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => {
            return (
              <PlayNumber
                key={number}
                number={number}
                status={numberStatus(number)}
                onClick={OnNumberClick}
              />
            );
          })}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};
export default StarMatch;
