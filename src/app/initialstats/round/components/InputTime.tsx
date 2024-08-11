import { Col, InputNumber } from "antd";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

interface InputTimeProps {
  value: number;
  onChange: (value: number | null) => void;
}

const InputTime = (props: InputTimeProps) => {
  //ref for the click outside function
  const ref = useRef<HTMLDivElement>(null);

  //value and setter
  const [value, setValue] = useState<number>(props.value);

  //handle Enter is triggered on enter and on click outside
  const handleEnter = () => {
    props.onChange(value);
  };
  useClickOutside(ref, handleEnter);

  //monitor changes in props
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Col ref={ref} style={{ marginRight: "5px" }}>
        <InputNumber
          value={value}
          onChange={(value) => setValue(Number(value))}
          onPressEnter={handleEnter}
          style={{ width: "60px" }}
        />
      </Col>
    </>
  );
};

export default InputTime;
