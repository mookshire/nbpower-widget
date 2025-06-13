const fs = require('fs');
const fetch = require('node-fetch');

async function updateOutages() {
  const url = 'https://www.nbpower.com/OpenData/Outages/outages.json';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync('outages.json', JSON.stringify(data, null, 2));
    console.log('✅ outages.json updated successfully!');
  } catch (error) {
    console.error('❌ Error fetching or writing outage data:', error);
    process.exit(1);
  }
}

updateOutages();
