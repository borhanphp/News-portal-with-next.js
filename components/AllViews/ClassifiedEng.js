import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import renderHTML from 'react-render-html';
import { API } from '../../config'
import axios from 'axios';


const ClassifiedEng = () => {


  const [classified, setClassified] = useState([]);
  const regex = /(<([^>]+)>)/ig;


  useEffect(() => {
    axios.get(`${API}/get-classifiedeng`)
    .then((res) => {setClassified(res.data)})
    .catch((err) => {console.log(err)});
  }, [])
  return (
    <div class="container px-0">
 

      <div className='row mb-4'>
        {classified && classified.map((data) => 
          <div className='col-md-3 p-2'>
            <div className='classified-box p-2'>
              <h4>
                <Link href={`/engclassified/${data?.slug}`}>
                  <a className='fw-bolder'>  {data?.title}</a>
                </Link>
              </h4>
              <p>{renderHTML(data?.body.substring(0, 100).replace(regex,''))}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassifiedEng