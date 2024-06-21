## Approach
Based on the requirements outlined in the Specs-with-commends.md file, the following approach is proposed.
### Overview
The solution seems to best served with a responsive web app and node server that runs on a local network.
This will allow for cross platform access and easy updates.
The app will be able to run on any device with a web browser and the node server can run cross platform.
As the data is not shared across locations (yet), the app will be able to run on a local low footprint database.
From the requirements it seems that offline mode may be required at some point so the app will need to be able to run without internet access. Syncing data when online again is also a potential requirement but not a must have at this moment.
There does not seem to be a need for separate apps for front of house and back of house staff. To simplify, a single app should be able to handle both.
Of importance is the ease of use of the app in different environments.
Installation & maintenance of the server app is an easy to overlook requirement but is pivitol to the acceptance of the app by the hardworking staff in all locations.
The reporting feature is a nice to have but not a must have. The app should be able to export data to a spreadsheet for further analysis.

### Way of working
The approach to creating the project will involve taking the features, ideally by order of importance, and creating a simple version of the feature. This will allow for a working version of the app to be created quickly and then iterated on. Priority will be given to the identified must have features.
If time runs out, the priority will be to have a working version of the app that can be used by the staff. This will allow for the staff to start using the app and for feedback to be gathered. This feedback can then be used to improve the app in future versions.

### Data Model
The data model will try to stick as closely as possible to the data provided in the example data. This will allow for easy import of the data and easy understanding of the data model by the staff.
It will also faciliate the export of data to a spreadsheet for management reporting.


### Tech stack
The tech stack will be as follows (subject to change as the project progresses):
- pnpm. Package manager. Faster than npm and yarn.
- Node.js. Cross platform server. We could use a static site but the server will allow for more flexibility in the future and hide db connection details. Also, there will be dragons, having a server will allow more flexibility to resolve issues which the static site may not be able to handle.
- SvelteKit. Front end and back end. Using this exercise to learn svelte.
- TypeScript. Type safety (comes with svelte kit setup).
- SQLite. Local database. Easy to use and setup. Will allow for easy data import and export. Powerfull enough for the requirements.
- TailwindCSS. Styling. Easy to use and setup. Will allow for quick styling of the app.
- TailwindUI. Components. Will allow for quick setup of the app and responsive design.
- Vitest. Testing.
- PM2. Monitoring and auto rebooting.
- NGINX. Reverse proxy.
- install script. Shell script.


### Initial setup
- add gitignore
- add pnpm
- scaffold vitest
- scaffold sveltekit
- scaffold sqlite
- scaffold tailwindcss
- scaffold tailwindui
- scaffold install script. why all the scaffolding? To get the project up and running quickly and to reduce the variables that need to be checked to confirm the full setup is working. This will allow for a quicker start to the project and allow for more time to be spent on the actual development of the app.
- create db, tables and seed data
- create basic app shell. Home page, choose staff button, main functions buttons
- change user page
- tests for change user action
- accept delivery page
- tests for accept delivery action
- sell item page
- tests for sell item action
- take stock page
- tests for take stock action