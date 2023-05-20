const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { google } = require("googleapis");

// Configure bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define route to handle form data submission
app.post("/saveData", function(req, res) {
  const name = req.body.name;
  const mobile = req.body.mobile;

  // Authenticate with Google Sheets API using your credentials
  const auth = new google.auth.GoogleAuth({
    // Add your credentials here
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Specify the spreadsheet ID and range
  const spreadsheetId = "1K5Bm3fR2ahTxLV20I1qBLJSUT_AVYmdO0h5bzRCShc0";
  const range = "Sheet1!A1:B1"; // Update the range as per your sheet

  // Prepare the values to be written to the sheet
  const values = [[name, mobile]];

  // Append the values to the sheet
  sheets.spreadsheets.values.append(
    {
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: values
      }
    },
    function(err, response) {
      if (err) {
        console.error("Error appending values to sheet:", err);
        res.sendStatus(500);
      } else {
        console.log("Values appended to sheet:", response.data);
        res.sendStatus(200);
      }
    }
  );
});

// Start the server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
