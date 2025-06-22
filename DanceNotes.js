const fs = require("fs");
const { arrayBuffer } = require("stream/consumers");

const data = fs.readFileSync("data.txt", "utf-8");
console.log(`File contents: ${data}`);

// function uploadFiles() {
//   const reader = new FileReader();
//   console.log("button clicked");
//   var filesUploaded = document.getElementById("file-input");
//   console.log(filesUploaded.files.length);
//   var fileList = filesUploaded.files;
//   //console.log("First file content: "+reader.readAsText(filesUploaded.files[0]).result)
//   reader.addEventListener(
//     "load",
//     () => {
//       // this will then display a text file
//       let data = reader.result;
//       console.log(`File contents: ${data}`);
//     },
//     false
//   );

//   for (var i = 0; i < fileList.length; i++) {
//     var currentFile = fileList[i];
//     reader.readAsText(currentFile);
//   }
// }

async function uploadFiles() {
  let inputFiles = document.getElementById("file-input");
  let fileList = inputFiles.files;
  console.log(`fileList: ${fileList}`);
  // let file = fileList[0];
  for (let file of fileList) {
    let fileContents = await readFileContent(file);
    let dateString = file.lastModifiedDate.toString();
    let date = dateString.split(" ");
    let modifiedDate = `${date[2]}-${date[1]}-${date[3]}`;
    if (file.name.toString().includes(".docx")) {
       let result = await mammoth.extractRawText({arrayBuffer: fileContents});
      console.log(
        `[Doc File]\nTitle: ${
          file.name
        } \nDate: ${modifiedDate} \ncontent:\n${result.value}`
      );
    } else
      console.log(
        `Title: ${file.name} \nDate: ${modifiedDate} \ncontent:\n${fileContents}`
      );
  }
}

function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    if (file.name.toString().includes(".docx")) {
      reader.readAsArrayBuffer(file);
    } else reader.readAsText(file);
  });
}
