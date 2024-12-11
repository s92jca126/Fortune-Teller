# Fortune-Teller

http://64.23.163.14/

## Run with Docker

```shell
❯ docker-compose up --build
```

## Run Client

```shell
❯ cd client
❯ npm install
❯ npm run dev
```

## Run Server

1. set up `.env` first using `.env.example`.
2. make sure `serviceAccountKey.json` is added to the `/config` directory.

```shell
❯ cd server
❯ python3 -m venv venv
❯ source venv/bin/activate
❯ pip3 install -r requirements.txt
❯ python3 main.py
```
