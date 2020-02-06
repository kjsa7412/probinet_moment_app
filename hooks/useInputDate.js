import React, { useState } from "react";

const useInputDate = ({ yy, mm, dd }) => {
  const [value, setValue] = useState({ yy, mm, dd });

  const yearOnChange = text => {
    /// 우선 object 복사
    const result = Object.assign({}, value);
    result.yy = text;
    setValue(result);
  };

  const monthOnChange = text => {
    /// 우선 object 복사
    const result = Object.assign({}, value);
    result.mm = text;
    setValue(result);
  };

  const dayOnChange = text => {
    /// 우선 object 복사
    const result = Object.assign({}, value);
    result.dd = text;
    setValue(result);
  };

  const getValue = () => {
    let result = value.yy;

    if (value.mm !== undefined && value.mm !== "") {
      result += "-" + value.mm;
      if (value.dd !== undefined && value.dd !== "") {
        result += "-" + value.dd;
      }
    }

    return result;
  };

  const wholeOnChange = ({ yy, mm, dd }) => {
    setValue({ yy, mm, dd });
  };

  return {
    value,
    yearOnChange,
    monthOnChange,
    dayOnChange,
    wholeOnChange,
    setValue,
    getValue
  };
};

export default useInputDate;
