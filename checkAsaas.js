require('dotenv').config({path: '.env.local'});
fetch('https://api.asaas.com/v3/payments?limit=1', {
  headers: {
    'access_token': process.env.ASAAS_API_KEY
  }
}).then(r => r.json()).then(d => console.log(JSON.stringify(d.data[0], null, 2))).catch(console.error);
