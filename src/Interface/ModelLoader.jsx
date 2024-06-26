import './interface.css'
import React, { useState, useEffect } from 'react'
import useModelBrowser from '../Store/useModelBrowser';

/**
 * 
 * @returns  UI that controlls the modelview browser
 * 
 */
export default function ModelLoader(){

    // Load the list of models from the JSON file, under public
    const [data, setData] = useState()
    const [currentIcons, setCurrentIcons] = useState([])
    const [currentPage, setPage] = useState(0)
    const selectedModel = useModelBrowser((state) => state.selectedModel)
    let selectedRotation = useModelBrowser((state) => state.selectedRotation)
    const setSelectedModel = useModelBrowser((state) => state.setSelectedIndex)
    const setSelectedFile = useModelBrowser((state) => state.setSelectedFile)
    const setSelectedRotation = useModelBrowser((state) => state.setSelectedRotation)
    const pageSize = 12;
    
 
    /**
     *  setCurrentPage
     *       Changes  the display icons on the browser to show the currently selected
     *              models.   
     * 
     */
    const setCurrentPage = (data, currentPage)=>{
        try {
            let icons = []
            let iconIndex = 0
            const startingIndex = currentPage * pageSize
            for (let i = startingIndex; i < pageSize + startingIndex ; i++){
                let icon = data[i].icon
                icons[iconIndex] = window.location.origin + icon
                iconIndex++; 
            }
            setCurrentIcons(icons)
            setSelectedModel(-1) // Reset selected
        } catch (e){
            console.log(e);
        }
 
    }

    const getNextPage = () => {
        var page = 0;
        if (currentPage < data.length / pageSize){
             page = currentPage + 1;
             setPage(currentPage + 1 )
        }
        setCurrentPage(data, page)
    }

    const getPreviousPage = () => {
        var page = 0;
        if (currentPage >= 1){
            page =  currentPage - 1 ;
            setPage(page )
        }    
        setCurrentPage(data, page)
    }
    
    const getCurrentRotation = () => {
        if (selectedRotation < 360 )
            selectedRotation+=90;
        else selectedRotation =0;
        setSelectedRotation(selectedRotation);
    }

    const fetchJson = () => {
        fetch('./models.json')
        .then(response => {
            return response.json();
        }).then(data => {
            setData(data);
            setCurrentPage(data, currentPage);
        }).catch((error) => {
            console.error(error);
        });
    }

    const selectModel = (e) =>{
        e.stopPropagation()
        const targetID = e.target.id
        const dataIndex = currentPage * pageSize + parseInt(targetID)
        setSelectedModel(targetID)
        setSelectedFile(data[dataIndex].file)
    }

    useEffect(() => {
        fetchJson()
    },[])

    return <>
        {/*  */}
        <div className="browser">

            {/** Row 1 */}
            <div className="content">
                <div className={`key ${selectedModel == 0 ? 'active': ''} ` } id={0} onClick={selectModel}>
                    {currentIcons[0] ?  <img  className="icon" src={currentIcons[0]} id={0} /> : <></> }
                </div>
                <div className={`key ${selectedModel == 1 ? 'active': ''}  ` } id={1} onClick={selectModel} >
                    {currentIcons[1] ?  <img  className="icon" src={currentIcons[1]} id={1}/> : <></> }
                </div>
                <div className={`key  ${selectedModel == 2 ? 'active': ''} ` } id={2} onClick={selectModel} >
                    {currentIcons[2] ?  <img  className="icon" src={currentIcons[2]} id={2}/> : <></> }
                </div>
                
            </div>  

            {/** Row 1 */} 
            <div className="content">
                <div className={`key ${selectedModel == 3 ? 'active': ''}  ` } id={3} onClick={selectModel} >
                    {currentIcons[3] ?  <img  className="icon" src={currentIcons[3]} id={3}/> : <></> }
                </div>
                <div className={`key ${selectedModel == 4 ? 'active': ''} ` } id={4} onClick={selectModel}>
                    {currentIcons[4] ?  <img  className="icon" src={currentIcons[4]} id={4}/> : <></> }
                </div>
                <div className={`key ${selectedModel == 5 ? 'active': ''}  ` } id={5} onClick={selectModel}>
                    {currentIcons[5] ?  <img  className="icon" src={currentIcons[5]} id={5}/> : <></> }
                </div>
            </div>   

            {/** Row 3 */} 
            <div className="content">
                <div className={`key ${selectedModel == 6 ? 'active': ''}  ` } id={6} onClick={selectModel}>
                    {currentIcons[6] ?  <img  className="icon" src={currentIcons[6]} id={6}/> : <></> }
                </div>
                <div className={`key ${selectedModel == 7 ? 'active': ''} ` } id={7} onClick={selectModel}>
                    {currentIcons[7] ?  <img  className="icon" src={currentIcons[7]} id={7}/> : <></> }
                </div>
                <div className={`key  ${selectedModel == 8 ? 'active': ''} ` } id={8} onClick={selectModel}>
                    {currentIcons[8] ?  <img  className="icon" src={currentIcons[8]} id={8}/> : <></> }
                </div>
            </div> 

            {/** Row 4 */} 
            <div className="content ">
                <div className={`key ${selectedModel == 9 ? 'active': ''}  ` } id={9} onClick={selectModel}>
                    {currentIcons[9] ?  <img  className="icon" src={currentIcons[9]} id={9}/> : <></> }
                </div>
                <div className={`key ${selectedModel == 10 ? 'active': ''}  ` } id={10} onClick={selectModel}>
                    {currentIcons[10] ?  <img  className="icon" src={currentIcons[10]} id={10}/> : <></> }
                </div>
                <div className={`key ${selectedModel == 11 ? 'active': ''}  ` } id={11} onClick={selectModel}>
                    {currentIcons[11] ?  <img  className="icon" src={currentIcons[11]} id={11}/> : <></> }
                </div>
            </div> 

            {/** Nav */} 
            <div className="content ">
                <div className="right-nav " onClick={getPreviousPage}>  <img  className="icon" src="./icons/arrow_left.png"/>  </div> 
                <div className="right-nav" onClick={getCurrentRotation}> <img  className={`icon rotate${selectedRotation}` } src="./icons/right-angle.png"/>  </div>
                <div className="right-nav " onClick={getNextPage}>  <img  className="icon" src="./icons/arrow_right.png"/>  </div>
            </div>
            
        </div>

    </>
}
