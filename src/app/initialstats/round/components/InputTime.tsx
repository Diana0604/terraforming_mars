import { message, Col, InputNumber } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { HasChangedContext } from "@/contexts/HasChangedContext";

interface InputTimeProps {
  value: number;
  onChange: (value: number | null) => void;
}

const InputTime = (props: InputTimeProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "press Enter to allow update",
      className: "custom-class",
      style: {
        marginTop: "30vh",
        marginLeft: "300px",
        position: "absolute",
        zIndex: "-1",
      },
    });
  };

  //ref for the click outside function
  const ref = useRef<HTMLDivElement>(null);

  //has changed
  const { setHasChanged } = useContext(HasChangedContext);

  //value and setter
  const [value, setValue] = useState<number>(props.value);

  //handle Enter is triggered on enter and on click outside
  const handleEnter = () => {
    if (value != props.value) {
      props.onChange(value);
      setHasChanged(true);
    }
  };
  useClickOutside(ref, handleEnter);

  //monitor changes in props
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Col ref={ref} style={{ marginRight: "5px" }}>
        {contextHolder}
        <InputNumber
          value={value}
          onChange={(value) => {
            const newValue = Number(value);
            if (newValue < 0 || isNaN(newValue)) return;
            setValue(newValue);
            success();
            setHasChanged(false);
          }}
          onPressEnter={handleEnter}
          style={{ width: "60px" }}
        />
      </Col>
    </>
  );
};

export default InputTime;
