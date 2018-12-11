const fs = require("fs");

const DIR = __dirname + '/fs';
fs.watch(DIR, function (event, filename) {
    console.log(filename, event);
    if (!filename.includes("___jb_old___") && !filename.includes("___jb_tmp___")) {
        fs.readFile(`${DIR}/${filename}`, 'utf8', (err, data) => {
            if (err) console.error(err);
            console.log(data);
        });
    }
});