ALWAN PAINTING v35

Changes:
- Customer enquiry field now displays Full Name.
- Enquiry photos upload to the private Supabase bucket ENQUIRY-IMAGES.
- Only the object path is stored in the enquiries table (not a public URL).
- Admin opens enquiry photos using a temporary signed URL while authenticated.
- SMS notification label changed to Full Name.

Supabase policies already configured by the site owner:
- public INSERT on ENQUIRY-IMAGES
- authenticated SELECT on ENQUIRY-IMAGES

Deploy the complete package so the existing Netlify SMS function remains included.
