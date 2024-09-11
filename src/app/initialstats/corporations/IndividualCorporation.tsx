import { Col, Input, Row } from "antd";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import { InitialResourcesContext } from "../../../contexts/InitialResourcesContext";
import { InitialCorporationContext } from "./InitialCorporationContext";
import { InitCorporation, Resource } from "@/types";
import { updateFromResources } from "../initialstats.helpers";
import EditResourceStats from "../components/EditResourceStats";
import UpdateStat from "../components/UpdateStat";
import DeleteStat from "../components/DeleteStat";
import { HasChangedContext } from "@/contexts/HasChangedContext";

const IndividualCorporation = (props: InitCorporation) => {
  const { setHasChanged } = useContext(HasChangedContext);

  //get resources list from context
  const { resources } = useContext(InitialResourcesContext);
  //get deleters and updaters from context
  const { deleteCorporation, updateCorporation } = useContext(
    InitialCorporationContext
  );

  //create local corporation objects and setters
  const [corporationName, setCorporationName] = useState<string>(props.name);
  const [corporationResources, setCorporationResources] = useState<Resource[]>(
    props.resourcesOwned
  );

  //when resources are updated, update also locally
  useEffect(() => {
    updateFromResources(
      resources,
      corporationResources,
      setCorporationResources
    );
  }, [resources, props.resourcesOwned]);

  //on corp name change -> update local name
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasChanged(true);
    setCorporationName(event.target.value);
  };

  //on update send -> request to context
  const handleUpdate = () =>
    updateCorporation(props.name, {
      ...props,
      name: corporationName,
      resourcesOwned: corporationResources,
    });

  return (
    <>
      <Row>
        <Col className="mr-5">Corporation Name</Col>
        <Col className="mr-5">
          <Input defaultValue={corporationName} onChange={handleNameChange} />
        </Col>
      </Row>

      <EditResourceStats
        title="Initial Resources"
        resources={resources}
        resourceList={corporationResources}
        setter={setCorporationResources}
      />

      <Row>
        <UpdateStat handleUpdate={handleUpdate} />
        <DeleteStat
          handleDelete={() => {
            deleteCorporation(props.name);
          }}
        />
      </Row>
    </>
  );
};

export default IndividualCorporation;
