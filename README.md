use prop Types and TypeScripthttps://github.com/dzharii/awesome-typescript#built-with-typescript

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

front page - https://www.canva.com/graphs/flowcharts/
for mind maps - https://gojs.net/latest/samples/mindMap.html

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

- [/] - Global
  - [x] - Navbar
  - [x] - Sidebar
    - [/] - Account Card
    - [/] - Menu Items
  - [x] - Search bar
  - [x] - Account Card
- [/] - Tasks Page
- [ ] - Workflow Page
- [ ] - Settings Page

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