import React from 'react'
import Link from 'next/link'
import {API} from '../../config'
import Gallery from '../../components/admin/Gallery'
import StyleLinks from '../../components/StyleLinks'

const gallery = ({images}) => {

  
  return (
  <>
 
  <Gallery/>
  <StyleLinks/>
  </>
  )
}



export default gallery