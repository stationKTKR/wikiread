import json
import re

wikipages = []

def findPage(pagename):
    for p in wikipages:
        if (p["title"] == pagename):
            return p["ix"]

def readJSON():
    with open("wikidata.json", "r") as f:
        for x in f:
            
            page1 = json.loads(x)
            page2 = json.loads(page1)
            #print("x : " + page2["title"])
            wikipages.append(page2)

def generateGraphData():
    for i,page in enumerate(wikipages):
        page["ix"] = str(i)
    with open("wikigraphdata.txt", "w") as f:
        for i,page in enumerate(wikipages):
            newtitle = re.sub(r'\([^()]*\)', '', page["title"])
            f.write(str(i) + "([\"" + newtitle + "\"])\n")
            for n in page["neighbors"]:
                nix = findPage(n)
                f.write(str(i) + " --> " + nix + "\n")

readJSON()
generateGraphData()
#print(wikipages[0])
#print(type(wikipages[0]))