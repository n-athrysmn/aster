import React, { useState } from 'react'
import '../style.scss'
import Tabs from '../components/Tab';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'

const Books = () => {

    const questions = [
        {
            id: 1,
            title: "Question 1",
            url: "https://www.youtube.com/watch?v=KmOVNVZEP9o&list=RDSxHmoifp0oQ&index=27&ab_channel=AOMGOFFICIAL"
        },
        {
            id: 2,
            title: "Question 2",
            url: "https://www.youtube.com/watch?v=KmOVNVZEP9o&list=RDSxHmoifp0oQ&index=27&ab_channel=AOMGOFFICIAL"
        },
        {
            id: 3,
            title: "Question 3",
            url: "https://www.youtube.com/watch?v=SG_IhpbfDe8&ab_channel=AsterEdu"
        },
    ]

    const [activeQuestion, setActiveQuestion] = useState(1);

    const QuestionComponent = ({ question }) => (
        <div className="video-container">
            <YouTube videoId={question.url}/>
        </div>
    );

    const tabs = [
        {
            title: 'Q1-Q50',
            content: (
                <div className="answers">
                    <h2 className='title'>Q1 to Q50</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div className="content" key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className='link'>
                                    <h3>{q.title}</h3>
                                </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Q51 - Q100',
            content: (
                <div className="answers">
                <h2 className='title'>Q51 to Q100</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div className="content" key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className='link'>
                                    <h3>{q.title}</h3>
                                </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Q101 - Q150',
            content: (
                <div className="answers">
                <h2 className='title'>Q101 to Q150</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div className="content" key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className='link'>
                                    <h3>{q.title}</h3>
                                </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Q151 - Q200',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div className="content" key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className='link'>
                                    <h3>{q.title}</h3>
                                </Link>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ),
        },
    ]

    return(
        <div className='books'>
            <h1>Book Answers</h1>
            <Tabs tabs={tabs} />
        </div>
    )
}

export default Books
