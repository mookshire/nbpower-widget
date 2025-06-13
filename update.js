const fs = require('fs');
const fetch = require('node-fetch');

async function updateOutages() {
  const url = 'https://www.nbpower.com/OpenData/Outages/OutagesJson';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NBPowerWidget/1.0; +https://github.com/mookshire)'
      }
    });

    const data = await response.json();
    fs.writeFileSync('outages.json', JSON.stringify(data, null, 2));
    console.log('✅ outages.json updated successfully!');
  } catch (error) {
    console.error('❌ Error fetching or writing outage data:', error);
    process.exit(1);
  }
}

updateOutages();
