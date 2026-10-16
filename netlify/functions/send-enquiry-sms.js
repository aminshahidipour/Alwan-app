exports.handler = async function(event) {
  console.log('send-enquiry-sms invoked', event.httpMethod);
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const username = process.env.CLICKSEND_USERNAME;
  const apiKey = process.env.CLICKSEND_API_KEY;
  if (!username || !apiKey) {
    console.error('Missing ClickSend environment variables');
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'SMS service is not configured' }) };
  }

  let data;
  try { data = JSON.parse(event.body || '{}'); }
  catch (_) { return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid request' }) }; }

  const clean = (v, max=160) => String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
  const name = clean(data.name, 80);
  const phone = clean(data.phone, 40);
  const suburb = clean(data.suburb, 80);
  const service = clean(data.service, 80);
  const message = clean(data.message, 220);
  const photoCount = Math.max(0, Math.min(20, Number(data.photoCount) || 0));

  if (!name || !phone || !suburb || !service) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Missing required enquiry fields' }) };
  }

  let body = `New Alwan Painting enquiry\nFull Name: ${name}\nPhone: ${phone}\nSuburb: ${suburb}\nService: ${service}`;
  if (message) body += `\nMessage: ${message}`;
  if (photoCount) body += `\nPhotos: ${photoCount} uploaded - view in Admin`;

  const auth = Buffer.from(`${username}:${apiKey}`).toString('base64');
  try {
    const response = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ source: 'sdk', body, to: '+61404994400' }] })
    });
    const resultText = await response.text();
    console.log('ClickSend response status', response.status);
    if (!response.ok) {
      console.error('ClickSend error', response.status, resultText);
      return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'SMS provider rejected the message' }) };
    }
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('ClickSend request failed', err);
    return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'SMS provider unavailable' }) };
  }
};
