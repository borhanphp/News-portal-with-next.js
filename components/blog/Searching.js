import React, {useState, useEffect} from 'react'

const Searching = (props) => {

    const [searchText, setSearchText] = useState('');


    const handleChange = (e) => {
        setSearchText(e.target.value);
        
    }

    useEffect(() => {
        props.onSearch(searchText);
    } , [searchText])


  return (
    <>
    
        <input type="text"  className="form-control" placeholder="Search" value={searchText} onChange={handleChange}/>

    
    </>
  )
}

export default Searching