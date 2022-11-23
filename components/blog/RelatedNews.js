import Link from 'next/link';
import renderHTML from 'react-render-html';
import styles from '../../styles/Related.module.css';
import moment from 'moment';
import { API, DOMAIN_IP, IMG_API } from '../../config';

const RelatedNews = ({ blog }) => {

    return (
        <div className={styles.releted_card}>
            <section>
                <Link href={`/${blog.slug}`}>
                    <a>
                        <img
                            className="img img-fluid rounded "
                            style={{ height: '250px', width: '100%' }}
                            src={`${IMG_API}/${blog?.photo}`}
                            alt={blog.title}
                        />
						<h5 className={styles.releted_title}>{blog.title}</h5>
                    </a>
                </Link>
            </section>

            {/*<div className="card-body">
                <section>
                    <Link href={`/${blog.slug}`}>
                        <a>
                            
                        </a>
                    </Link>
                    <div className="card-text">{renderHTML(blog.excerpt)}</div>
                </section>
            </div>

            <div className="card-body">
                 Posted {moment(blog.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${blog.postedBy.username}`}>
                    <a>{blog.postedBy.username}</a>
    </Link>
            </div>*/}
        </div>
    );
};

export default RelatedNews;
