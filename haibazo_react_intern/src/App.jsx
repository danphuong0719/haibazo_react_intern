import { useRef, useState } from "react";
import "./App.css";
import Parameter from "./components/Parameter.jsx";
import Point from "./components/Point";
import { GameStatus } from "./constant";

function App() {
    const [playCount, setPlayCount] = useState(0);
    const [pointCount, setPointCount] = useState(3);
    const [points, setPoints] = useState([]);
    const [gameStatus, setGameStatus] = useState(GameStatus.LETSPLAY);
    const frameRef = useRef(null);
    const clickTimeoutRef = useRef(null);

    function onGamePlay() {
        setPlayCount((playCount) => playCount + 1);

        const points = generatePoints();
        setPoints(points);
        setGameStatus(GameStatus.PLAYING);
    }

    function onPointCountChange(e) {
        setPointCount(e.target.value);
    }

    function generatePoints() {
        const pointList = Array.from({ length: pointCount }, (_, i) => i + 1);

        const { offsetWidth: frameWidth, offsetHeight: frameHeight } =
            frameRef.current;

        const circleSize = 45;

        const generatedPoints = pointList.map((item) => {
            const x = Math.floor(Math.random() * (frameWidth - circleSize));
            const y = Math.floor(Math.random() * (frameHeight - circleSize));

            return {
                x,
                y,
                value: item,
                clicked: false,
            };
        });

        return generatedPoints;
    }

    function renderPoints() {
        if (frameRef.current) {
            function onPointClick(point) {
                if (gameStatus === GameStatus.PLAYING) {
                    const clickedPointIndex = points.findIndex(
                        (item) => item.value === point.value
                    );
                    const clickedPoint = points[clickedPointIndex];
                    const previousPoint = points[clickedPointIndex - 1];

                    if (previousPoint && !previousPoint.clicked) {
                        setGameStatus(GameStatus.OVER);
                    } else {
                        if (!clickedPoint.clicked) {
                            if (clickTimeoutRef.current) {
                                clearTimeout(clickTimeoutRef.current);
                            }
                            const mappedPoints = points.map((item) => {
                                return item.value === point.value
                                    ? { ...item, clicked: true }
                                    : item;
                            });

                            setPoints(mappedPoints);
                            clickTimeoutRef.current = setTimeout(() => {
                                const newPoints = mappedPoints.filter(
                                    (item) => !item.clicked
                                );

                                if (newPoints.length === 0)
                                    setGameStatus(GameStatus.DONE);
                                setPoints(newPoints);
                            }, 600);
                        }
                    }
                }
            }

            return points.map((item) => {
                return <Point item={item} onPointClick={onPointClick} />;
            });
        }

        return [];
    }

    return (
        <>
            <div className="container">
                <div className="mainSection">
                    <Parameter
                        pointCount={pointCount}
                        onPointCountChange={onPointCountChange}
                        playCount={playCount}
                        onGamePlay={onGamePlay}
                        gameStatus={gameStatus}
                    />
                    <div className="gameBoxSection">
                        <div className="frame" ref={frameRef}>
                            {playCount > 0 && renderPoints()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
