import Link from "next/link";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { API } from '../../config';
import axios from 'axios';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Wrapper = styled.div`
    height: 31px;
    font-weight: bold;
    border-bottom: 1px solid antiquewhite;
    font-size: 16px;
`;
const Wrapper_inner = styled.div`
    margin-left: 0px;
    margin-right: 0px;
    background: white;
    align-items: center;
    height: 30px;
    display: flex;
    justify-content: space-between;
    grid-gap: 10px;
`;
const Wrapper_inner_left = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    grid-gap: 10px;
    height: 100%;
`;
const Dateset = styled.div`
    background: #3e3e3e0d;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0px 20px;
`;

const Topmid = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    grid-gap: 13px;
    color: #2980b9;
`;

const Socialmini = styled.div`
    display: flex;
`;

const Topnav = ({iCross}) => {

    const clearSearch = () => {
        iCross();
    }

    const [link, setLink] = useState([]);

    useEffect(() => {
        axios.get(`${API}/get-social`)
        .then((res) => {setLink(res.data)})
        .catch((err) => {console.log(err)});
    }, [])
   
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "Augast", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    let today = new Date();
    let date =''+''+today.getDate()+' '+monthNames[(today.getMonth())]+' '+today.getFullYear();
    let dayName = days[today.getDay()];


    const [page, setPage] = useState([]);
    useEffect(() => {
        axios.get(`${API}/topmenu`)
        .then((res) => {setPage(res.data)})
        .catch((err) => {console.log(err)});
        console.log(page);
    }, [])
   
  return (
    
    <>
        <Wrapper>
            <div className="container px-0">
                <Wrapper_inner>
                    <Wrapper_inner_left>
                        <Dateset>
                            {dayName},&nbsp;{date} 
                        </Dateset>
                            
                        <Topmid>
                            {/* <Link href="/site-pages/about">আমাদের সম্পর্কে</Link>&nbsp;&nbsp;&nbsp;
                            <Link href="/site-pages/contact">যোগাযোগ</Link> */}
                            {page && page?.map((item, index) => 
                                <Link href={`/site-pages/${item.slug}`} key={index}>
                                <a onClick={clearSearch}>
                                    {item.title}&nbsp;
                                </a>
                                </Link>
                            )}
                        </Topmid>
                    </Wrapper_inner_left>

                    <Socialmini>
                        {link.map((singleData, index) => {
                            return (<div key={index}>
                                    <Link href={singleData.facebook} key={singleData.facebook}><a><FacebookRoundedIcon sx={{ fontSize: 20 }} /></a></Link>&nbsp;
                                    <Link href={singleData.twitter} key={singleData.twitter}><a><TwitterIcon sx={{ fontSize: 20 }}/></a></Link>&nbsp;
                                    <Link href={singleData.youtube} key={singleData.youtube}><a><YouTubeIcon sx={{ fontSize: 20 }}/></a></Link>
                                </div> 
                            )
                        })}
                    </Socialmini>
                </Wrapper_inner>
            </div>
        </Wrapper>
    </>
  );
};

export default Topnav;
