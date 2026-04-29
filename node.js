let http = require("http");
let fs = require("fs");
let path = require("path");
let formidable = require("formidable");





const server = http.createServer((req, res) => {


  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");



  if (req.url === "/upload" && req.method.toLowerCase() === "post") {
    

    console.log("\x1b[33m\nINCOMING REQUEST...\x1b[0m");

    const form = new formidable.IncomingForm({
      multiples: true,
      maxFileSize: 1024 * 1024 * 1024, // 1GB (Adjust as needed)
      maxTotalFileSize: 2048 * 1024 * 1024, // 2GB
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {

      // HANDLE PARSE ERRORS (E.G. FILE TOO LARGE)
      if (err) {

        if(err.code == 1002){
          console.log("\x1b[31mREQUEST ABORTED BY CLIENT/NETWORK\x1b[0m");
        }
        
        
        // If we don't check if headers are sent, the app might crash
        if (!res.headersSent) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Error parsing form: " + err.message);
        }
        return;
      }

      // EXTRACT USERNAME AND CREATE TARGET DIRECTORY AND DATE-BASED SUBFOLDER
      const userName = fields.name;
      const localeDate = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");
      

      try {

        
        let uploadedFiles = files.files;

        //ENSURE FILES WERE UPLOADED
        if (!uploadedFiles) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("No files uploaded");
          return;
        }
        
        // ENSURE UPLOADED FILES IS AN ARRAY (EVEN IF SINGLE FILE)
        if (!Array.isArray(uploadedFiles)) {
          uploadedFiles = [uploadedFiles];
        }

        //CREATE A SPECIFIC FOLDER FOR EACH UPLOAD
        try {
          fs.mkdirSync(`./uploads/${userName[0]}-${localeDate}`);
        } catch (mkdirErr) {
          if (mkdirErr.code !== "EEXIST") {
            throw mkdirErr; // Only ignore "folder already exists" errors
          }
        }
        

        


        // MOVE EACH UPLOADED FILE TO THE TARGET DIRECTORY
        uploadedFiles.forEach((file) => {

          const destPath = path.join(`./uploads/${userName[0]}-${localeDate}`, file.originalFilename);

          //TRY TO RENAME (MOVE) THE FILE, IF IT FAILS (E.G. CROSS-DEVICE), THEN COPY AND DELETE
          try {
            fs.renameSync(file.filepath, destPath);
          } catch (renameErr) {
            fs.copyFileSync(file.filepath, destPath);
            fs.unlinkSync(file.filepath);
          }
        });

        console.log("\x1b[32m\nSUCCESSFULL UPLOAD!\x1b[0m");
        console.log("\x1b[33mUser:\x1b[0m", userName[0]);
        console.log(`\x1b[33mfile_count:\x1b[0m \x1b[37m${uploadedFiles.length}\x1b[0m`);
        console.log("\x1b[33mdate:\x1b[0m", localeDate);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Files uploaded successfully");

      } catch (error) {

        console.error("Processing Error:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error: " + error.message);

      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Route not found");
});



server.listen(8080, "192.168.1.11", () => {
  console.log("Server running at http://192.168.1.11:8080/");
});
