chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);       // url
    console.log(tab.title);     // title

    document.getElementById("main").onmouseover = function() {playSound()};

    function searchBeatmaps() {

        const regex = /<script id="json-beatmaps" type="application\/json">(.*?)<\/script>/gs;

        if ((m = regex.exec(this.responseText)) !== null) {
            var writeOn = '';
            var beatmapID = '';
            var downloadUrl = '';
            var obj = JSON.parse(m[1]);
            for (var i = 0; i < obj.beatmapsets.length; i++) {
                beatmapID = obj.beatmapsets[i].id
                beatmapTitle = obj.beatmapsets[i].title
                downloadUrl = 'https://osu.ppy.sh/beatmapsets/' + beatmapID
                console.log(beatmapID);
                
                writeOn += `<div class="beatmapset-header" style="background-image: url(&quot;https://assets.ppy.sh/beatmaps/${beatmapID}/covers/cover.jpg?1563343557&quot;);">
                <a href="${downloadUrl}" class="button" target="_blank"></a><br></div>`;
            }
            if (writeOn != '') {
            document.getElementById("main").innerHTML = writeOn;
            }
            else {
                document.getElementById("main").innerHTML = `"${song_title}" doesn't have a beatmap. :(`;
            }
        }
    }

    function playSound() {
        //var myAudio = new Audio("https://b.ppy.sh/preview/78164.mp3");
        myAudio.play();
    }

    if (tab.url.includes('https://www.youtube.com') && tab.title != 'YouTube') {

        var song_title = tab.title;
        song_title = song_title.replace(' - YouTube', '');

        var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", searchBeatmaps);
        oReq.open("GET", newURL);
        oReq.send();
    }

    else {
        document.getElementById("main").innerHTML = 'This extension only works with YouTube music.'
    }

});

