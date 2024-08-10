import { Button, Col } from "antd";
import { MouseEventHandler } from "react";

interface UpdateStatProps {
  handleDelete: MouseEventHandler<HTMLElement>;
}

const DeleteStat = (props: UpdateStatProps) => {
  return (
    <Col className="mr-5">
      <Button danger onClick={props.handleDelete} type="primary">
        Delete
      </Button>
    </Col>
  );
};
export default DeleteStat;
