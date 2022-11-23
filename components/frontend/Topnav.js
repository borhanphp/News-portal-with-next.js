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

const Topnav = () => {

    const [link, setLink] = useState([]);

    useEffect(() => {
        axios.get(`${API}/get-social`)
        .then((res) => {setLink(res.data)})
        .catch((err) => {console.log(err)});
    }, [])
   
    const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন","জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বার", "ডিসেম্বর"];
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const bdate=["০","০১","০২","০৩","০৪","০৫","০৬","০৭","০৮","০৯","১০","১১","১২","১৩","১৪","১৫","১৬","১৭","১৮","১৯","২০","২১","২২","২৩","২৪","২৫","২৬","২৭","২৮","২৯","৩০","৩১"];
    
    const entob = (input) => {
        const bnumbers =["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
        var output = [];
        for (var i = 0; i < input.length; ++i) {
            if (bnumbers[input[i]]) {
            output.push(bnumbers[input[i]]);
            } else {
            output.push(input[i]);
            }
        }
        return output.join('');
    };
    
    let today = new Date();
    let date = bdate[(today.getDate())]+' '+monthNames[(today.getMonth())] +' '+ entob((today.getFullYear().toString()));
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
                                <a>
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
