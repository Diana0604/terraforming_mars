import { Button, Col } from "antd";
import { MouseEventHandler } from "react";

interface UpdateStatProps {
  handleUpdate: MouseEventHandler<HTMLElement>;
}

const UpdateStat = (props: UpdateStatProps) => {
  return (
    <Col className="mr-5">
      <Button onClick={props.handleUpdate} type="primary">
        Update
      </Button>
    </Col>
  );
};
export default UpdateStat;
