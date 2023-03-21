import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Tabs from '../components/Tab';
import Accordion from '../components/Accordion';
import { BiSupport } from 'react-icons/bi'
import { MdOutlineContactSupport, MdWhatsapp, MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md'

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!currentUser) {
        navigate("/");
      }
    })

    const books = [
        {
            id: 1,
            title: "Math Power",
            desc: "Available from Vol. 1 to Vol. 8",
            img: "https://aster.edu.my/wp-content/uploads/2023/03/photo_2023-03-01_18-06-25-1024x1024.jpg"
        },
        {
            id: 2,
            title: "Master Your Algebra",
            desc: "Available from Vol. 1 to Vol. 5, and a Special Edition",
            img: "https://aster.edu.my/wp-content/uploads/2023/03/photo_2023-03-01_17-49-56-1024x1024.jpg"
        },
        {
            id: 3,
            title: "The Anchor",
            desc: "Available from Vol. 1 to Vol. 7",
            img: "https://aster.edu.my/wp-content/uploads/2023/03/photo_2023-03-01_17-58-13-1024x1024.jpg"
        },
    ]
    
    const quizzes = [
        {
            id: 1,
            title: "Lorem ipsumq",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
        {
            id: 2,
            title: "Lorem ipsumq2",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
        {
            id: 3,
            title: "Lorem ipsumq3",
            desc: "Lorem ipsum",
            img: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        },
    ]

    const [faqs] = useState([
      {
        id: 1,
        question: 'How can I buy the books?',
        answer: 'You can buy our books at any bookstores.',
      },
      {
        id: 2,
        question: 'How long does shipping take?',
        answer: 'We ship all orders within 1-2 business days. Shipping time varies based on your location.',
      },
      // Add more FAQs here as needed
    ]);

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
                        <Link to='/books' className='link'>
                            <h1>{book.title}</h1>
                            <p>{book.desc}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>,
      },
      {
        title: 'Quizzes',
        content: 
        <div className="posts">
            {quizzes.map(quiz=>(
                <div className="post" key={quiz.id}>
                <div className="img">
                    <img src={quiz.img} alt="" />
                </div>
                <div className="content">
                    <Link to={`/books/${quiz.id}`} className='link'>
                        <h1>{quiz.title}</h1>
                        <p>{quiz.desc}</p>
                    </Link>
                </div>
                </div>
            ))}
        </div>,
      },
    ];

  return (
    <div className='home'>
      <div className="profile-card">
        <div className="avatar">
          {currentUser?.studentName && (
            <img src={currentUser?.studentPfp} alt={currentUser?.studentName} />
          )}
          {currentUser?.parentName && (
            <img src={currentUser?.parentPfp} alt={currentUser?.parentName} />
          )}
        </div>
        <div className="info">
          {currentUser?.studentName && (
            <>
              <h3>Hello, {currentUser.studentName}!</h3>
              <p>Email: {currentUser.studentEmail}</p>
              <p>School: {currentUser.studentSch}</p>
              <p>Level: {currentUser.studentLevel}</p>
            </>
          )}
          {currentUser?.parentName && (
            <>
              <h3>Hello, {currentUser.parentName}!</h3>
              <p>Email: {currentUser.parentEmail}</p>
              <p>Job: {currentUser.parentJob}</p>
              <p>Salary range: {currentUser.parentSalary}</p>
            </>
          )}
        </div>
      </div>
      <Tabs tabs={tabs} />
      <div className="accords">
        <Accordion
          title={<span><BiSupport /> Support</span>}
          content={<p>Need immediate support? <Link className='link' to='https://wa.me/60192549717'>Contact us here <MdWhatsapp/></Link></p>}
        />
        <Accordion
          title={<span><MdOutlineContactSupport /> FAQ</span>}
          content={
            <div>
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <p><MdOutlineQuestionAnswer/> {faq.question}</p>
                  <p><MdQuestionAnswer/> {faq.answer}</p>
                  <hr /> {/* Add a horizontal line separator */}
                </div>
              ))}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default Home