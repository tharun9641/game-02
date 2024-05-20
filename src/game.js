import { useState } from "react";
import "../src/game.css";
import { motion } from "framer-motion";
import apple from "../src/images/apple.jpg";
import car from "../src/images/car.jpg";
import cat from "../src/images/cat.jpg";
import dog from "../src/images/dog.jpg";
import guitar from "../src/images/guitar.jpg";
import land from "../src/images/landscape.jpg";
import moon from "../src/images/moon.jpg";
import penguin from "../src/images/penguin.jpg";
const Game = () => {
  const imagesData = {
    1: apple,
    2: car,
    3: cat,
    4: dog,
    5: guitar,
    6: land,
    7: moon,
    8: penguin,
  };
  const [getGame, setGame] = useState({
    gameover: false,
  });
  const [getlevel, setlevel] = useState({ level: "" });
  const [getPair, setPair] = useState({
    pairs: 0,
  });
  const [getMode, setMode] = useState({ mode: null });
  const [getmoves, setmove] = useState(0);
  const [getClick, setClick] = useState(0);
  const [getPositin, setPosition] = useState(null);
  const [getIndex, setIndex] = useState([]);
  const items = [1, 2, 3, 4, 5, 6, 7, 8];
  const [ChoiceSelection, setSelection] = useState([]);
  const [getCombination, setCombination] = useState(null);
  const [isDisabled, setDisable] = useState(false);

  const SwitchReset = () => {
    setmove(0);
    setPair({ ...getPair, pairs: 0 });
    setMode({ mode: null });
    setGame({ ...getGame, gameover: false });
    setlevel({ ...getlevel, level: "" });
    const elements = document.getElementsByClassName("code-behind");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.visibility = "hidden";
    }
  };
  const Reset = () => {
    setPosition(null);
    setClick(0);
    setSelection([]);
    setIndex([]);
    setTimeout(() => {
      setDisable(false);
    }, 1000);
  };

  const CreateRandomItem = (e) => {
    SwitchReset();
    const value = e.target.name;
    setlevel({ ...getlevel, level: e.target.name });
    setMode({ ...getMode, mode: e.target.value });
    const count = items.length - value;
    let randomItems = items.slice(count);

    randomItems = randomItems.concat(randomItems);

    for (let i = randomItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomItems[i], randomItems[j]] = [randomItems[j], randomItems[i]];
    }
    setCombination(randomItems);
  };

  const CheckSelection = (input_array) => {
    if (input_array[0] === input_array[1]) {
      return true;
    } else {
      return false;
    }
  };

  const switchCard = (e) => {
    const card = e.target.id;
    document.getElementById(card).style.visibility = "visible";
  };
  const HideSelection = (e) => {
    const card = e.target.id;
    setTimeout(() => {
      document.getElementById(card).style.visibility = "hidden";
    }, [1000]);
  };

  const ChangeVisibility = (item) => {
    const card = item.target.id;
    document.getElementById(card).style.visibility = "visible";
    document.getElementById(card).style.disabled = true;
    return;
  };

  const MatchItem = (e) => {
    const moves = getmoves + 1;
    setmove(moves);
    switchCard(e);
    const position = e.target.id;
    let pairs = getPair.pairs;
    if (getPositin !== e.target.id) {
      setIndex([...getIndex, e]);
      setPosition(position);
      let clickcounter = getClick + 1;
      const updated_value = [...ChoiceSelection, e.target.name];
      const currentIndex = [...getIndex, e];
      if (clickcounter === 2) {
        setDisable(true);
        if (CheckSelection(updated_value)) {
          currentIndex.map((e) => ChangeVisibility(e));
          pairs = pairs + 1;
          setPair({ ...getPair, pairs: pairs });
        } else {
          currentIndex.map((e) => HideSelection(e));
        }
        Reset();
      } else {
        setClick(clickcounter);
        setSelection(updated_value);
      }
    }
    console.log(pairs.toString(), getlevel.level);
    if (pairs.toString() === getlevel.level) {
      setGame({ ...getGame, gameover: true });
    }
  };

  return (
    <div>
      {getGame.gameover ? (
        <motion.div
          className="finish-container"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}>
          <motion.div
            className="finish-screen"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}>
            <div>
              <div>Well done!! </div>
              <div>You've matched them all in {getmoves} moves.</div>
              <div>
                Click <span onClick={SwitchReset}>here</span> to play again.
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="game-content"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <div className="game-header">
            <div className="blank"></div>
            <h1>Mix and Match</h1>
            <input
              type="button"
              value="Easy"
              name="4"
              className="easy"
              onClick={CreateRandomItem}
            />
            <input
              type="button"
              value="Medium"
              name="6"
              className="medium"
              onClick={CreateRandomItem}
            />
            <input
              type="button"
              value="Difficult"
              name="8"
              className="hard"
              onClick={CreateRandomItem}
            />
          </div>
          <div className="game-body">
            {getMode.mode ? (
              <div>
                <h1> Mode : {getMode.mode}</h1>
                <h1> Moves : {getmoves} </h1>
                <div className="grid-container">
                  {getCombination &&
                    getCombination.map((item, index) => {
                      return (
                        <div>
                          <motion.div
                            id={index}
                            name={item}
                            className="code-behind"
                            initial={{
                              opacity: 0,
                              rotateY: 0,
                            }}
                            animate={{
                              opacity: 1,
                              rotateY: 360,
                            }}
                            transition={{ duration: 0.25 }}
                            disabled={isDisabled}>
                            <img src={imagesData[item]} alt=""></img>
                          </motion.div>
                          <motion.input
                            type="button"
                            className="grid-item"
                            key={index}
                            id={index}
                            name={item}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ duration: 0.1, delay: 0.05 * index }}
                            onClick={MatchItem}
                            disabled={isDisabled}></motion.input>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100vw",
                  height: "50vh",
                }}>
                <h1>Please select a mode to start.</h1>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default Game;
