import wikipedia
from wikiobj import WikiPage
from bs4 import BeautifulSoup
from unidecode import unidecode
import os.path
from bs4 import BeautifulSoup, SoupStrainer

pagenames = []
bigwikipages = []
wikipages = []
wikilists = ["w1_infohazard", "w2_superorganism", "w3_selfrep", "w4_ai", "w5_consc", "w6_artlife", "w7_obs"]

def get_pages():
    sphere = 0
 #   print(wikilists[4])
    for l in wikilists:
        with open(l + ".txt", "r") as f:
            for x in f:
                #print(x.strip())
                if (x.strip() != ""):
                    try:
                        page = wikipedia.page(title=x.strip(),auto_suggest=False)
                        #print(page.title)
                    except wikipedia.exceptions.PageError as e:
                        #print("try again " + x.strip())
                        page = wikipedia.page(title=x.strip())
                        #print("did it work? " + page.title)
                    #pagenames.append(x.strip())
                    #print(x)
                    pagenames.append(page.title)
                    bigwikipages.append(page)
                    newpage = WikiPage(page.title)
                    newpage.SetSphere(sphere)
                    wikipages.append(newpage)   
                else:
                    sphere += 1

def get_full_page(x):
    if os.path.exists("./wiki-app/public/pages/" + x + ".html"):
        #print(f"The file x exists.")
    #else:
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
        for d in soup.find_all('div', {"class":"side-box"}):
            d.extract()
        for header in soup.find_all('h2', id="References"):
            section = header.parent
            section.extract()
        for header in soup.find_all('h2', id="Further_reading"):
            header.extract()
        
        for u in soup.find_all('ol', {"class":"references"}):
            u.extract()
        for header in soup.find_all('h2', id="Sources"):
            section = header.parent
            section.extract()
        for header in soup.find_all('h2', id="External_links"):
            section = header.parent
            section.extract()
        for c in soup.find_all('cite', {"class":"citation"}):
            section = c.parent.parent
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
        #for d in soup.find_all('sup', {"class":"reference"}):
        #    d.extract()
        for t in soup.find_all('table', {"class":"infobox"}):
            t.extract()
        for t in soup.find_all('table', {"class":"sidebar"}):
            t.extract()
        for a in soup.find_all('a', {"class":"mw-file-description"}):
            del a["href"]
        for a in soup.find_all('a', {"class":"external"}):
            section = a.parent
            section.extract()
        for a in soup.find_all('a', href=True):
            if (a.get("class") == "mw-file-description"):
                a['href'] = ""
            else:
                validlink = False
                a['href'] = a["href"].replace("%27", "'")
                for n in pagenames:
                    if a.get('href').lower() == "/wiki/" + n.lower().replace(" ", "_"):
                        #print("on " + x + " HERE " + n)
                        validlink = True
                        #a['href'] = n.lower()
                        a['href'] = ""
                        a['onclick'] = "message(this)"
                        a['title'] = n
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
            
def get_temp_page(x, writeFile):
    if os.path.exists("./wiki-app/public/pages/" + x + ".html"):
        #print(f"The file x exists.")
    #else:
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
        for d in soup.find_all('div', {"class":"side-box"}):
            d.extract()
        for header in soup.find_all('h2', id="References"):
            section = header.parent
            section.extract()
        for header in soup.find_all('h2', id="Further_reading"):
            header.extract()
        
        for u in soup.find_all('ol', {"class":"references"}):
            u.extract()
        for header in soup.find_all('h2', id="Sources"):
            section = header.parent
            section.extract()
        for header in soup.find_all('h2', id="External_links"):
            section = header.parent
            section.extract()
        for c in soup.find_all('cite', {"class":"citation"}):
            section = c.parent.parent
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
        #for d in soup.find_all('sup', {"class":"reference"}):
        #    d.extract()
        for t in soup.find_all('table', {"class":"infobox"}):
            t.extract()
        for t in soup.find_all('table', {"class":"sidebar"}):
            t.extract()
        for t in soup.find_all('table', {"class":"ambox-content"}):
            t.extract()
        for a in soup.find_all('a', {"title": "Infohazard"}):
            a['title'] = "Information hazard"
            a['href'] = '/wiki/Information_hazard'
        for a in soup.find_all('a', {"title": "Grey goo"}):
            a['title'] = "Gray goo"
            a['href'] = '/wiki/Gray_goo'
        for a in soup.find_all('a', {"class":"mw-file-description"}):
            del a["href"]
        for a in soup.find_all('a', {"class":"external"}):
            section = a.parent
            section.extract()
        seealso = soup.find('h2', {"id":"See_also"})
        if seealso:
            postul = seealso.parent.find_next('ul')

            for next_sibling in postul.find_next_siblings():
                next_sibling.decompose()
        else:
            print("----no seealso found")
        if writeFile:
            with open("./temppages/" + x + ".html", "w") as f:
                try:
                    #f.write(str(content.encode('utf8')))
                    f.write(unidecode(str(content)))
                except UnicodeEncodeError as e:
                    print("issue with " + x)
                    print(e)

def get_temp_neighbors(x, writeFile) :
    xindex = pagenames.index(x)
    with open("./temppages/" + x + ".html", "r") as f:
        soup = BeautifulSoup(f, 'html.parser')
        souplinks = soup.find_all('a', href=True)
        for s in souplinks:
            validlink = False
            for j,p in enumerate(pagenames):
                if s['href'].lower().replace("%27", "'") == "/wiki/" + p.lower().replace(" ", "_"):
                    validlink = True
                    wikipages[xindex].AddToNeighbor(p)
                    wikipages[j].AddFromNeighbor(x)
                    s['href'] = ""
                    s['onclick'] = "message(this)"
                    s['title'] = p
                    break
            if not validlink:
                if (s.string):
                    newtext = soup.new_tag("span")
                    #print(a.string)
                    newtext.string = s.string
                    s.replace_with(newtext)
                else:
                    s.extract()
    # special neighbors
    if (x == "Mind uploading"):
        wikipages[xindex].AddToNeighbor("MMAcevedo")
        wikipages[xindex].AddFromNeighbor("MMAcevedo")
    
    if writeFile:
        with open("./wiki-app/public/pages/" + x + ".html", "w") as f:
            f.write("""<!DOCTYPE html>
                    <html>
                    <head>
                    <link rel="stylesheet" type="text/css" href="./wiki.css">
                    <script>
                    let FF_FOUC_FIX;
                    </script>
                    </head>
                    <body>""")
            #f.write("{\"title\": \"" + page.title + "\",")
            #f.write("\"content\": " + str(content) + "}")
            f.write("<h1>" + x + "</h1>")
            try:
                #f.write(str(content.encode('utf8')))
                content = soup.find(class_="mw-content-ltr")
                f.write(unidecode(str(content)))
            except UnicodeEncodeError as e:
                print("issue with " + x)
                print(e)
                
            f.write("""<script>
                        function message(element) {
                            window.parent.postMessage(element.title);
                    }
                        
                    </script></body>
                    </html>""")


def get_neighbors():
    for j,page in enumerate(bigwikipages):
        pagelinks = page.links        
        for i, pn in enumerate(pagenames):
            #print("testing " + pn + " against " + pagelinks[0].lower())
            for pl in pagelinks:
                if pn.lower() == pl.lower():
                    #print("found " + pn)
                    wikipages[j].AddNeighbor(pn)
                    wikipages[j].AddToNeighbor(pn)
                    wikipages[i].AddFromNeighbor(page.title)
                    #wikipages[i].AddNeighbor(pagenames[j])

def getwikidata():
    with open("./wiki-app/public/wikidata.json", "w") as f:
        f.write("{\"wikipages\":[")
        for i,w in enumerate(wikipages):
            w.SortLists()
            f.write("{\"title\":\"" + w.title + "\",")
            #f.write("\"neighbors\":[\"" + "\",\"".join(w.GetNeighbors()) + "\"],")
            f.write("\"toneighbors\":[\"" + "\",\"".join(w.GetToNeighbors()) + "\"],")
            f.write("\"fromneighbors\":[\"" + "\",\"".join(w.GetFromNeighbors()) + "\"],")
            f.write("\"visited\":0,")
            f.write("\"sphere\":" + str(w.sphere) + "}")
            
            if (i < len(wikipages) - 1):
                f.write(",")
        f.write("]}")
    

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
#get_pages()
#print(pagenames)
#get_neighbors()

#getwikidata()


get_pages()
for p in pagenames:
    print(p + "1--------")
    get_temp_page(p, True)
for p in pagenames:
    print(p + "2--------")
    get_temp_neighbors(p, True)
getwikidata()

#print(wikipages[0].GetNeighbors())

        #print("\n")