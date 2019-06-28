import urllib.request
import urllib.parse
import webbrowser
import re

url = input()


def get_title_by_url(url):
    html_content = urllib.request.urlopen(url)
    search_results = re.findall(
        '<title>(.*)</title>', html_content.read().decode())

    song_name = search_results[0].rsplit(' ', 2)[0]
    print(song_name)

    return song_name


def search_osu(title):
    search_url = urllib.parse.quote(title)
    return 'https://osu.ppy.sh/beatmapsets?q=' + search_url


webbrowser.open_new(search_osu(get_title_by_url(url)))
