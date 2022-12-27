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
  - [ ] - configure typescript & nodejs
    - [x] - install all dependencies with typescript types
    - [x] - Learn Declaration files in typescript
    - [/] - Learn Project Configuration
      - [ ] - Learn TSconfig configuration (https://www.typescriptlang.org/docs/handbook/project-references.htmlaa)
  - [ ] - Create file structure

- Serverless Backend (production)

### Database Entities

- User Entity
  - ID
  - email

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

- Task Item
  - ID
  - Title - String
  - Description - String
  - Due Date - String
  - Attachments - Array
  - IsCompleted - Boolean