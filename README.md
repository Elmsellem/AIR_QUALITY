# AIR QUALITY

### env
NodeJs version 16.*

### Configuration

copy .env.example to .env in project root dir
```bash
cp .env.example .env
```

change IQAIR_KEY variable with you api key

install dependencies
```bash
npm i
```

initialiaze sqlite schema (the data is stored in file data/pollution.db)
```bash
npm run initdb
```

run tests
```bash
npm run test
```

start server
```bash
npm start
```

### APIS

http://localhost:3005/pollution/current

method: GET
query params:
- lat: float number (exp: lat=48.856613)
- lon: float number (exp: lon=2.352222)

http://localhost:3005/pollution/most_polluted_datetime

method: GET

### CRON JOB

The result of the cron job is shown in the output
