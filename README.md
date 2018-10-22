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

Need to figure out how to attach a Google Analytics key to the application...
```
export ENV=prod
export DATABASE_URI=xxxxx
```
