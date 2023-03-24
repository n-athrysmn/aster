import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import avatar from '../assets/avatar.png'
import Tabs from '../components/Tab'
import Accordion from '../components/Accordion'
import { BiSupport } from 'react-icons/bi'
import { FaSchool, FaEnvelope, FaLeanpub, FaTrophy, FaBook, FaQuestion, FaBullhorn } from 'react-icons/fa'
import { MdOutlineContactSupport, MdWhatsapp, MdOutlineQuestionAnswer, MdQuestionAnswer } from 'react-icons/md'
import Announcement from '../components/Announcements'

const Home = () => {
    const { currentUser } = useContext(AuthContext)

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
    ])

    const tabs = [
      {
        title: 
        <div className="tab-title">
          <div className="tab-icon"><FaBook/></div>Books
        </div>,
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
                        </Link>
                            <p>{book.desc}</p>
                    </div>
                </div>
            ))}
        </div>,
      },
      {
        title: 
        <div className="tab-title">
          <div className="tab-icon"><FaQuestion/></div>Knowledge Library
        </div>,
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
    ]

    const today = new Date();
    const dayOfMonth = today.getDate();
    
    const cells = document.getElementsByClassName('date');
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.innerHTML == dayOfMonth) {
        cell.style.backgroundColor = '#bb944f';
      }
    }
    

  return (
    <div className='home'>
      <div className="announce">
        <div className="ann-icon"><div className="icon"><FaBullhorn/></div></div>
        <div className="ann-text"> Hello everyone, welcome to Aster's dashboard. We will be updating lives and quizes, look forward to it!</div>
        
      </div>
      <div className="top-part">
      <div className="profile-card">
        <div className="avatar">
          {/*{currentUser?.studentName && (
            <img src={currentUser?.studentPfp} alt={currentUser?.studentName} />
          )}
          {currentUser?.parentName && (
            <img src={currentUser?.parentPfp} alt={currentUser?.parentName} />
          )}*/}
          <img src={avatar} alt="avatar"/>
        </div>
        <div className="info">
          {currentUser?.studentName && (
            <>
              <h3>Hello, {currentUser.studentName}!</h3>
            </>
          )}
          {currentUser?.parentName && (
            <>
              <h3>Hello, {currentUser.parentName}!</h3>
            </>
          )}
        </div>
      </div>
      <div className="calendar">
        <h2>Month: March</h2>
        <table>
          <tr className='days'>
            <td className='date'>Sun</td>
            <td className='date'>Mon</td>
            <td className='date'>Tue</td>
            <td className='date'>Wed</td>
            <td className='date'>Thu</td>
            <td className='date'>Fri</td>
            <td className='date'>Sat</td>
          </tr>
          <tr>
            <td className='date'></td>
            <td className='date'></td>
            <td className='date'></td>
            <td className='date'>1</td>
            <td className='date'>2</td>
            <td className='date'>3</td>
            <td className='date'>4</td>
          </tr>
          <tr>
            <td className='date'>5</td>
            <td className='date'>6</td>
            <td className='date'>7</td>
            <td className='date'>8</td>
            <td className='date'>9</td>
            <td className='date'>10</td>
            <td className='date'>11</td>
          </tr>
          <tr>
            <td className='date'>12</td>
            <td className='date'>13</td>
            <td className='date'>14</td>
            <td className='date'>15</td>
            <td className='date'>16</td>
            <td className='date'>17</td>
            <td className='date'>18</td>
          </tr>
          <tr>
            <td className='date'>19</td>
            <td className='date'>20</td>
            <td className='date'>21</td>
            <td className='date'>22</td>
            <td className='date'>23</td>
            <td className='date'>24</td>
            <td className='date'>25</td>
          </tr>
          <tr>
            <td className='date'>26</td>
            <td className='date'>27</td>
            <td className='date'>28</td>
            <td className='date'>29</td>
            <td className='date'>30</td>
            <td className='date'>31</td>
            <td className='date'></td>
          </tr>
        </table>
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