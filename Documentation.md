## _Exercise_

Steps used to create frontend (react js):
- Installing packages using yarn install.
- Creating the folder structure.
- Adding RepoTable file in views directory.
- Creating Api directory for common utilities for api calls.
- Adding api calls to get repository data from node backend.
- Adding api call to fetch mark down details.
- Adding basic table view in RepoTable file to display all the repo in table.
- Adding dropdown in table in language column to filter out the records based on language.
- Adding a modal to display selected info in modal.
- Adding data of markdown in model.
- Handling the component when no data found in markdown api.
- Adding loader in assets directory.
- Adding loader in component loading.
- Run project using "npm start".

Steps used to create backend api (node):
- Installing dependencies using npm install command.
- Creating necessary directories like services.
- Adding the logical part to repoDetails.services file in services directory.
- Adding function to fetch repository details from existing data.json file.
- Adding a fuction to fetch the repository data from remote url using axios package.
- Creating function call of both the function in routes, and merging response from both the api.
- Returning the respose to client.
- Run project using "npm start".
