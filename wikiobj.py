import json

class WikiPage:
    def __init__(self, title):
        self.title = title
        self.neighbors = []
        self.toneighbors = []
        self.fromneighbors = []
        self.sphere = -1

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

    def AddNeighbor(self, neighbor):
        if neighbor not in self.neighbors:
            self.neighbors.append(neighbor)

    def GetNeighbors(self):
        return self.neighbors
    
    def GetToNeighbors(self):
        return self.toneighbors
    
    def GetFromNeighbors(self):
        return self.fromneighbors
    
    def SetSphere(self,x):
        self.sphere = x

    def AddToNeighbor(self, neighbor):
        if neighbor not in self.toneighbors:
            self.toneighbors.append(neighbor)

    def AddFromNeighbor(self, neighbor):
        if neighbor not in self.fromneighbors:
            self.fromneighbors.append(neighbor)

    def SortLists(self):
        self.toneighbors = sorted(self.toneighbors)
        self.fromneighbors = sorted(self.fromneighbors)