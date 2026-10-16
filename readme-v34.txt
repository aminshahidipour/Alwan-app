Alwan Painting v34 - Contact SMS flow fix
- Contact form now calls the Netlify SMS function before Supabase save/upload.
- A Supabase enquiry/storage error can no longer prevent the SMS function from being called.
- Added safe Netlify function logging (no API credentials are logged).
- Existing ClickSend environment variables remain in Netlify; do not put them in website files.
