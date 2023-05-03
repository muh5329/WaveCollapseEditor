import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector( (set)=>{
    return {
      
        /**
         * Planets
         */
        planet: 'earth',
        cameraFollowShip: false,
        earth: ()=>
        {
            set((state)=>{
                if (state.planet !== "earth")
                    return { planet: 'earth'  }
                return {}    
            })
        },
       
        toggleFollowShipCamera: ()=>
        {
            set((state)=>{
                
                return { cameraFollowShip: !state.cameraFollowShip }
            })
        },

    }
}))
