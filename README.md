## Build the container

```
docker build --no-cache --build-arg SERVER_PORT=8000 -t webapp .
```

## Run the container

```
docker run -it --rm --name 2pi  \
    -p 8000:8000 \
    -v /data/d/projects/other/2pi-financial/:/base \
    webapp
```

## Environment variables for production

```
export ENV=prod
export DATABASE_URI=xxxxx
```

## Attaching Google Analytics

In the `__init__.py` file for the application, there is a line for inputting the Google Analytics
account key. If you want to switch it, change that and make a pull request.
