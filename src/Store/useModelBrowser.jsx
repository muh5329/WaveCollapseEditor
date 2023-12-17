import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector( (set)=>{
    return {
      
       
        selectedModel: -1,
        selectedModelFile:"",
        setSelectedIndex: (index)=>
        {
            set((state)=>{
                
                return { selectedModel: index}
            })
        },
        setSelectedFile: (file)=>
        {
            set((state)=>{
                
                return { selectedModelFile: file}
            })
        },

       
      

    }
}))