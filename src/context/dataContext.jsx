const {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} = require("react");

const dataContext = createContext();

const DataProvider = ({ children }) => {
  // States for game management
  const [data, setData] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [activeCard, setActiveCard] = useState([]);
  const [matchCard, setMatchCard] = useState([]);
  const [totalMatchCard, setTotalMatchCard] = useState([]);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);

  // All Timers initial states
  const [countDown, setcountDown] = useState(5);
  const [initialTimer, setInitialTimer] = useState(8);
  const [timer, setTimer] = useState(30);

  // Refs for getting current state of timer
  const countDownRef = useRef(null);
  const initialTimerRef = useRef(null);
  const timerRef = useRef(null);

  //Boolean for timer management
  const [startinitialTimer, setStartInitialTimer] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  let totalCards = (data[0]?.imageSet.length + data[1]?.imageSet.length) * 2;

  // Countdown timer
  useEffect(() => {
    if (countDownRef.current && countDown === 0) {
      clearInterval(countDownRef.current);
      setStartInitialTimer(true);
      return;
    }
    countDownRef.current = setInterval(() => {
      setcountDown((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(countDownRef.current);
    };
  }, [countDown, setcountDown, startinitialTimer]);

  // Initial timer for card images visibility
  useEffect(() => {
    if (initialTimerRef.current && initialTimer === 0) {
      clearInterval(initialTimerRef.current);
      setStartTimer(true);
      return;
    }
    if (startinitialTimer) {
      initialTimerRef.current = setInterval(() => {
        setInitialTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(initialTimerRef.current);
    };
  }, [startinitialTimer, initialTimer, startTimer]);

  // Timer for solo memory managemnt game
  useEffect(() => {
    if ((timerRef.current && timer === 0) || matchCard?.length === totalCards) {
      clearInterval(timerRef.current);
      return;
    }
    if (startTimer) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [startTimer, timer, totalCards, matchCard]);

  // For fetching all data from json file
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("assets/Card-Flip.json");
        const response = await res.json();
        let memoryData = response["Card-Flip"];
        setData(memoryData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Fetching current game images
  useEffect(() => {
    setCurrentList(
      data[count]?.imageSet
        ?.concat(data[count].imageSet)
        .sort(() => Math.random() - 0.5)
    );
  }, [data, count]);

  return (
    <div>
      <dataContext.Provider
        value={{
          data,
          currentList,
          setCount,
          score,
          setScore,
          activeCard,
          setActiveCard,
          matchCard,
          setMatchCard,
          setcountDown,
          countDown,
          initialTimer,
          setInitialTimer,
          timer,
          setTimer,
          setStartInitialTimer,
          setStartTimer,
          totalCards,
          startTimer,
          totalMatchCard,
          setTotalMatchCard,
        }}
      >
        {children}
      </dataContext.Provider>
    </div>
  );
};

const useData = () => useContext(dataContext);

export { useData, DataProvider };
