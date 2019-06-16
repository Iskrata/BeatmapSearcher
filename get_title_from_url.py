import urllib.request
import urllib.parse
import re # regular expression

# query_string = urllib.parse.urlencode({"search_query" : input()})
html_content = urllib.request.urlopen("https://www.youtube.com/watch?v=7gh0Cyg2iEQ")
search_results = re.findall('<title>(.*)</title>', html_content.read().decode())
print(search_results[0])