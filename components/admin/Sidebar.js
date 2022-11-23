import React, {useState} from 'react'
import Link from 'next/link';
import Router from 'next/router';
import {signout, isAuth} from '../../actions/auth'

import { AiOutlineDashboard } from 'react-icons/ai';

import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import styles from 'react-pro-sidebar/dist/css/styles.css';
import { GoDashboard } from 'react-icons/go';
import { SiTextpattern } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { BsFileEarmarkPostFill } from 'react-icons/bs';
import { FiUsers, FiSettings } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { RiGalleryLine, RiAdvertisementLine } from 'react-icons/ri';
import { MdOutlinePermMedia, MdOutlineCategory, MdOutlineContactPage } from 'react-icons/md';




const Sidebar = ({hideBar}) => {

const hideSidebar = () => {
  hideBar();
  console.log('clicked');
}



  return (    
    <>
   <div className="" style={{position: "fixed", top: "27px", height: "650px"}}>
      <ProSidebar width="220px" breakPoint="xs">
      <SidebarContent>
        <Menu>
          <MenuItem icon={<GoDashboard />}>
            {isAuth() && isAuth().role === 0 && (
              <Link href="/user">
              <a href="#">
                <i className="demo-pli-home" />
                 <span className="menu-title" onClick={hideSidebar}> Dashboard</span>
                <i className="arrow" />
              </a>
              </Link>
            )}
            {isAuth() && isAuth().role === 1 && (
              <Link href="/admin">
              <a href="#">
                <i className="demo-pli-home" />
                <span className="menu-title" onClick={hideSidebar} >Dashboard</span>
                <i className="arrow" />
              </a>
              </Link>
            )}
          </MenuItem>
         
          <MenuItem icon={<BiCategory/>}><Link href="/admin/crud/category-tag"><span onClick={hideSidebar}>Category</span></Link></MenuItem>
          <MenuItem icon={<BiCategory/>}><Link href="/admin/crud/subcategory"><span onClick={hideSidebar}>Subcategory</span></Link></MenuItem>
          {/* <MenuItem icon={<BiCategory/>}><Link href="/admin/crud/tags" ><span onClick={hideSidebar}>Tag</span></Link></MenuItem> */}
            

         

          {/* <MenuItem icon={<MdOutlinePermMedia />}><Link href="#">Media</Link></MenuItem> */}
          
          <MenuItem icon={<RiGalleryLine />}><Link href="/admin/gallery"><span onClick={hideSidebar}>Gallery</span></Link></MenuItem>
          
          <SubMenu icon={<BsFileEarmarkPostFill />} title="Posts">
            <MenuItem><Link href="/admin/crud/blog"><span onClick={hideSidebar}>Add Post</span></Link></MenuItem>
            <MenuItem><Link href="/admin/crud/blogs"><span onClick={hideSidebar}>All Posts</span></Link></MenuItem>
            <MenuItem><Link href="/admin/crud/allblogs"><span onClick={hideSidebar}>Posts</span></Link></MenuItem>
          </SubMenu>

          <SubMenu icon={<MdOutlineContactPage />} title="Pages">
            <MenuItem><Link href="/admin/page/addpage"><span onClick={hideSidebar}>Add Page</span></Link></MenuItem>
            <MenuItem><Link href="/admin/page/allpage"><span onClick={hideSidebar}>All Pages</span></Link></MenuItem>
          
          </SubMenu>

          <SubMenu icon={<MdOutlineContactPage />} title="Video">
            <MenuItem><Link href="/admin/crud/video"><span onClick={hideSidebar}>Add Video</span></Link></MenuItem>
            <MenuItem><Link href="/admin/video/allvideo"><span onClick={hideSidebar}>All Videos</span></Link></MenuItem>
          </SubMenu>

          <SubMenu icon={<MdOutlineContactPage />} title="Classified">
            <MenuItem><Link href="/admin/addclassified"><span onClick={hideSidebar}>Add New</span></Link></MenuItem>
            <MenuItem><Link href="/admin/allclassified"><span onClick={hideSidebar}>All Classified</span></Link></MenuItem>
            <MenuItem><Link href="/admin/classified/classifiedcat"><span onClick={hideSidebar}>Category</span></Link></MenuItem>
          </SubMenu>
          
          <MenuItem icon={<RiAdvertisementLine />}><Link href="/admin/ads/createads"><span onClick={hideSidebar}>Ads Setting</span></Link></MenuItem>
          <MenuItem icon={<FaUserShield />}><Link href="/user/update"><span onClick={hideSidebar}>Profile</span></Link></MenuItem>
          <MenuItem icon={<FiSettings />}><Link href="/admin/crud/logo"><span onClick={hideSidebar}>Setting</span></Link></MenuItem>
          <MenuItem icon={<FiSettings />}><Link href="/admin/poll"><span onClick={hideSidebar}>Create Poll</span></Link></MenuItem>
         
         
         {/* English version menu */}
          <SubMenu icon={<GrGallery />} title="English Version">
            <SubMenu title="Posts">
              <MenuItem><Link href="/admin/crud/eblog/ecreate"><span onClick={hideSidebar}>Add Post </span></Link></MenuItem>
              <MenuItem><Link href="/admin/crud/eblog/eblogs"><span onClick={hideSidebar}>All Posts</span></Link></MenuItem>
            </SubMenu>
            <MenuItem><Link href="/admin/crud/eblog/ecategory"><span onClick={hideSidebar}>Category</span></Link></MenuItem>
            <MenuItem><Link href="/admin/crud/eblog/esubcategory"><span onClick={hideSidebar}>Subcategory</span></Link></MenuItem>
            {/* <MenuItem><Link href="/admin/crud/eblog/etags"><span onClick={hideSidebar}>Tags</span></Link></MenuItem> */}
            {/* <SubMenu title="Pages">
              <MenuItem><Link href="/admin/page/about"><span onClick={hideSidebar}>About</span></Link></MenuItem>
              <MenuItem><Link href="/admin/page/contact"><span onClick={hideSidebar}>Contact</span></Link></MenuItem>
              <MenuItem><Link href="/admin/page/editor"><span onClick={hideSidebar}>Editor</span></Link></MenuItem>
              <MenuItem><Link href="/admin/page/advertisement"><span onClick={hideSidebar}>Advertisement</span></Link></MenuItem>
            </SubMenu> */}
          </SubMenu>

          <MenuItem icon={<FiUsers />}><Link href="/admin/users"><span onClick={hideSidebar}>Users</span></Link></MenuItem>

        </Menu>
      </SidebarContent>
    </ProSidebar>
    </div>

   </>

   
  );
}

export default Sidebar;
