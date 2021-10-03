# Journal Notes UI

Create and track notes from various articles/journal entires. Basic input section for creating article reviews in JSON format, stored using S3 bucket as source with single index.json tracking each individual note JSON file.

## TODO List

- [x] Add page routing
  - [x] Set "src="/bundle.js" to not include "/"
  - [x] Include a `<base>` tag element for configuring `href` attribute
- [x] Update naming convention to be included in NSSD
- [x] Arrow indicators on sort
- [x] Material UI on Form
- [x] Add JSS
- [ ] Upgrade to MUI v5
- [ ] Finish README
- [ ] Upgrade cards to support multiple types
- [ ] Move types to API/storage
- [ ] Create notes-access-api for enforcing auth at API level
- [ ] Fix sort options on mobile/tablet view

### Sample Article JSON

```javascript
{
    "title": String,
    "author": String,
    "description": String,
    "publishDate": xxx,
    "publisher": String,
    "url": String,
    "quotes": [
        {
            "quote ": String,
            "page": Number,
            "line": Number,
            "id": Number
        }
    ],
    "comments": [
        {
        "comment": String,
        "id": Number,
        "createdBy": String,
        "createdDate": xxx,
        "updatedBy": String,
        "updatedDate": xxx
        }
    ],
    "tags": [
        Strings
    ],
    "createdBy": String,
    "createdDate": xxx,
    "updatedBy": String,
    "updatedDate": xxx
}
```

## S3 Bucket Sample Configuration

```
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```
