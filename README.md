# PremiereCut
![PremiereCut_logo_bg](https://github.com/Ronvaknins/PremiereCut/assets/48179479/5e456a05-8de6-4b75-96d2-8b5cd444a2d8)




PremiereCut is an Adobe Premiere extension that automatically cut the prime cuts from a video script provided by a scripter/journlist/etc., in some productions like news for example the video editor will receive a video script from the journalist that will contain the content of the video article , such as the selected cuts that the journalist picked (basically voice overs and not visuals), then the video editor will first build the base of the video article which is the selected cuts that journalist picked and afterward will start covering it with visuals and etc.\
with **PremiereCut** the video editor can save time that is wasted on building the base of the video article , instead of going to each video file and finding the IN point and OUT point then inserting it to a sequence he will import a CSV template file that the journalist will build the script in it, and will automatically build the base of the video article by marking the IN and OUT point of each file listed in the CSV file and inserting it to the current sequence in premiere.
## How to use?
### install through GitHub:
**Windows:** [Install x64 v1.0.0.0](https://github.com/Ronvaknins/PremiereCut/releases/tag/v1.0.0.0-win64bit) \
or manually copy  [PremiereCut-Extension](https://github.com/Ronvaknins/PremiereCut/tree/main/PremiereCut-Extension) folder to: \
`C:\Program Files\Common Files\Adobe\CEP\extensions`

**MacOS:** copy [PremiereCut-Extension](https://github.com/Ronvaknins/PremiereCut/tree/main/PremiereCut-Extension) folder to (can replace 2022 to other higher versions):\
`/Applications/Adobe\ Premiere\ Pro\ 2022/Adobe\ Premiere\ Pro\ 2022.app/Contents/CEP/extensions/` 
### Install through Adobe Creative Cloud:
**waiting for adobe to approve**

after the install complete open **Adobe Premiere Pro** :
- Create new project
- Import the videos RUSHES needed
- Click on the top bar of premiere > Window > Extensions > PremiereCut \
![open_ext](https://github.com/Ronvaknins/PremiereCut/assets/48179479/b5067bd8-8f63-43df-a787-4f36fd2ec7e0)

- Choose the CSV file using the "Choose File" button or by draging the file into the doted square \
![preview_image](https://github.com/Ronvaknins/PremiereCut/assets/48179479/23bc05ce-fe5a-4d13-82bc-fe87ccf47ea5)

- after seeing the confirm that that csv file selected click on the **"Run"** button \
![preview-image2](https://github.com/Ronvaknins/PremiereCut/assets/48179479/3ca59a01-2766-41a4-8274-f4ef543d15c7) 

- if there's no error's the progress bar will be at 100% and you will see a message that it's done all tasks \
![preview-image3](https://github.com/Ronvaknins/PremiereCut/assets/48179479/cea429c8-2a85-4b8a-b4b2-a6f9c246492e)


## DataBase Format
the DB in this case is the CSV file will contain 3 columns: 
- Video: {the name of the video file include the extension type}
- TC_IN: {the timecode IN point}
- TC_OUT: {the timecode OUT point}
(Donwload the CSV template from the github repo click [here](https://github.com/Ronvaknins/PremiereCut/blob/main/VideoScriptTemplate.csv)\
\
![preview-image4](https://github.com/Ronvaknins/PremiereCut/assets/48179479/afd44c28-d900-4233-a35c-dc8a085cb572)


this will be filed by the video script writer.
### Timecode: the time code formated as [SMPTE Timecode](https://en.wikipedia.org/wiki/SMPTE_timecode) :
| Hour  | Minutes | Seconds | Frames (in the range 0 to [fps-1]) |
| ------------- | ------------- | ------------- | ------------- |
| 00  | 00  | 00  | 00  |

![timecode](https://github.com/Ronvaknins/PremiereCut/assets/48179479/136c7a59-57e8-47f4-94de-17f5c98ef1e8)


## Future ideas
- [ ] Create MacOS installer
- [ ] add option to open new sequence automatically if there isn't any seqeuence in the project
- [ ] add exception when the the frames timecode is out of the range of the fps - 1 , right now it work as "cyclic" for example if the fps=25 so if the TC_IN is 00:00:20:**51** it will just show as 00:00:22:01 [ 1second = 25fps -> 25fps + 25fps = 50 = 2seconds +  1frame (51frames % 25fps = 1) -> should add 2 seconds and 1 frame ]
- [] approved by Adobe Exchange

## Resources
- https://github.com/Adobe-CEP/
- https://community.adobe.com/
- https://www.geeksforgeeks.org/
- https://youtu.be/LGabsGWvrUY
- https://ppro-scripting.docsforadobe.dev/
- https://youtu.be/CnYDiWxShR4
- https://fonts.google.com/specimen/Rubik+Glitch
- https://youtu.be/Y9Ovo2XJHDs
- https://jrsoftware.org/isinfo.php

