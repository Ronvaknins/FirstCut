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

function convertToSeconds(timestring){
    var timeA = timestring.split(':');
    return (+timeA[0]) * 60 * 60 + (+timeA[1]) * 60 + (+timeA[2]); 
}

// Variable knobs
var insertIntoTrack = 0;
var overwrite = false;
var insertAtEnd = true;
var numberClipToInsert = 6;
var secondAsTick = 254016000000;
// Get a grip on our sequence
var seq = app.project.activeSequence;

// Get a list of all the clips that are in the project panel
var availibleClips = app.project.rootItem.children;

// Get the video track where we want to insert into
var videoTrack = seq.videoTracks[insertIntoTrack];

function processArray(cutff) {
	var cut = {Video: "P1002.mxf",TC_IN: "00:00:59:03",TC_OUT: "00:00:25:03"}
	var fileFound = false;
	var tcInGood = true;
	var tcOutGood = true;
	var msg="";
	for(i=0;i<availibleClips.length;i++){   

    	currentClip = availibleClips[i];
		if(currentClip.name === cut.Video){
			fileFound = true;
			var myTime = new Time();
			$.writeln(currentClip.getProjectColumnsMetadata());
			var parseMetaData = JSON.parse(currentClip.getProjectColumnsMetadata());
			var mediaDuration = Number(parseMetaData[5].ColumnValue);//in ticks
			var fps = currentClip.getFootageInterpretation().frameRate;
			//set in point *(TC_IN) using ticks 1 seconds = 254016000000 ticks
			var oneSecondTick = 254016000000;//1 second == 254016000000 ticks in this world
			var addInTicksframes = (oneSecondTick / Number(fps)) * Number(cut.TC_IN.split(":")[3]);
			myTime.ticks = ((convertToSeconds(cut.TC_IN)*oneSecondTick)+addInTicksframes).toString();
			
			if(Number(myTime.ticks) > mediaDuration){
				tcInGood = false;
				msg = "TC_IN: "+cut.TC_IN +" timecode is not aviliable in "+cut.Video;
				break;
			}
			currentClip.setInPoint(myTime,4);

			//set out point *(TC_OUT)
			/*the last in the timecode is the frames, converting to ticks its 1 second = 254016000000 ->
				1 sec = framerate (fps) -> oneSecondticks / framerate = 1 frame -> 
				(oneSecondTick/framerate) * numberOfFrames(cut.TC_OUT.split(":")[3]-> 00:00:00:XX) = additional ticks
			*/
			var addOutTicksframes = (oneSecondTick / Number(fps)) * Number(cut.TC_OUT.split(":")[3]);
			myTime.ticks = ((convertToSeconds(cut.TC_OUT)*oneSecondTick)+addOutTicksframes).toString();
			
			if(Number(myTime.ticks) > mediaDuration){
				tcOutGood = false;
				msg = "TC_OUT: "+cut.TC_OUT+" timecode is not aviliable in "+cut.Video;
				break;
			};
			currentClip.setOutPoint(myTime,4)
			if(insertAtEnd){
				// If we want to insert the clip at the end, we need to get
				// the end time of the last clip
				// var numClips = videoTrack.clips.numItems;
				videoTrack.insertClip(currentClip, seq.end);
				seq.setPlayerPosition(seq.end);

			}
			break;
		}
	}
	if(fileFound && tcInGood && tcOutGood)
	{
		return [true,""];
	}else if(!fileFound){
		return [false,"Video File: "+cut.Video +" not found"];
	}
	else{
		return [false,msg];
	}
	
}
$.writeln(processArray());

 

  






