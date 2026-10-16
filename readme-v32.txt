Alwan Painting v32 — ClickSend SMS notification

What changed
- Contact / Request a Quote still saves the enquiry and uploaded photos to Supabase.
- After a successful save, the site calls a Netlify Function.
- The Netlify Function sends an SMS notification to 0404 994 400 through ClickSend.
- ClickSend credentials stay server-side in Netlify environment variables and are not exposed in index.html.
- SMS includes customer name, phone, suburb, service, message and the number of uploaded photos. Photos remain available in Admin.

Required Netlify environment variables
- CLICKSEND_USERNAME
- CLICKSEND_API_KEY

Both have already been configured by the site owner. Do not put the API key in any HTML/JavaScript file.

Deployment
Deploy this ZIP to the existing Netlify site. Netlify will detect netlify/functions/send-enquiry-sms.js automatically.

Test
After deployment, submit one test enquiry from the live Contact Us form. Confirm:
1) enquiry appears in Admin,
2) uploaded photos appear in Admin,
3) SMS arrives at 0404 994 400.

Note: ClickSend charges apply to SMS messages. A long customer message may cause the notification to span multiple SMS segments.
