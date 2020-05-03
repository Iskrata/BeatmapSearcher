chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);       // url
    console.log(tab.title);     // title

    function searchBeatmaps() {

        const regex = /<script id="json-beatmaps" type="application\/json">(.*?)<\/script>/gs;

        if ((m = regex.exec(this.responseText)) !== null) {
            document.getElementById("main").innerHTML = ''
            var downloadUrl = '';
            var obj = JSON.parse(m[1]);

            for (var i = 0; i < obj.beatmapsets.length; i++) {
                beatmapID = obj.beatmapsets[i].id;
                beatmapTitle = obj.beatmapsets[i].title;
                downloadUrl = 'https://osu.ppy.sh/beatmapsets/' + beatmapID;
                console.log(beatmapID);
                
                document.getElementById("main").innerHTML += `
                <audio id="myAudio" src="https://b.ppy.sh/preview/${beatmapID}.mp3" preload="auto">
                </audio>
                <input type="button" value="PLAY"  onclick="play()">
                <a onClick="togglePlay()" style="position: absolute; margin-left: 175px;">
                <img border="0" src="sound.png" width="25" height="25">
                </a>

                <div class="beatmapset-header" style="background-image: url(&quot;https://assets.ppy.sh/beatmaps/${beatmapID}/covers/cover.jpg?1563343557&quot;); -webkit-animation: fadein 1s;">

                <a href="${downloadUrl}" class="button" target="_blank" style="height: 57px; width: 204px;">${beatmapTitle}</a>

                </div>
                `;
            }

        }
    }

    if (tab.url.includes('https://www.youtube.com') && tab.title != 'YouTube') {

        document.getElementById("main").innerHTML = '<p>Loading..</p>'

        var song_title = tab.title;
        song_title = song_title.replace(' - YouTube', '');

        var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", searchBeatmaps);
        oReq.open("GET", newURL);
        oReq.send();
    }

    else {
        document.getElementById("main").innerHTML = '<p>This extension only works in YouTube while playing music.</p>'
    }
        

});

// --- //b.ppy.sh/preview/${beatmapID}.mp3
