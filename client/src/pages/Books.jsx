import React from 'react'
import '../style.scss'
import Tabs from '../components/Tab';
import { Link } from 'react-router-dom';

const Books = () => {

    const books = [
        {
            id: 1,
            title: "Lorem ipsum",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
        {
            id: 2,
            title: "Lorem ipsum2",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
        {
            id: 3,
            title: "Lorem ipsum3",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
    ]

    const tabs = [
      {
        title: 'Books',
        content: 
        <div className="posts">
            {books.map(book=>(
                <div className="post" key={book.id}>
                    <div className="img">
                        <img src={book.img} alt="" />
                    </div>
                    <div className="content">
                        <Link to={`/books/${book.id}`} className='link'>
                            <h1>{book.title}</h1>
                            <p>{book.desc}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>,
      }
    ]

    return(
        <div className='books'>
            <Tabs tabs={tabs} />
        </div>
    )
}

export default Books
