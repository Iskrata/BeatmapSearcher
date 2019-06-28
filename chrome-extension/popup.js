chrome.tabs.getSelected(null, function(tab) { //<-- "tab" has all the information
console.log(tab.url);       //returns the url
console.log(tab.title);     //returns the title

var song_title = tab.title;
song_title = song_title.replace(' - YouTube', '');

// alert(song_title);

var newURL = 'https://osu.ppy.sh/beatmapsets?q=' + encodeURI(song_title)

chrome.tabs.create({ url: newURL });

//alert(encodeURI(word));

});
