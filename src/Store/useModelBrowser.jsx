import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
export default create(devtools(subscribeWithSelector( (set)=>{
    return {
        selectedModel: -1,
        selectedModelFile:"",
        cubeSpace:[],
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
        setCubeSpace: (cubeSpace)=>
        {
            set((state)=>{
                useModelStore.setState({cubeSpace: cubeSpace})
                return { cubeSpace: cubeSpace}
            })
        }
    }
})))
//useModelBrowser((state) => state.selectedModelFile)

export  const useModelStore = create(() => ({  selectedModel: -1,selectedModelFile:"", cubeSpace:[]}));




