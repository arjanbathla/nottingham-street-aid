## NottsStreetAid

Recommended Development Setup (macOS)

Using Visual Studio Code (VS Code) with its integrated terminal for the most reliable development setup on macOS is recommended.
## 1. What to download
Install Visual Studio Code: https://code.visualstudio.com/
## 2.Ensure you can run mongod and npm in your VS Code terminal
Install Node.js: https://nodejs.org/
Install MongoDB Community Edition: https://www.mongodb.com/docs/manual/installation/

Which can also be done through terminal by running these lines :
# * Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL 
https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# * Install Node.js
brew install node

This will install both node and npm (Node Package Manager)
# * Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community@7.0
# * Start MongoDB Service
brew services start mongodb-community@7.0

## 3. Start Local MongoDB Server
In the terminal:
cd Backend
mongod --dbpath db
This starts a local MongoDB server and points it to the db folder for storage.
## 4. Restore from Mongo Atlas
Use the following if you want to restore data from a remote backup:
mongodump --uri mongodb+srv://nsacluster.mmxfvp1.mongodb.net/test --username=nsadevs --password=removeQvo5iCU2pi7yPqjM -vvvvv
mongorestore --db test dump/test
## 5. Start Backend Server
cd Backend
export SECRET=your-secret-key
export PORT=8999
export MONGO_URI=mongodb://localhost:27017/dev
npm install
npm run dev
## 6. Start Frontend
cd Frontend
export VITE_API_HOST=http://localhost:8999
npm install
npm run dev

## 7.Accessing MongoDB Locally (GUI)

To view your local MongoDB data in a graphical interface:
Download and install MongoDB Compass: https://www.mongodb.com/try/download/compass
Open MongoDB Compass
Connect using the URI:
mongodb://localhost:27017
You will see the list of databases including used in this project
