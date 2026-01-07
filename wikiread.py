import wikipedia
import json
from wikiobj import WikiPage
from bs4 import BeautifulSoup

pagenames = []
bigwikipages = []
wikipages = []

def get_pages():
    sphere = 0
    with open("wiki_pages.txt", "r") as f:
        for x in f:
            if (x.strip() != ""):
                try:
                    page = wikipedia.page(title=x.strip(),auto_suggest=False)
                except wikipedia.exceptions.PageError as e:
                    #print("try again " + x.strip())
                    page = wikipedia.page(title=x.strip())
                    #print("did it work? " + page.title)
                pagenames.append(x.strip())
                bigwikipages.append(page)
                newpage = WikiPage(x.strip())
                newpage.SetSphere(sphere)
                wikipages.append(newpage)   
            else:
                sphere += 1

def get_full_page(x):
    try:
        page = wikipedia.page(title=x.strip(),auto_suggest=False)
    except wikipedia.exceptions.PageError as e:
        #print("try again " + x.strip())
        page = wikipedia.page(title=x.strip())
        #print("did it work? " + page.title)
    html = "\"\"\"" + page.html() + "\"\"\""
    #with open(html) as fp:
    #print(html)
    soup = BeautifulSoup(html, 'html.parser')
    content = soup.find(class_="mw-content-ltr")
    for a in soup.find_all('a', href=True):
        validlink = False
        for n in pagenames:
            if a.get('href').lower() == "/wiki/" + n.lower():
                validlink = True
                a['href'] = "./pages/" + n.lower()
                break
        if not validlink:
            if (a.string):
                newtext = soup.new_tag("span")
                #print(a.string)
                newtext.string = a.string
                a.replace_with(newtext)
            else:
                a.extract()
        #else:
        #    print("valid " + a.get('href'))
    #print(content)
    with open(x + ".html", "w") as f:
        #f.write("{\"title\": \"" + page.title + "\",")
        #f.write("\"content\": " + str(content) + "}")
        f.write(str(content))

def get_neighbors():
    for j,page in enumerate(bigwikipages):
        pagelinks = page.links        
        for i, pn in enumerate(pagenames):
            #print("testing " + pn + " against " + pagelinks[0])
            if pn.replace("_", " ") in pagelinks:
                #print("found " + pn)
                wikipages[j].AddNeighbor(pn)
                #wikipages[i].AddNeighbor(pagenames[j])

def getwikidata():
    get_pages()
    get_neighbors()
    with open("wikidata.json", "w") as f:
        for w in wikipages:
            f.write(json.dumps(w.toJson()) + "\n")

def countneighbors():
    for page in wikipages:
        if len(page.neighbors) == 0:
            print(page.title)
            for n in page.neighbors:
                print(n)
#print(wikipages[0].GetNeighbors())
#chick = wikipedia.page(title="Astrochicken",auto_suggest=False)
#l = chick.section("See also").split('\n')
#print(chick.html())
get_pages()
get_neighbors()
get_full_page("Astrochicken")

#print(wikipages[0].GetNeighbors())

        #print("\n")