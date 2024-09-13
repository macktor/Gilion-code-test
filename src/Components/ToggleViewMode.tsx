import { useDataContext } from "../context/DataContext";

const ToggleViewMode = () => {
  const { viewMode, setViewMode } = useDataContext();
  const toggleViewMode = () => {
    if (viewMode === "marketing_spend") {
      setViewMode("new_customers");
    } else if (viewMode === "new_customers") {
      setViewMode("marketing_spend");
    }
  };
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={toggleViewMode}>
        {viewMode === "new_customers"
          ? "Show Marketing Spend"
          : "Show New Customers"}
      </button>
    </div>
  );
};

export default ToggleViewMode;
