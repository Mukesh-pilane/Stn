import os

#gauth2.0
CLIENTID = os.environ.get('CLIENT_ID')

#DB configs
MONGODB_URL = "mongodb+srv://mukeshpilane:123mukesh@cluster0.83vr0ru.mongodb.net/?retryWrites=true&w=majority" or"mongodb://localhost:27017"  #os.environ.get("DATABASE_URL")
