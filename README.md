# Logs App #

Create and track logs for various personal activities. Added a basic input section for creating article reviews in JSON format, and downloading that article locally.

## TODO List ##
- [ ] Add JSS
- [ ] Add page routing
- [ ] Finish README

### Sample Article JSON ###
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

## S3 Bucket Sample Configuration ##
```
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```
