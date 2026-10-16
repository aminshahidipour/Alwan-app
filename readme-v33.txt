Alwan Painting v33 - Netlify Functions configuration fix

Added netlify.toml so Netlify CLI/build can detect functions in:
netlify/functions

Expected function:
send-enquiry-sms

ClickSend credentials must remain configured in Netlify environment variables:
CLICKSEND_USERNAME
CLICKSEND_API_KEY
