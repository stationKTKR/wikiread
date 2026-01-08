import wikipedia
import json
from wikiobj import WikiPage
from bs4 import BeautifulSoup
import re
from unidecode import unidecode
import sys
pagenames = []
bigwikipages = []
wikipages = []

def get_pages():
    sphere = 0
    with open("w1_infohazard.txt", "r") as f:
        for x in f:
            if (x.strip() != ""):
                try:
                    page = wikipedia.page(title=x.strip(),auto_suggest=False)
                except wikipedia.exceptions.PageError as e:
                    #print("try again " + x.strip())
                    page = wikipedia.page(title=x.strip())
                    #print("did it work? " + page.title)
                #pagenames.append(x.strip())
                #print(x)
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
    #content = BeautifulSoup(content.decode('utf-8','replace'))
    
    #print(content)
    for s in soup.find_all('span', {"class":"mw-editsection"}):
        s.extract()
    for d in soup.find_all('div', id="toc"):
        d.extract()
    for d in soup.find_all('div', {"class":"side-box-text"}):
        d.extract()
    #for header in soup.find_all('h2', id="References"):
    #    section = header.parent
    #    section.extract()
    for header in soup.find_all('h2', id="Sources"):
        section = header.parent
        section.extract()
    for header in soup.find_all('h2', id="External_links"):
        section = header.parent
        section.extract()
    for header in soup.find_all('h2', id="Notes"):
        section = header.parent
        section.extract()
    for d in soup.find_all('div', {"class":"mw-references-wrap"}):
        d.extract()
    for d in soup.find_all('div', {"class":"spoken-wikipedia"}):
        d.extract()
    for d in soup.find_all('ul', {"class":"portalbox"}):
        d.extract()
    for d in soup.find_all('div', {"role":"navigation"}):
        d.extract()
    for t in soup.find_all('table', {"class":"infobox"}):
        t.extract()
    for t in soup.find_all('table', {"class":"sidebar"}):
        t.extract()
    for a in soup.find_all('a', {"class":"mw-file-description"}):
        del a["href"]
    for a in soup.find_all('a', href=True):
        if (a.get("class") == "mw-file-description"):
            a['href'] = ""
        else:
            validlink = False
            a['href'] = a["href"].replace("%27", "'")
            for n in pagenames:
                #if n == "Roko's_basilisk":
                #    print("testing " + a.get('href').lower())
                if a.get('href').lower() == "/wiki/" + n.lower():
                    #print("on " + x + " HERE " + n)
                    validlink = True
                    #a['href'] = n.lower()
                    a['href'] = ""
                    a['onclick'] = "message(this)"
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
    with open("./wiki-app/public/pages/" + x + ".html", "w") as f:
        f.write("""<!DOCTYPE html>
                <html>
                <head>
                <link rel="stylesheet" type="text/css" href="./wiki.css">
                </head>
                <body>""")
        #f.write("{\"title\": \"" + page.title + "\",")
        #f.write("\"content\": " + str(content) + "}")
        f.write("<h1>" + page.title + "</h1>")
        try:
            #f.write(str(content.encode('utf8')))
            f.write(unidecode(str(content)))
        except UnicodeEncodeError as e:
            print("issue with " + x)
            print(e)
            
        f.write("""<script>
                    function message(element) {
                        console.log("FUNCTIONNN");
                        console.log(element.title)
                        window.parent.postMessage(element.title);
                }
                    
                </script></body>
                </html>""")

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
#print(wikipages[0].neighbors)
#print(pagenames)
for p in pagenames:
    get_full_page(p)

#print(wikipages[0].GetNeighbors())

        #print("\n")