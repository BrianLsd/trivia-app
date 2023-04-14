import { useState, useEffect } from "react";

function QuizTimer () {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
    const intervalId = setInterval(() => {
        if (seconds === 59) {
            setSeconds(0);
            setMinutes(minutes + 1);
        } else {
            setSeconds(seconds + 1);
        }
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, [minutes, seconds]);

    useEffect(() => {
        localStorage.setItem('timerMinutes', minutes);
        localStorage.setItem('timerSeconds', seconds);
    }, [minutes, seconds]);

    return (
        <div>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
    );
};

export default QuizTimer;