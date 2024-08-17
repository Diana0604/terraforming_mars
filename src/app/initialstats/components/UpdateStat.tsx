import { HasChangedContext } from "@/contexts/HasChangedContext";
import { Button, Col } from "antd";
import { MouseEventHandler, useContext } from "react";

interface UpdateStatProps {
  handleUpdate: MouseEventHandler<HTMLElement>;
}

const UpdateStat = (props: UpdateStatProps) => {

  const {hasChanged, setHasChanged} = useContext(HasChangedContext);

  const onClick : MouseEventHandler<HTMLElement>= (event) =>{
    props.handleUpdate(event);
    setHasChanged(false);
  }
  
  return (
    <Col className="mr-5">
      <Button disabled={!hasChanged} onClick={onClick} type="primary">
        Update
      </Button>
    </Col>
  );
};
export default UpdateStat;

