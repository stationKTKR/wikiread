import wikipedia
import json
from wikiobj import WikiPage

pagenames = []
bigwikipages = []
wikipages = []

def get_pages():
    with open("wikipages.txt", "r") as f:
        for x in f:
            if (x.strip() != ""):
                try:
                    page = wikipedia.page(title=x.strip(),auto_suggest=False)
                except wikipedia.exceptions.PageError as e:
                    #print("try again " + x.strip())
                    page = wikipedia.page(title=x.strip())
                    #print("did it work? " + page.title)
                pagenames.append(page.title)
                bigwikipages.append(page)
                newpage = WikiPage(page.title)
                wikipages.append(newpage)   

def get_neighbors():
    for j,page in enumerate(bigwikipages):
        pagelinks = page.links
        for i, pn in enumerate(pagenames):
            #print("testing " + pn + " against " + pagelinks[0])
            if pn in pagelinks:
                #print("found " + pn)
                wikipages[j].AddNeighbor(pn)
                #wikipages[i].AddNeighbor(newpage.title)

        
        #except Exception as inst:
        #    print("error: " + x)
        #    print(type(inst))


def print_links(page):
    links = page.links
    for title in sorted(links.keys()):
        print("%s" % (title, links[title]))

get_pages()
get_neighbors()
with open("wikidata.json", "w") as f:
  for w in wikipages:
      f.write(json.dumps(w.toJson()) + "\n")

#print(wikipages[0].GetNeighbors())
#print(wikipedia.page(title="Astrochicken",auto_suggest=False).links)
#print_links(page_py)