const fetch = require("node-fetch");
const fs = require("fs");

async function updateOutages() {
  const url = "https://www.nbpower.com/OpenData/Outages/OutagesJson";
  const response = await fetch(url);
  const data = await response.json();

  const grouped = data.reduce((acc, item) => {
    const region = item.Region;
    if (!acc[region]) {
      acc[region] = { customers: 0, outages: 0 };
    }
    acc[region].customers += item.CustomersAffected;
    acc[region].outages += 1;
    return acc;
  }, {});

  const result = Object.entries(grouped).map(([region, info]) => ({
    region,
    customers: info.customers,
    outages: info.outages,
  }));

  fs.writeFileSync("outages.json", JSON.stringify(result, null, 2));
  console.log("✅ outages.json updated");
}

updateOutages();
