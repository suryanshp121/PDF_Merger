import express  from "express";
const app = express()
import path from 'path'
import multer  from "multer";
const upload = multer({ dest: 'uploads/' })
import {pdfmerger} from "./merger.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static',express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"));
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    if(req.files[0]==undefined || req.files[1]==undefined){
      res.redirect(`http://localhost:${port}`);  
    }
    else{
      await pdfmerger(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
      res.redirect(`http://localhost:${port}/static/merged.pdf`);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})