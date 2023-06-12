# PremiereCut
![PremiereCut_logo_bg](https://github.com/Ronvaknins/PremiereCut/assets/48179479/5e456a05-8de6-4b75-96d2-8b5cd444a2d8)




PremiereCut is an Adobe Premiere extension that automatically cut the prime cuts from a video script provided by a scripter/journlist/etc., in some productions like news for example the video editor will receive a video script from the journalist that will contain the content of the video article , such as the selected cuts that the journalist picked (basically voice overs and not visuals), then the video editor will first build the base of the video article which is the selected cuts that journalist picked and afterward will start covering it with visuals and etc.\
with **PremiereCut** the video editor can save time that is wasted on building the base of the video article , instead of going to each video file and finding the IN point and OUT point then inserting it to a sequence he will import a CSV template file that the journalist will build the script in it, and will automatically build the base of the video article by marking the IN and OUT point of each file listed in the CSV file and inserting it to the current sequence in premiere.
## How to use?
### install through GitHub:
[Windows Install x64](https://localhost) \
or manually copy  [PremiereCut-Extension](https://github.com/Ronvaknins/PremiereCut/tree/main/PremiereCut-Extension) folder to: \
`C:\Program Files\Common Files\Adobe\CEP\extensions`

MacOS copy [PremiereCut-Extension](https://github.com/Ronvaknins/PremiereCut/tree/main/PremiereCut-Extension) folder to (can replace 2022 to other higher versions):\
`/Applications/Adobe\ Premiere\ Pro\ 2022/Adobe\ Premiere\ Pro\ 2022.app/Contents/CEP/extensions/` 
### Install through Adobe Creative Cloud:
**waiting for adobe to approve**

after the install complete open **Adobe Premiere Pro** :
- Create new project
- Import the videos RUSHES needed
- Click on the top bar of premiere > Window > Extensions > PremiereCut 
IMAGE_HERE
- Choose the CSV file using the choose button or by draging the file into the doted square
IMAGE_HERE
- after seeing the confirm that that csv file selected click on the **Run** button
IMAGE_HERE
- if there's no error's the progress bar will be at 100% and you will see a message that it's done all tasks
IMAGE_HERE



## DataBase Format
the DB in this case is the CSV file will contain 3 columns: 
- Video: {the name of the video file include the extension type}
- TC_IN: {the timecode IN point}
- TC_OUT: {the timecode OUT point}
(Donwload the CSV template from the github repo click [here](https://github.com/Ronvaknins/PremiereCut/blob/main/VideoScriptTemplate.csv)\
\
![preview-image4](https://github.com/Ronvaknins/PremiereCut/assets/48179479/afd44c28-d900-4233-a35c-dc8a085cb572)


this will be filed by the video script writer.
### the time code formated as [SMPTE Timecode](https://en.wikipedia.org/wiki/SMPTE_timecode) :
| Hour  | Minutes | Seconds | Frames (in the range 0 to [fps-1]) |
| ------------- | ------------- | ------------- | ------------- |
| 00  | 00  | 00  | 00  |

IMAGE HERE

## Future ideas
- [x] @@@@
- [ ] @@@@
- [ ] @@@@

## Resources
- 
-
-
-
-
-

