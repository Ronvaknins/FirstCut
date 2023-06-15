/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/*
  CSInterface
*/

function jsFriendlyJSONStringify (s) {
  return JSON.stringify(s).
      replace(/\\r/g, '\r').
      replace(/\\n/g, '\n')
  }
var csInterface = new CSInterface();

/*
  UI Elements
*/
// var buttonGroup = document.querySelector("#button-group");
var runButton = document.querySelector("#run-btn");
// var jpgButton = document.querySelector("#export-jpg");
// var pngButton = document.querySelector("#export-png");
// var originalButton = document.querySelector("#export-original");
var finaldataArray = new Array();
// /*
//   Event listeners
// */
// runButton.addEventListener('click', function(){exportWithType('pdf');}, false);
// jpgButton.addEventListener('click', function(){exportWithType('jpg');}, false);
// pngButton.addEventListener('click', function(){exportWithType('png');}, false);
// originalButton.addEventListener('click', function(){exportWithType();}, false);
runButton.addEventListener('click', function(){
  // console.log(typeof contents);
  // console.log(typeof finaldataArray);
  console.log("Running");
  // alert(finaldataArray[0]);
  finaldataArray.length == 0 ? customAlerts("Video Script csv file not chosen","red"):RunCut();
  // if(finaldataArray.length == 0)
  // {
    
  // }
  // else{
    
  // }
  // console.log(finaldataArray);
  
  
  // csInterface.evalScript(`alert("${finaldataArray[0]}")`);

}, false);

async function RunCut() {
  var pbar = document.getElementById("pBar");
  var fnameProcessing = document.getElementById("fnameProcessing");
  var numCuts = finaldataArray.length;
  for (let index = 0; index < numCuts; index++) { 
    var status;
    document.getElementById("progress-container").style.visibility = "visible";
    fnameProcessing.innerHTML = "Processing " + finaldataArray[index].Video;
    // console.log(JSON.stringify(finaldataArray[index]));
    await runEvalScript('processScriptCuts('+JSON.stringify(finaldataArray[index])+')').then(async function(res){
      //promise result should retrun string with true | false and a message if false in this struct "false,{error_msg}"
      status = await res;
      // console.log(res);
    });
    console.log(status);
    var barWidth = ((index+1) / numCuts)*100 + "%";
    pbar.style.width = barWidth;
    pbar.innerHTML = barWidth;
    var succeded = Boolean(eval(status.split(",")[0]));
    if(!succeded)
    {
      customAlerts(status.split(",")[1],"red");
      break;
    }
  }
  customAlerts("All Done!","green");
}


function runEvalScript(script) {
  return new Promise(function(resolve, reject){
      csInterface.evalScript(script, resolve);
  });
}


// Get the necessary DOM elements
var dropArea = document.getElementById('drop-area');
var fileInput = document.getElementById('file-input');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight the drop area when a file is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

// Remove the highlighting when the file is dragged out of the drop area
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle file drop
dropArea.addEventListener('drop', handleDrop, false);

// Handle file selection from the file input
fileInput.addEventListener('change', handleFile, false);

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

function highlight() {
  dropArea.classList.add('highlight');
}

function unhighlight() {
  dropArea.classList.remove('highlight');
}

function handleDrop(event) {
  var files = event.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    // handleFiles();
    handleFile(event);
  }
}



function handleFile(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  reader.onload = async function (e) {
    var contents = e.target.result;
    finaldataArray = await parseCSV(contents);
    // console.log(dataArray);
    // Use the dataArray as needed
  };

  reader.readAsText(file);

  customAlerts("File "+event.target.files[0].name+" loaded","green");
}

function parseCSV(csv) {
  const lines = csv.split('\n');
  const keys = lines[0].replaceAll("\r","").split(',');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    if(lines[i] == ""){continue;}
    const values = lines[i].replaceAll("\r","").split(',');
    const obj = {};

    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = values[j];
    }

    result.push(obj);
  }

  return result;
}


function customAlerts(msg,color) {
  // Get the snackbar DIV
  var x = document.getElementById("toaster");
  x.innerHTML = msg;//insert custom message
  // Add the "show" class to DIV
  x.style.backgroundColor = color;//define the color of the background red means error
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}