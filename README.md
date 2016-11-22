# servion

Because handling files in servers is error prone and not DRY. This simple service abstracts file management from
your application.


# Install

```npm install servion```


# Use

```
var servion = require('servion');

servion({
 backend: servion.disk('/my/files/path'),
 port: 8080 
});
```

POST FILE:
```
curl --request POST --data-binary "@file.mp4" localhost:8080/my/foo/bar/file.mp4
```

GET FILE:
```
curl localhost:8080/my/foo/bar/file.mp4
```

