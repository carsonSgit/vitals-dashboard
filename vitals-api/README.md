# Run commands

*Initial*

```
docker run --name postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

*After*

```
docker start postgres rabbitmq
```

```
docker exec -it postgres psql -U postgres
```
