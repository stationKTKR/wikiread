import json

class WikiPage:
    def __init__(self, title):
        self.title = title
        self.neighbors = []
        self.categories = []

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def AddNeighbor(self, neighbor):
        self.neighbors.append(neighbor)

    def GetNeighbors(self):
        return self.neighbors