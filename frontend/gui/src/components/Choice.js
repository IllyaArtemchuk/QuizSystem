import React from "react";
import { Radio } from "antd";

const Choice = props => {
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };
  return (
    <Radio style={radioStyle} value={props.choiceNumber}>
      {props.choiceContent}
    </Radio>
  );
};

export default Choice;
