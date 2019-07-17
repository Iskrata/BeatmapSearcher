chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);       // url
    console.log(tab.title);     // title

    function searchBeatmaps () {

        const regex = /<script id="json-beatmaps" type="application\/json">(.*?)<\/script>/gs;

        if ((m = regex.exec(this.responseText)) !== null) {
            var writeOn = '';
            var obj = JSON.parse(m[1]);
            for (var i = 0; i < obj.beatmapsets.length; i++) {
                console.log(obj.beatmapsets[i].title);
                writeOn += obj.beatmapsets[i].title + "<br>";
            }
            document.getElementById("main").innerHTML = writeOn
        } 
    }

    if (tab.url.includes('https://www.youtube.com') && tab.title != 'YouTube') {

        var song_title = tab.title;
        song_title = song_title.replace(' - YouTube', '');

        var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", searchBeatmaps);
        oReq.open("GET", newURL);
        oReq.send();
        

        //chrome.tabs.create({ url: newURL });
    }

    else {
        document.getElementById("main").innerHTML = 'This extension only works with YouTube music.'
    }

});

