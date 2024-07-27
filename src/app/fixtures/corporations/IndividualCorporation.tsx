
interface IndividualCorporationProps {
  name: string
}

const IndividualCorporation = (props : IndividualCorporationProps) => {
  return <div>Individual corporation: {props.name}</div>;
};

export default IndividualCorporation;
