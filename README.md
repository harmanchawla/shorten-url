# shorten-url
A service to validate and shorten a given URL

## Design, Stack & Features

### Design
- The app has a simple design with an input field and a data table.
- The data table shows the URLs shortened by the user in the same session. 
- If a user navigates to the page with a shortened link, it redirects to the original link. 
- User is allowed to quickly copy previously defined links.
- This information is lost when the user reloads the page.
- The links can be used forever!

### Stack
- Frontend: React, UI with Material UI
- Data Storage: Google Firestore | A collection has documents with the short URL as the name and original URL is a record in the document


### Features
- Hosted and live web service which can be used
- Future safe with 9-character base64 literal
- Saves and display URLs shortened in the same session



## Shortcomings
- The code is a bodge, at best. 
- Components can be further broken down to make it more versatile
- User sessions can be added to preseve the shorten URLs
- Analytics can be added to the URL. The database is structure to allow that.
