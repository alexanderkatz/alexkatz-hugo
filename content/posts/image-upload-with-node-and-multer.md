+++
date = "2016-12-03T21:54:24-06:00"
title = "Image Upload with Node and Multer"

+++

This tutorial provides an end to end walkthrough of uploading images in Node with Multer.

To make things simple I am providing an app-template and complete code.
Feel free to use the template or an app that you are working on.

<a href="https://github.com/alexanderkatz/app-template" target="_blank">App-Template</a>

<a href="http://Complete Code" target="_blank">Complete Code</a>

I am using <a href="https://github.com/expressjs/multer" target="_blank">Multer 1.2.0</a> and Node 6.4.0.

<ol>
<li>Install Multer, Mime, and Cryto and save to dependencies.</li>

{{< highlight javascript >}}
 `npm install -S multer`

 `npm install -S mime`

 `npm install -S crypto`
{{< /highlight >}}


<li>Require depencies in route `index.js`</li>

{{< highlight javascript >}}
var express = require('express'),
    router = express.Router(),
    mime = require('mime'),
    multer = require('multer');
{{< /highlight >}}

<li>Create a form in `index.ejs`</li>
{{< highlight html >}}
<form action="/upload" enctype="multipart/form-data" method="POST">
Select an image to upload:
<input name="image" type="file" />
<input type="submit" value="Upload Image" />
</form>
{{< /highlight >}}

The form `enctype` must be `multipart/form-data`, which is the encoding used for forms that upload files. The `enctype` specifies how the form-data is encoded when it is submitted to a server.

When submitted, the form will send a POST request to our upload route. We will construct the route in a later step.

<li>Before we can write our upload route, we need to configure Multer's storage. Multer ships with two different storage engines, `DiskStorage` and `MemoryStorage`. I will be using `DiskStorage` which gives you full control over storing files to disk. </li>

Create a folder called `uploads` in `public`.

In `index.js` underneath your require statements, write the following.

{{< highlight javascript >}}
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
});

var upload = multer({
  storage: storage
});
{{< /highlight >}}

The two options for `DiskStorage`, `destination` and `filename`, are functions that determine where the file should be stored. As their name's suggest, destination determines the upload location and filename determines the filename.

Multer does not provide a file extension for the upload, so the filename function must return a filename with an extension. Filename uses `Crypto` to generate a random name and uses `Mime` to determine the correct file extension. Generating a random filename prevents collisions if two files are uploaded with the same name. While not required, this is good practice.

`upload` will be called to upload an image.

<li>Write upload route </li>

{{< highlight javascript >}}
// POST Upload Image
router.post('/upload', upload.single("image"), function(req, res) {
  res.send('<img src="/uploads/' + req.file.filename + '" />');
});
{{< /highlight >}}
This route first uses Multer to upload the image and then sends a response to the client that includes the image, now hosted on the server.

You should be all set, but if there are any issues please comment.
</ol>

Sources

<a href="https://github.com/expressjs/multer" target="_blank">Multer</a>

<a href="https://github.com/expressjs/multer/issues/170" target="_blank">Multer Issue: Files are uploading as 'file without its extension</a>
