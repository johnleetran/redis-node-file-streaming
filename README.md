simple app to stream files to redis
# Run redis
```
docker run -d -it --rm -p 6379:6379 --name redis-server redis
```

# Run express app
```
npm install
node app.js
```

# test
```
curl --upload-file image.jpg localhost:3000/upload?key=image1
curl -o test.jpg localhost:3000/content?key=image1
open test.jpg
```

