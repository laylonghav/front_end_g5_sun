import { useEffect, useState } from "react";

export default function IntervalCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    // Cleanup: stop counting on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <di>
      Interval Card
      <h1>Count: {count}</h1>
    </di>
  );
}
