# Journal Notes UI

Create and track notes from various articles/journal entires. Basic input section for creating article reviews in JSON format, stored using S3 bucket as source with single index.json tracking each individual note JSON file.

## TODO List

- [ ] Upgrade to MUI v5
- [ ] Finish README
- [ ] Upgrade cards to support multiple types
- [ ] Move types to API/storage
- [ ] Move large dependencies (react-dom, material-ui) to assets S3 bucket
- [ ] Fix sort options on mobile/tablet view
- [x] Create notes-access-api for enforcing auth at API level
- [x] Add page routing
  - [x] Set "src="/bundle.js" to not include "/"
  - [x] Include a `<base>` tag element for configuring `href` attribute
- [x] Update naming convention to be included in NSSD
- [x] Arrow indicators on sort
- [x] Material UI on Form
- [x] Add JSS

## Deployment

This app is configured to deploy to GitHub Pages automatically via GitHub Actions when changes are pushed to the `master` branch.

### Manual Deployment

To deploy manually:

```bash
pnpm run deploy
```

This will build the production version and deploy it to the `gh-pages` branch.

### GitHub Actions Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
1. Runs tests
2. Builds the production version
3. Deploys to GitHub Pages

The app will be available at: `https://cameronDz.github.io/journal-notes-ui/`

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
