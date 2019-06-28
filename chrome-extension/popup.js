chrome.tabs.getSelected(null, function(tab) {
console.log(tab.url);       // url
console.log(tab.title);     // title

if (tab.url.includes('https://www.youtube.com')){

    var song_title = tab.title;
    song_title = song_title.replace(' - YouTube', '');
    
    var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)
    
    chrome.tabs.create({ url: newURL });
    }
});
