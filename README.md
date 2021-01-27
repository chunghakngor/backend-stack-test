## Backend Stack Testing

- `npm run start`: build and run `build/index.js`
- `npm run dev`: development
- `npm run build`: build typescript into javascript
- `npm run docker`: docker-compose all the docker images

### Current Stack
  - Node.js
  - Express.js
  - Elastic Search (Cluster)
  - Kibana
  - ~~Postgresql~~
  - ~~Adminer~~
  - MongoDB
  - Mongo Express
  - Typescript
  - Docker

### Testing
  - [ ] ~~Postgresql CRUD~~
  - [ ] MongoDB CRUD
  - [x] Docker Compose 
  - [x] Response time testing with MongoDB
  - [ ] Elastic Search CRUD
  - [ ] Elastic Search Suggestion
  - [ ] Enterprise Search
  - [ ] Kabana Dashboard Testing

### Tests
- [x] GET with 1,000,000 listing = 250ms
- [x] FIND with 1,000,000 listing = 20-25ms
- [x] FIND with 3,500,000 listing = 30ms
- [x] GET with 3,500,000 listing = 800ms
- [x] AGGREGATE LASTEST with 3,500,000 listing = 900-1000ms
- [x] AGGREGATE with 3,500,000 listing = 1000ms (much slower than using find)