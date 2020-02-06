import React, { useState } from "react";

const useFlag = (intialValue = false) => {
  const [value, setValue] = useState(intialValue);
  const toggle = () => {
    if (value === true) {
      setValue(false);
    } else {
      setValue(true);
    }
  };
  return { value, toggle, setValue };
};

export default useFlag;
