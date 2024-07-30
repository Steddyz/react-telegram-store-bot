import { useEffect } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
  const onCLose = () => {
    tg.close();
  };

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      work<button onClick={onCLose}>Закрыть</button>
    </div>
  );
}

export default App;
