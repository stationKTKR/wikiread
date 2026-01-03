import wikipedia

wikipages = []

def get_pages():
    with open("wikipages.txt") as f:
        for x in f:
            if (x.strip() != ""):
                try: 
                    page = wikipedia.page(title=x.strip())
                    #print(page.title)
                    wikipages.append(page)
                except wikipedia.exceptions.PageError as pe:
                    print("got pe")
                    print(x.strip())
                    page = wikipedia.page(title=x.strip(),auto_suggest=False)
                    wikipages.append(page)
                except Exception as inst:
                    
                    print("error: " + x)
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

get_pages()
print(wikipages)
#print_links(page_py)