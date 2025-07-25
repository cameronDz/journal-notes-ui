# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.1 2025-07-19]

### Removed

- removed axios and replaced with fetch
- removed msw from tests and mock fetch

## [3.0.0 2025-07-19]

### Changed

- switched from npm to pnpm
- upgraded eslint to latest version

## [2.32.0 2025-01-28]

### Added

- push any clear button press from a list input text field into the clipboard, mimicing a cut action

## [2.32.0 2024-07-24]

### Changed

- [api] api request broken into chunks of 100 when more than 100 records requested

## [2.31.2 2023-12-01]

### Fixed

- issue with hydration of auth token resolved and implemented correctly

## [2.31.1] 2023-11-25

### Fixed

- base href path for subdomain pathing

### Security

- babel minor version updates

## [2.31.0] 2022-08-20

### Added

- [auth] token hydration every five minutes once signed in

### Changed

- copyright date to current year

### Security

- run audit fix to update vulnerable package

## [2.30.0] 2022-05-29

### Changed

- [sorts] set createDate sort to look at createTime values is createDate sorts results in neutral

## [2.29.0] 2022-05-28

### Added

- notes timestamp with datestamp for edit and create dates

## [2.28.1] 2022-05-08

### Fixed

- axios request headers key name

## [2.28.0] 2022-05-08

## Added

- liveness check interval calls on both storage and auth api

## Changed

- token included as Bearer token in modification requests

## [2.27.1] 2022-04-31

### Fixed

- icon button in books section css

## [2.27.0] 2022-04-30

### Added

- load all tab button for loading all notes
- flag to determine when load all has occured successfully

### Changed

- book toggle entry/view button replaced with switch and UI changes
- book show hide button switched to be flexed inline icon expand/collapse arrows
- sort order of book entries by last created on book page
- upgraded to the latest react linter plugin
- switched divs for sections

### Fixed

- book section prop name for clone function

### Removed

- load all buttons from individual pages

## [2.26.0] 2022-04-24

### Added

- toggle button for seeing resources on books tab

## [2.25.0] 2022-04-24

### Added

- book id to book journal type
- book ID generator on book tab, with button to align book notes
- new linter rules for eslint recommended

### Changed

- edit and clone buttons include on book tab notes
- updated code with new linter rules implemented

## [2.24.0] 2022-04-23

### Added

- books section

### Changed

- flags and options for note and book card

## [2.23.0]

### Added

- load all button on view tab to refresh the notes list and load all notes instead of just the first 25 like on initial load

## [2.22.0]

### Changed

- partially load index of 25 notes, rather than entire notes for perf issues
- warning on note editor page uses Alert instead of red text

## [2.21.0]

### Added

- journal note type PAPER for white papers

### Fixed

- Quotes display from plural to single on

## [2.20.0]

### Added

- options for simple text inputs to trim white space and replace white space with dash
- options for simple list text inputs to be unique values
- note type transformation for articles and book, both from 1.1.0 to 1.1.1 versions

### Changed

- tag inputs for all note types now have trim, replace white space, and unique list option

## [2.19.1] 2022-03-08

### Fixed

- filter section for tags
- published sort order

## [2.19.0] 2022-03-03

### Changed

- set landing page to have clone/edit buttons when secure
- show any note that exists in notes list

## [2.18.0] 2022-02-27

### Added

- basic unit test config and tests for lib files

### Changed

- note list sort order defaults to created date
- sort order now puts null values for name/date in back of ordered list
- code styling and naming convention

## [2.17.2] 2022-02-20

### Fixed

- fix logic for clone notes when moving over to edit mode

## [2.17.1] 2022-02-20

### Fixed

- set cloned notes to be new to add generated id to index

## [2.17.0] 2022-02-19

### Added

- api request abort controllers to avoid memory leak issues

## [2.16.0] 2022-02-19

### Changed

- save button now also downloads JSON version
- JSON download no longer stringifies object before downloading, no longer opens to new page

### Removed

- download note button (not needed since edit functionality exists)

## [2.15.0] 2022-02-19

### Added

- ability to clone general information about a book note

## [2.14.1] 2022-02-13

### Fixed

- issue with displaying new defintions field for articles

## [2.14.0] 2022-02-13

### Changed

- article notes added definition

### Fixed

- updated caniuse package

## [2.13.0] 2022-02-12

### Changed

- internal article list of IDs updated after each create, avoids need to refresh in order to submit multiple articles

### Security

- updated follow-redirects vulnerability

## [2.12.1] 2022-02-09

### Fixed

- set book version correctly when changing types

## [2.12.0] 2022-02-05

### Added

- book type keys for definitions and resource suggestions

## [2.11.5] 2022-01-30

### Fixed

- issue with index loading incorrectly

## [2.11.4] 2022-01-30

### Fixed

- loading bar when app is loading/processing

## [2.11.3] 2022-01-29

### Changed

- show notes without titles

## [2.11.2] 2022-01-29

### Fixed

- index update issue when saving

## [2.11.1] 2022-01-29

### Fixed

- initial loading bar when app is first loading

## [2.11.0] 2022-01-26

### Changed

- when editing existing notes, can switch note type
- state mgmt folder structure

### Fixed

- changing type on editor updates the underlying form payload, not just fields

### Removed

- webpack configuration for dealing with images (none currently in app)

## [2.10.0] 2022-01-23

### Added

- article types edittable through search tab
- auth dialog using mui alert for messaging

### Changed

- clear editor form after edit call has returned
- set card button to say Show Less when expanded

### Fixed

- security vulnerabilities in node packages

## [2.9.1] 2022-01-22

### Fixed

- point to correct update endpoint

## [2.9.0] 2022-01-22

### Added

- edit ability for book notes

## [2.8.1] 2022-01-02

### Changed

- book note view date formatted

### Fixed

- book note view spacing

## [2.8.0] 2022-01-02

### Added

- book note view card specific to book note details

### Changed

- state provider moved to App component instead of index
- configuration changed from JSON to js file with variables

### Removed

- js folder structure removed, all folders and files moved to src
- unused images

## [2.7.1] 2021-12-01

### Fixed

- add journalType for personal interviews journal forms

## [2.7.0] 2021-11-27

### Added

- journal form type for personal interviews

## [2.6.0] 2021-11-26

### Added

- article form key for read date

## [2.5.0] 2021-11-26

### Added

- article form key for pages/volume
- form type key for version of type

## [2.4.5] 2021-11-26

### Fixed

- Article from added "publisher" key back

## [2.4.4] 2021-10-24

### Fixed

- Navbar overflow/transparency issue on navbar when on the form page

## [2.4.1] 2021-10-02

### Fixed

- Base href path to have trailing slash

## [2.4.1] 2021-10-02

### Added

- Items in README todo list

### Changed

- Editor type name labels only capitalize first letter
- Set base URL in index template
- Naming for title of pages

## [2.4.0] 2021-10-02

### Added

- Form types for Audiobook, Books, Online videos, and Video games
- Set new form types to be selectable in options

## [2.3.0] 2021-10-02

### Added

- Podcast input form option and input
- Radio button for selecting form type on editor page
- Keys to journal type article for create, update, and jounral type
- Keys for how to generate specific input types

### Changed

- Editor form cleared when auth token cleared
- Code organizational structure

## [2.2.1] 2021-09-25

### Fixed

- Set ID logic and add as hidden field

## [2.2.0] 2021-09-25

### Added

- Set of types for inputs, journals, and forms

### Changed

- Replaced hard coded input fields with dynamic input field container for handling multiple forms

### Fixed

- Security vulnerability npm package

## [2.1.0] 2021-09-18

### Added

- Credential login dialog in icon button located in left nav

### Changed

- Valid login token required for enter journal note

## [2.0.2] 2021-09-12

### Changed

- Progress bar set to match color palette

## [2.0.1] 2021-09-11

### Changed

- Use new storage endpoint that matches naming convention
- Update browser tab title to match name

## [2.0.0] 2021-09-11

### Changed

- Change app name from article notes to journal notes to be more generic

## [1.17.2] 2021-09-11

### Fixed

- Update index list when article uploaded
- Linter issues for exhaustive dependencies

## [1.17.1] 2021-09-10

### Fixed

- Load indicator shows until all articles finish loading on initial launch instead of stopping once list of articles is added

## [1.17.0] 2021-09-10

### Changed

- Webpack Major version bump for security vulnerabilities

### Fixed

- Import JSON for entire block

## [1.16.0] 2021-09-10

### Changed

- Migrated to new storage APIs
- Use uuid instead of timestamp for ID

## [1.15.0] 2021-09-08

### Added

- Hashing in routing paths

### Changed

- Major version bump to React framework

## [1.14.0] 2021-09-01

### Added

- Left Navigation side bar
- View of all articles without filter

### Changed

- Replaced top navbar with tabs with left side nav bar with icon buttons

### Fixed

- Update versions for dependencies with security issues

### Removed

- Top Tab Navbar removed

## [1.13.0] 2021-03-06

### Added

- Filter function to filter article List by tags
- Sticky footer with name and version number
- Clear button for Comments, Quotes, and Tags when inputs have value

### Changed

- Sort buttons on List tab changed to Radio button and Switch inputs from Material UI
- Input section buttons to all be single, word with title, same size, centered, with 'Upload' as first option
- Clicking Remove for Comments, Quotes, and Tags will load the removed item value into the empty input field
- Article note form is cleared after successful upload
- Show 'No Content' message only when both Quotes and Comments for an article is empty
- Header and load indicator bar now stretch full screen width
- Disable article note form inputs when processing form requests

### Fixed

- Expected alpha order sort for title sort now sorts

### Removed

- 'Remove' button for Comments, Quotes, and Tags when inputs have value

## [1.12.2] 2021-02-14

### Changed

- Responsiveness on input puts inputs all full screen with at md

## [1.12.1] 2021-02-10

### Added

- Base element in index.html file

### Changed

- Updated project name
- Pathing for project root from '/' to ''

### Fixed

- Upload issue where uploading multiple articles in a row would not correctly update index

## [1.12.0] 2021-01-03

### Added

- Display latest article overview card on landing tab
- Enter key feature for Comments, Quotes, and Tag input fields
- Updating index after succesful article upload
- Favicon to src directory included in build artifacts
- Webpack copy module for moving images and favicon on build

### Changed

- Using new Heroku API deploy URLs - using s3-acces-api@v1.0.1
- Moved Article Resource Added display to top section of card
- Disable form buttons while processing an article upload
- Styling on top of article card, added both dates to be included in compressed mode
- Updated babel, eslint, react, and webpack minor versions
- Images moved to assets directory

### Fixed

- Issue with parsing payload on download/upload of article note
- Multiline textarea label and lines overlapping (happening on Comments, Quotes, and Description)

### Removed

- None error console logs in browser

## [1.11.0] 2020-09-27

### Changed

- Using Material UI inputs for form in creating article overview
- Set article preview to always display, and be open by default on preview

## [1.10.0] 2020-09-26

### Added

- Indicators for which sort is being used and sort order
- Webpack configuration for loading files/images

### Removed

- Repeated text in sort buttons

## [1.9.1] 2020-09-25

### Fixed

- Styling issue with card max height

## [1.9.0] - 2020-09-24

### Added

- Display option to preview card on input screen
- Loading indicator for loading article summaries

### Changed

- Initial tab is article display tab
- No longer displays articles that has no title or comments/quotes
- Updated publisher information on card display for cleaner look when information is missing

### Fixed

- Update vulnerable package version for dependencies: http-proxy, node-force, serialize-javascript
- Date sort order for invalid dates

## [1.8.1] - 2020-03-19

### Fixed

- Update minimist package version bump per GitHub warning

## [1.8.0] - 2020-03-19

### Changed

- Updated minor and patch version of dependencies

### Fixed

- Added props validation in grid component
- Set console out puts all to be logs
- Updated vulnerable version of minimist package

## [1.7.1] - 2020-01-29

### Changed

- Updated Webpack version

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
