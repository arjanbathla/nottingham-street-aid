# NottsStreetAid

## Development Setup

### 1. Start Local Mongo Server
```bash
cd Backend
mongod --dbpath db
```

### 2. Mongo Atlas
```bash
mongodump --uri mongodb+srv://nsacluster.mmxfvp1.mongodb.net/test --username=nsadevs --password=removeQvo5iCU2pi7yPqjM -vvvvv
mongorestore --db test dump/test
```

### 2. Backend
```bash
export SECRET=xxxx
export PORT=8999
export MONGO_URI=mongodb://localhost:27017/dev
npm run dev
```

### 3. Frontend
```bash
export VITE_API_HOST=http://localhost:8999
npm run dev
```