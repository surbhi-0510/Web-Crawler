import React from "react"
import SavedCard from "../SavedCard"
import axios from "axios"

// RIGHT SIDE OF NAVIGATION BAR THAT CONTAINS SAVED NEWS
const NavSave=()=>{
    const [savedNews,setSavedNews]=React.useState([])

    function viewSavedNews() {
        // FETCHING SAVED NEWS
        axios.get('http://localhost:8000/viewsavednews')
        .then(news=>{
            setSavedNews(news.data)
        })
        .catch(err=>console.log(err))
      }
      
      function deleteClicked(_id){
        // DELETING SAVED NEWS
        axios.delete("http://localhost:8000/deletesavednews",{data:{"_id":_id}})
        .then(news=>{
            const updatedNews=viewSavedNews()
            setSavedNews(updatedNews)
        })
        .catch(err=>console.log(err))
      }

      React.useEffect(()=>{
        viewSavedNews()
      },[savedNews])

    return(
      <div className="mainArea">
        {
        savedNews.map((el)=><SavedCard image={el.image} tagLine={el.tagLine} url={el.url} _id={el._id} deleteClicked={deleteClicked}/>)
        }
      </div>
    // <>
    // {
    //     savedNews.map((el)=><SavedCard image={el.image} tagLine={el.tagLine} url={el.url} _id={el._id} deleteClicked={deleteClicked}/>)
    // }
    // </>
    )
}

export default NavSave
