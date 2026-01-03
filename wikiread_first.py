import wikipediaapi
from wikiobj import WikiPage

wiki_wiki = wikipediaapi.Wikipedia(user_agent='MyProjectName (merlin@example.com)', language='en')

pagenames = []
wikipages = []

with open("wikipages.txt") as f:
  for x in f:
    if (x.strip() != ""):
        try: 
            page = wiki_wiki.page(x)
            pagenames.append(page.title)
            newwiki = WikiPage(page.title)
            print(page.title)
            #for k in sorted(linklist.keys()):
            #   print(k)
            #print(linklist.keys())
            #for name in pagenames:
            #   print("testing " + name)
            #   if linklist.keys().contains(name):
            #      print("contains " + name)
                  #newwiki.AddNeighbor(name)
            #print(page.title,end='')
        except Exception as inst:
            print(type(inst)) 

        #print(page.categories)
        #print(page.canonicalurl)
        #links = page_py.links
        #for title in sorted(links.keys()):
        #    print(title)

def print_links(page):
    links = page.links
    for title in sorted(links.keys()):
        print("%s" % (title, links[title]))

#print_links(page_py)