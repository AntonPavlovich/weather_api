# Read this for project usage!

## To generate migrations
```sh
npm migration:generate -- <migration name>
```
## To run migrations
Also don't forget to build your app first, because migrations run from dist folder.
```sh
npm migration:run
```

## Env variables
Firstly, you have to create **.env** file in root folder of the project.
```dotenv
#this we also need for postgres running in docker container

POSTGRES_USER= #postgres user name
POSTGRES_DB= #postgres database
POSTGRES_PASSWORD= #postgres password

DATABASE_PORT= #database port (default will be 5432)
DATABASE_HOST= #host of out database for out app to connect to

APP_PORT= #our app port

WEATHER_API_KEY= #api key for weather api. To retrieve one visit: https://home.openweathermap.org/api_keys
WEATHER_API_URL= #weather api url 
```