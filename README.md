# Pet Care - Cuidado de mascotas

## Create .env file and add the environment variable

```shell
## Create cluster in mongodb free tier
## https://docs.atlas.mongodb.com/tutorial/create-new-cluster/#select-the-cluster-tier
MONGO_URI=mongodb+srv://<username>:<password>@<namecluster>/?retryWrites=true&w=majority
## EXAMPLE: https://dev.to/veritechie/deploy-node-express-mongo-atlas-con-fetch-de-react-en-heroku-mern-app-3ien

## Port for server in development
PORT=3000
NODE_ENV=development
```