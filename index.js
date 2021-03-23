const http = require("http");
const fs = require("fs");
const path = require("path");

const port = parseInt(process.env.PORT);

const pagesDir = "pages";
const pages = ["error", "maintenance"];

function sendFile(res, urlPath, callback) {
  fs.readFile(
    path.join(__dirname, pagesDir, urlPath + ".html"),
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        res.write(data, (writeErr) => {
          if (writeErr) {
            callback(writeErr);
          } else {
            callback(null);
          }
        });
      }
    }
  );
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.slice(1);

  if (pages.includes(urlPath)) {
    sendFile(res, urlPath, (err) => {
      if (err) {
        console.error(err);
      }
      res.end();
    });
  } else {
    // 404
    res.end();
  }
});

server.listen(port, () => {
  console.log(`App running on port ${port}`);
});
