import ModelLoader from "./ModelLoader";
import './interface.css'
export default function Interface(){

    return <>
        < div >
        
            {/* Space Ship Controls */}
            <div className="browser">

                {/** Row 1 */}
                <div className="content">
                    <div className={`key } ` } >
                    </div>
                    <div className={`key } ` } >
                    </div>
                    <div className={`key } ` } >
                    </div>
                    
                </div>  

                {/** Row 1 */} 
                <div className="content">
                    <div className={`key  ` } >
                    </div>
                    <div className={`key  ` } >
                    </div>
                    <div className={`key  ` } >
                    </div>
                </div>   

                {/** Row 3 */} 
                <div className="content">
                    <div className={`key  ` } >
                    </div>
                    <div className={`key ` } >
                    </div>
                    <div className={`key  ` } >
                    </div>
                </div> 

                {/** Row 4 */} 
                <div className="content ">
                    <div className={`key  ` } >
                    </div>
                    <div className={`key  ` } >
                    </div>
                    <div className={`key  ` } >
                    </div>
                </div> 

                 {/** Nav */} 
                 <div className="content ">
                    <div className="left-nav "></div> 
                    <div className="right-nav "></div>
                 </div>
                 
                 

            </div>



            
        </div>

    </>
}