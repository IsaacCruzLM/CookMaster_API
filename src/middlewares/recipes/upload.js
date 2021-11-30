const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    callback(null, path.resolve(__dirname, '../../uploads/')); 
  },
  filename: (req, file, callback) => { callback(null, `${req.params.id}.jpeg`); },
});

module.exports = multer({ storage });