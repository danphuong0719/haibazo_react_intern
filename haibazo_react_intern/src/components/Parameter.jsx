import { useEffect, useRef, useState } from "react";
import { GameStatus } from "../constant";

const Parameter = ({
    pointCount,
    onPointCountChange,
    onGamePlay,
    playCount,
    gameStatus,
}) => {
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(null);

    let displayedGameStatus = "LET'S PLAY";
    let gameStatusClassName = "";

    switch (gameStatus) {
        case GameStatus.OVER:
            displayedGameStatus = "GAME OVER";
            gameStatusClassName = "red-text";
            break;
        case GameStatus.DONE:
            displayedGameStatus = "ALL CLEARED";
            gameStatusClassName = "green-text";
            break;
        case GameStatus.PLAYING:
            displayedGameStatus = "LET'S PLAY";
            break;

        default:
            displayedGameStatus = "LET'S PLAY";
            gameStatusClassName = "";
            break;
    }

    // Timer
    useEffect(() => {
        if (playCount > 0) {
            if (
                gameStatus === GameStatus.DONE ||
                gameStatus === GameStatus.OVER
            ) {
                clearInterval(timerRef.current);
            } else {
                setTimer(0);
                timerRef.current = setInterval(() => {
                    setTimer((prev) => prev + 0.1);
                }, 100);

                return () => clearInterval(timerRef.current);
            }
        }
    }, [playCount, gameStatus]);

    return (
        <div className="parametersSection">
            <div className={`label ${gameStatusClassName}`}>
                {displayedGameStatus}
            </div>
            <div className="parameters">
                <div className="parameter">
                    <label htmlFor="point">Points:</label>
                    <input
                        type="text"
                        id="point"
                        name="point"
                        value={pointCount}
                        onChange={onPointCountChange}
                    />
                </div>
                <div className="parameter">
                    <label>Time:</label>
                    <span className="time-value">{timer.toFixed(1)}s</span>
                </div>
            </div>
            <button className="play-restart-button" onClick={onGamePlay}>
                {!playCount ? "Play" : "Restart"}
            </button>
        </div>
    );
};

export default Parameter;
