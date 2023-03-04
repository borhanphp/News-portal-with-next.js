import React from 'react'
import Link from 'next/link';
import styles from '../styles/Nav.module.css';

const Error404 = () => {
  return (
    <div className='error404'>
      <h1 className='error_h1'><span className='text-danger'>দুঃখিত!</span> <br/>
      "কিছু পাওয়া যায়নি!"</h1>
      <p style={{fontSize: '20px'}}>আপনি যা খুঁজছেন, তা পাওয়া যায়নি। ইউআরএল মিসিং কিংবা আপনি ভুলভাবে খুঁজছেন। <br/>
      দয়া করে, বিষয়টি সম্পর্কে নিশ্চিত হয়ে নিন।</p>
      <Link href="/">
          <button className={`mt-1 errorpagebtn ${styles.classifiedButton}`}>
            প্রচ্ছদে ফিরে যান
          </button>
      </Link>
    </div>
  )
}

export default Error404;