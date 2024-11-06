## Prompt

### QR Code Generator:
- use google apps script
- this script is a google sheets bound-script
- create a script that will generate a QR code containing json with the following data:
	- id
	- name
- get these data from sheet `students`
- get the data dynamically. look for the right column with the right column name as columns might not be in order.
- if a student is missing data, like missing id, or missing name, skip it. do not create QR code for that student.
- generate QR code for each student and save the generated images to google drive folder named `generated_qr`. name the QR code file in format: `<id>.png`
- if the folder does not exist, create it. otherwise, delete everything in it for a fresh start before saving the new QR codes.
- use `goqr.me` api to generate QR codes

### Web App Requirements (QR code scanner):
- use google apps script
- this script is a google sheets bound-script
- create exactly two files: `index.html` and `code.gs`
- `code.gs` will serve as the backend for `index.html` (web app)
- in the `index.html` create a single page application (SPA) that can open camera and scan a QR code to get its details.
- QR code details contains json with the following data:
	- id
	- name
- once the web app is opened, the camera will open ready for scanning the QR code.
- once it scanned the QR code, it gets the json data, and display the data on the web page (in readable format)
- there is a `submit` button that once clicked, appends the data to google sheets with sheet name `attendance`. in addition, a `timestamp` should also be saved to the sheet containing the date and time when the QR code was scanned.
- `submit` button is initially hidden. once valid data is scanned from QR code, then submit button will be displayed.
- once submitted, web app should revert back to its initial state to scan another qr code.
- `attendance` sheet has columns: `id`, `name`, and `timestamp`
- make the appending of data to `attendance` dynamic. it should look for the proper column with proper column name as columns might not be in order. if it did not find the right column, do not append the data.
- if the QR code scanned does not have valid json or if it does not include the json fields mentioned above, the data should not be saved to google sheets.
- use `html5-qrcode` library. use cdn: https://cdn.jsdelivr.net/npm/html5-qrcode/minified/html5-qrcode.min.js
- ensure that user can scan QR code again after success/fail
