### Resources

- For mind maps - https://gojs.net/latest/samples/mindMap.html

- Awesome typescript - https://github.com/dzharii/awesome-typescript#built-with-typescript

- Front page - https://www.canva.com/graphs/flowcharts/

- Real World App - https://codebase.show/projects/realworld?category=frontend&language=typescript

### Features

- User Account Features
- CRUD functionality for todo
- Change Order by dragging each todo
- Search feature
- Detail Modal
    - Due date
    - Rich text editor for notes
    - Attach image items
    - create workflows

Add Later
    - share workflows with others
    - add tags for each todo
    - send email to user end of every month with InSights
    - send summary email to user about tasks

- Workflow - App development project
  - List - UI design
    - Todo Items
  - List - Frontend development
    - Todo Items
  - List - Frontend Q/A
    - Todo Items
  - List - Backend development
    - Todo Items
  - List - Backend Q/A
    - Deploy

### TODO

- [x] - model database with required entities and properties

- Client
  - [x] - Global
    - [x] - Navbar
      - [ ] - Burger bar toggle
    - [x] - Sidebar
      - [x] - Account Card
      - [x] - Menu Items
    - [x] - Search bar
    - [x] - Account Card
  - [ ] - Tasks Page
    - [ ] - page heading
    - [ ] - progress bar
    - [ ] - todo elements
    - [ ] - Add List form
    - [ ] - Add Todo form
  - [ ] - Workflow Page
  - [ ] - Settings Page

- Express Backend
  - [x] - configure typescript & nodejs
  - [x] - Create file structure
  - [/] - Setup error handling middleware
  - [/] - Design routes for Entries
    - [x] - Create new user pool
    - [x] - User Routes
      - [x] - /users/signUp     - POST    - Create new user record
      - [x] - /users/login      - POST    - Login user
      - [x] - /users/verifyAuth - GET     - Verify authentication
      - [x] - /users/:id        - GET     - Get single user record
      - [x] - /users/:id        - PUT     - Update user record
      - [-] - /users/:id        - DELETE  - Delete user record
      - [-] - /users            - GET     - Get all user records (admin)
    - [x] - Workflow Routes
      - [x] - /workflows           - POST    - Create new workflow record
      - [x] - /workflows/:id       - PUT     - Update single workflow
      - [x] - /workflows/:userId   - GET     - Get all workflows related provided user ID
      - [x] - /workflows/:id       - GET     - Get single workflow record
      - [x] - /workflows/:id       - DELETE  - Delete single workflow record
    - [ ] - Task Route
      - [ ] - /tasks/:workflowId              - POST    - Create new task record for provided workflow ID
      - [ ] - /tasks/workflows/:workflowId    - GET     - Get all tasks related to provided workflow ID
      - [ ] - /tasks/:id                      - GET     - Get single task
      - [ ] - /tasks/:id                      - PUT     - Update task
      - [ ] - /tasks/:id                      - DELETE  - Delete task
    - [ ] - Task Item Route
      - [ ] - /taskItems/:taskId              - POST    - Create new TaskItem record for provided task ID
      - [ ] - /taskItems/tasks/:tasksId       - GET     - Get all taskItems records by provided task ID
      - [ ] - /taskItems/:id                  - GET     - Get single taskItem record
      - [ ] - /taskItems/:id                  - PUT     - Update single taskItem record
      - [ ] - /taskItems/:id                 - DELETE  - Delete task item record
  - [ ] - Make sure to authorize endpoints with current logged in user
  - [ ] - Draw markdown diagram to explain the authentication flow
  - [ ] - Learn to organize typescript project (see how other projects / libraries are architecture)

- [ ] - Follow Node Best Practices - https://github.com/goldbergyoni/nodebestpractices
- [x] - Go through CodingGarden starter TS API
- [ ] - https://github.com/airbnb/javascript#control-statements - adapt a JS style guide
- [ ] - Move all dev dependencies to devDependencies
- [ ] - Learn JEST testing

- [ ] - Learn Generic interfaces - https://chat.openai.com/chat/9270271f-2d83-4836-b3a6-0920522293f9
- [ ] - Recap the syntax while reading lib code

  - [x] - Fix Vulnerability - check explicitly for access token expired error when refreshing the accessToken with refreshToken
  - [ ] - Fix Vulnerability - older expired access tokens canont be used to get new tokens
    - Read token based auth guide

#### Code Clean up and restructure

- [ ] - Review open source project and restructure the typescript code

- [x] - Authentication
  - [x] - Cognito user pool
    - [x] - Setup new user pool in AWS (basic email and password)
    - [x] - Configure Login / SignUp / Authorization
      - [x] - SignUp
        - [x] - SignUp to cognito
        - [x] - Confirm Account
        - [x] - Create User attribute record for the user
        - [x] - Create Initial stuff records and link with logged in user
        - [x] - Test
      - [x] - SignIn
        - [x] - Provide user name and password and login
        - [x] - Get user details
        - [x] - Extract tokens from cookies
        - [x] - Return new cookies
        - [x] - Test
      - [x] - Authorization
      - [x] - Verify Authentication
    - [ ] - Enable Federated login later
  - [ ] - Handle forgot password manually (by administrative API)
  - [ ] - Handle SignUp Account confirmation manually (by administrative API)

- Compare your code with other well written code
- Go through TS docs again and learn every bit

- Serverless Backend (production)

### Database Entities

- User Entity
  - ID
  - subId - String (Cognito FK)
  - email - String

- Workflow Entity
  - ID
  - Name - String
  - Tasks - Array[ID, ID] (FK)
  - User - ID (FK)

- Task Entity
  - ID
  - Name - String
  - Key - number
  - KeyTo - number
  - KeyFrom - number
  - TaskItems - Array[ID, ID] (FK)

- Task Item Entity
  - ID
  - Title - String
  - Description - String
  - Due Date - String
  - Attachments - Array
  - IsCompleted - Boolean