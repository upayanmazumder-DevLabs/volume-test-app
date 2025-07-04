const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 6969;
const DATA_DIR = "/data";

// Ensure DATA_DIR exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.get("/", (req, res) => {
  res.send('Visit <a href="/write">/write</a> to create a test file.');
});

app.get("/write", (req, res) => {
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .split(".")[0];
  const filename = `${timestamp}.txt`;
  const filepath = path.join(DATA_DIR, filename);
  const content = `Test file created at ${now.toString()}`;

  fs.writeFile(filepath, content, (err) => {
    if (err) {
      console.error("Failed to write file:", err);
      return res.status(500).send("Failed to write file");
    }
    res.send(`✅ File created: ${filename}`);
  });
});

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}\nVisit http://localhost:${PORT} to access the app.`
  );
});
