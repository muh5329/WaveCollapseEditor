import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
export default create(devtools(subscribeWithSelector( (set)=>{
    return {
        selectedModel: -1,
        selectedModelFile:"",
        selectedRotation: 0,
        cubeSpace:[],
        connections: null,
        propagationStack : [],
        setSelectedIndex: (index)=>
        {
            set((state)=>{
                
                return { selectedModel: index}
            })
        },
        setSelectedFile: (file)=>
        {
            set((state)=>{
                useModelStore.setState({selectedModelFile: file})
                return { selectedModelFile: file}
            })
        },
        setSelectedRotation: (selectedRotation)=>
        {
            set((state)=>{
                useModelStore.setState({selectedRotation: selectedRotation})
                return { selectedRotation: selectedRotation}
            })
        },
        setCubeSpace: (cubeSpace)=>
        {
            set((state)=>{
                useModelStore.setState({cubeSpace: cubeSpace})
                return { cubeSpace: cubeSpace}
            })
        },
        setConnections: (connections)=>
        {
            set((state)=>{
                useModelStore.setState({connections: connections})
                return { connections: connections}
            })
        }
        ,
        setPropagationStack: (propagationStack)=>
        {
            set((state)=>{
                useModelStore.setState({propagationStack: propagationStack})
                return { propagationStack: propagationStack}
            })
        }
    }
})))
//useModelBrowser((state) => state.selectedModelFile)
// Non Reactive Store
export  const useModelStore = create(() => ({  selectedModel: -1,
        selectedModelFile:"", 
        cubeSpace:[], 
        selectedRotation:0,
        connections:null,
        propagationStack:  []
        }));




