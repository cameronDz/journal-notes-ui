# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Set console out puts all to be logs

## [1.7.1] - 2020-01-29
### Fixed
- Set HTML meta tag to adjust for mobile views

## [1.7.0] - 2020-01-29
### Added
- Using new Heroku API endpoint for uploading new article summaries
- Using editorconfig file for easier file formatting

### Changed
- Getting article list index through API instead of directly from S3

### Fixed
- Package security vulnerability flagged by GitHub

## [1.6.1] - 2019-11-01
### Fixed
- Added meta tag to index html for correct encoding format

## [1.6.0] - 2019-10-31
### Added
- Redux for global state management

### Changed
- All axios calls to S3 moved to action/reducer and payloads stored in redux

### Fixed
- Inline style formatting
- Added item to MUI Grid components
- Issue with p tags containing div tags in article component
- Formatting issued and prop validation caught by linter

### Removed
- Extra directory layer for components with no extra state or children components
- Article JSONs in assets directory that are now in S3 and maintained in own repo

## [1.5.0] - 2019-10-28
### Added
- Linter dependencies with script for running
- Deploy script for deploying to S3 bucket

### Changed
- Formatting changes as par new linter

### Fixed
- Added props validation in several components missing

## [1.4.0] - 2019-10-27
### Added
- Webpack builds for different environments

### Changed
- Fresh install of all packages/dependencies

## [1.0.3] - 2019-08-25
### Added
- Added the reverse sort orders for articles; titles, create date, and publish date.

### Changed
- Clicking the sort of the articles that is already selected will invert the order of the sort.

## [1.0.2] - 2019-08-25
### Changed
- Added file extension to change log.

## [1.0.1] - 2019-08-25
### Added
- A landing page component for explaining application to user.
- Component for displaying articles overviews from JSON objects.
- Card component from Material UI to wrap article components.
- Navigational Tabs header from Material UI with 3 sections; home, articles, and input.
- Section for displaying all articles in cards with sort options.
- Ability to sort articles by; creation date, publish date, and title.
- Created an index for data to import static article JSON files.
- Added 7 new articles to static assets directory.
- Started change log.
- Added TODO list in README.

### Changed
- Application now use navigation tabs.
- Set input component to use hooks.
- Added clear payload option for starting new article in Input component.
- Set ability to generate date String as global function for application.

### Removed
- Goals and TODO data from app.

## [1.0.0] - 2019-08-14
- Initial commit.
