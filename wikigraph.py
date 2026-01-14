import json
import re

wikipages = []

def findPage(pagename):
    for p in wikipages:
        if (p["title"] == pagename):
            return p["ix"]

def readJSON(ar):
    with open("wiki-app/public/wikidata.json", "r") as f:
        for x in f:
            
            page1 = json.loads(x)
            #page2 = json.loads(page1)
            #print("x : " + page2["title"])
            ar += page1['wikipages']



def generateGraphData():
    for i,page in enumerate(wikipages):
        page["ix"] = str(i)
    with open("wikigraphdata.txt", "w") as f:
        for i,page in enumerate(wikipages):
            newtitle = re.sub(r'\([^()]*\)', '', page["title"])
            f.write(str(i) + "([\"" + newtitle + "\"])\n")
            for n in page["neighbors"]:
                nix = findPage(n)
                if (nix):
                    f.write(str(i) + " --> " + nix + "\n")

readJSON(wikipages)
#print(wikipages)
generateGraphData()
#print(wikipages[0])
#print(type(wikipages[0]))