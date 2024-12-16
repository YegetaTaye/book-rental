// Helper function to safely format currency values
const formatCurrency = (value) => {
  return typeof value === "number" ? `${value.toFixed(2)} Birr` : "0.00";
};

export default formatCurrency;
