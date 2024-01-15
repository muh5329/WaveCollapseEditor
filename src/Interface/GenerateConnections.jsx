import useModelBrowser, { useModelStore } from '../Store/useModelBrowser';
export default function GenerateConnections(){

    const cubeSpace = useModelBrowser((state) => state.cubeSpace) 
    const setConnections = useModelBrowser((state) => state.setConnections) 

    const setCurrentConnections = ()=>{
        try {
            var connections = new Map();
            setConnections(connections);
            // For each model in the cubespace, check to see its neighbors ,
            //  mark its px nx, pz nz, py ny   boundries and add them to the models
            //  connections array
            for (var x in cubeSpace){
                if (cubeSpace[x] ){
                    for (var y in  cubeSpace[x]){
                        if (cubeSpace[x][y] ){
                            for (var z in cubeSpace[x][y]){
                                if (cubeSpace[x][y][z]  && cubeSpace[x][y][z].modelFile != ""){
                                    var currentConnections = {px:[],nx:[],py:[], ny:[], pz:[], nz:[] };
                                    var x = parseInt(x);
                                    var z = parseInt(z);
                                    var y = parseInt(y);
                                    var key = cubeSpace[x][y][z].modelFile+"-"+cubeSpace[x][y][z].rotation;
                                    if (connections.get(key)){
                                        currentConnections = connections.get(key);
                                    } 
                                   
                                    // px
                                    if (cubeSpace[x+1] &&  cubeSpace[x+1][y] && cubeSpace[x+1][y][z]){
                                        currentConnections.px.push(cubeSpace[x+1][y][z].modelFile+"-"+cubeSpace[x+1][y][z].rotation);
                                    }

                                    // nx
                                    if (cubeSpace[x-1] &&  cubeSpace[x-1][y] && cubeSpace[x-1][y][z]){
                                        currentConnections.nx.push(cubeSpace[x-1][y][z].modelFile+"-"+cubeSpace[x-1][y][z].rotation);
                                    }

                                    // py
                                    if (cubeSpace[x] &&  cubeSpace[x][y+1] && cubeSpace[x][y+1][z]){
                                        currentConnections.py.push(cubeSpace[x][y+1][z].modelFile+"-"+cubeSpace[x][y+1][z].rotation);
                                    }

                                    // ny
                                    if (cubeSpace[x] &&  cubeSpace[x][y-1] && cubeSpace[x][y-1][z]){
                                        currentConnections.ny.push(cubeSpace[x][y-1][z].modelFile+"-"+cubeSpace[x][y-1][z].rotation);
                                    } 

                                    // specail floor case
                                    if (y-1 < 0){
                                        currentConnections.ny.push("floor");
                                    }

                                    // pz
                                    if (cubeSpace[x] &&  cubeSpace[x][y] && cubeSpace[x][y][z+1]){
                                        currentConnections.pz.push(cubeSpace[x][y][z+1].modelFile+"-"+cubeSpace[x][y][z+1].rotation);
                                    }

                                    // nz
                                    if (cubeSpace[x] &&  cubeSpace[x][y] && cubeSpace[x][y][z-1]){
                                        currentConnections.nz.push(cubeSpace[x][y][z-1].modelFile+"-"+cubeSpace[x][y][z-1].rotation);
                                    }
                                    connections.set(cubeSpace[x][y][z].modelFile+"-"+cubeSpace[x][y][z].rotation,currentConnections);
                                }
                            }
                        }
                    }
                }
            }   
            setConnections(connections);
        } catch (e){
            console.log(e);
        }
    }
    return <>
        <div className="browser">
            <button className="generateBtn" onClick={setCurrentConnections}>Generate Connections</button>
            
        </div>
    </>
}