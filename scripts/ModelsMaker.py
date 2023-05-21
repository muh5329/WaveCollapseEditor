import os
import json
import re 


path = r'/Users/muneebhaq/Documents/projects/WaveCollapseEditor/public/castle/'
# Get List of files
def getFileNames():   
    # folder path
    dir_path =  r'/Users/muneebhaq/Documents/projects/WaveCollapseEditor/public/castle/'

    # list to store files
    res = []
    
    # Iterate directory
    for path in os.listdir(dir_path):
        # check if current path is a file
        if os.path.isfile(os.path.join(dir_path, path)):
            res.append(path)
    
    return res

# Build Models JSON objects
def buildModelsObj(fileNames):
    id = 0
    objs = []
    for fileName in fileNames:
        name =  re.split("\.", fileName)[0]
        obj = {
            "id": id,
            "name":name,
            "icon":path+"isometric/"+name+"_NE.png",
            "file":path+fileName,
            "connections":{
                "xPos":[],
                "xNeg":[],
                "yPos":[],
                "yNeg":[],
                "zPos":[],
                "zNeg":[]
            }, 
            "rotation": 1
        }
        
        objs.append(obj)
        id += 1
      
    return objs

# Save Models to data folder
def writeObjsToData(obj):
    
    # Serializing json
    json_object = json.dumps(obj, indent=4)

    # Delete old file first
    if os.path.exists("models.json"):
        os.remove("models.json")
    else:
        print("The file does not exist") 
  
    
    # Writing to sample.json
    with open("models.json", "a") as outfile:
        outfile.write(json_object)


# Defining main function
def main():
    filenames = getFileNames()
    objs = buildModelsObj(filenames)
    writeObjsToData(objs)
  
  

# __name__
if __name__=="__main__":
    main()





