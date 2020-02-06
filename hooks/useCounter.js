import React, { useState, useEffect } from "react";
import typeDef from "../typeDef";

const useCounter = (
  countDirection = true,
  intialValue = 0,
  timeOutFunc = () => {}
) => {
  const [value, setValue] = useState(intialValue);
  const [timerId, setTimerId] = useState(null);

  const start = () => {
    const timerId = setInterval(inc, 1000);
    setTimerId(timerId);
  };

  const stop = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const clearCounter = () => {
    clearInterval(timerId);
    setValue(intialValue);
    setTimerId(null);
  };

  const timeOut = () => {
    clearInterval(timerId);

    timeOutFunc();
    setTimerId(null);
  };
  const getStatus = () => {
    if (timerId === null) {
      return typeDef.STOP;
    } else {
      return typeDef.PROGRESS;
    }
  };

  const inc = () => {
    setValue(prevCount =>
      countDirection === true ? prevCount + 1 : prevCount - 1
    );
  };

  return { value, setValue, start, stop, clearCounter, timeOut, getStatus };
};

export default useCounter;
