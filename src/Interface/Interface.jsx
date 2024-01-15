import GenerateConnections from "./GenerateConnections";
import ModelLoader from "./ModelLoader";
import './interface.css'
export default function Interface(){
    
    return <>
        <div >
            <ModelLoader/>
            <GenerateConnections/>
        </div>

    </>
}