chrome.tabs.getSelected(null, function (tab) {
    console.log(tab.url);       // url
    console.log(tab.title);     // title

    //console.log(tab.href)

    function reqListener () {
        console.log(this.responseText);
      }

    if (tab.url.includes('https://www.youtube.com') && tab.title != 'YouTube') {

        var song_title = tab.title;
        song_title = song_title.replace(' - YouTube', '');

        var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", newURL);
        oReq.send();

        chrome.tabs.create({ url: newURL });
    }

    // chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    //     console.log("something happening from the extension");
    //     var data = request.data || {};
    //     var linksList = document.querySelectorAll('a');
    //     [].forEach.call(linksList, function(header) {
    //         header.innerHTML = request.data;
    //     });
    //     alert(data)
    //     sendResponse({data: data, success: true});
    // });
});

