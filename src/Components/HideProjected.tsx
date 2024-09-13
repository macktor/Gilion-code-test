import { useDataContext } from "../context/DataContext";

const HideProjected = () => {
  const { toggleProjected, hideProjected } = useDataContext();
  return (
    <button onClick={toggleProjected}>{`${
      hideProjected ? "Show" : "Hide"
    } Forecast Data`}</button>
  );
};

export default HideProjected;
