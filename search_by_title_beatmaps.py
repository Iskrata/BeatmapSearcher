import urllib.request
import urllib.parse
import re

while True:
    # query_string = urllib.parse.urlencode({"": input()})
    testing_string = urllib.parse.quote(input())
    #print(query_string)
    print(testing_string)


# its =bad+guy
# expected bad%20guy