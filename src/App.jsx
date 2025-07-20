import { useEffect, useRef, useState } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(()=> {
    if(isRunning){
      intervalRef.current = setInterval(()=> {
        setSeconds(prev => prev +1);
      }, 1000);
    }
    return ()=> clearInterval(intervalRef.current);
  }, [isRunning]);
  
  const handleTimer = ()=>{
    setIsRunning(prev => !prev);
  }

  const handleReset= () => {
    setIsRunning(false);
    setSeconds(0);
  }

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds/60);
    const secs = totalSeconds%60;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    return `${mins}:${formattedSecs}`;
  }


  return (
    <div>
      <h2>Stopwatch</h2>
      <p>Time: {formatTime(seconds)}</p>
      {!isRunning ? (
        <button onClick={handleTimer}>Start</button>
      ) : (
        <button onClick={handleTimer}>Stop</button>
      )}
      <button onClick={handleReset} >Reset</button>
    </div>
  );
}

export default App;
