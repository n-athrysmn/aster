import React, { useState } from 'react'
import '../style.scss'
import Tabs from '../components/Tab'
import { Link } from 'react-router-dom'

const Books = () => {

    const questions = [
        {
            id: 1,
            title: "Question 1",
            url: "https://www.youtube.com/embed/SG_IhpbfDe8"
        },
        {
            id: 2,
            title: "Question 2",
            url: "https://www.youtube.com/embed/oftmvDhLtEU"
        },
        {
            id: 3,
            title: "Question 3",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 4,
            title: "Question 4",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 5,
            title: "Question 5",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 6,
            title: "Question 6",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 7,
            title: "Question 7",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 8,
            title: "Question 8",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 9,
            title: "Question 9",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 10,
            title: "Question 10",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 11,
            title: "Question 11",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 12,
            title: "Question 12",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 13,
            title: "Question 13",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 14,
            title: "Question 14",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 15,
            title: "Question 15",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 16,
            title: "Question 16",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 17,
            title: "Question 17",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 18,
            title: "Question 18",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 19,
            title: "Question 19",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 20,
            title: "Question 20",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 21,
            title: "Question 21",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 22,
            title: "Question 22",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 23,
            title: "Question 23",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 24,
            title: "Question 24",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 25,
            title: "Question 25",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 26,
            title: "Question 26",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 27,
            title: "Question 27",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 28,
            title: "Question 28",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 29,
            title: "Question 29",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 30,
            title: "Question 30",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 31,
            title: "Question 31",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 32,
            title: "Question 32",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 33,
            title: "Question 33",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 34,
            title: "Question 34",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 35,
            title: "Question 35",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 36,
            title: "Question 36",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 37,
            title: "Question 37",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 38,
            title: "Question 38",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 39,
            title: "Question 39",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 40,
            title: "Question 40",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 41,
            title: "Question 41",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 42,
            title: "Question 42",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 43,
            title: "Question 43",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 44,
            title: "Question 44",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 45,
            title: "Question 45",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 46,
            title: "Question 46",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 47,
            title: "Question 47",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 48,
            title: "Question 48",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 49,
            title: "Question 49",
            url: "https://www.youtube.com/embed/BQioJUAtk2E"
        },
        {
            id: 50,
            title: "Question 50",
            url: "https://www.youtube.com/embed/hEENRcoxkvU"
        },
    ]

    const [activeQuestion, setActiveQuestion] = useState(1)

    const QuestionComponent = ({ question }) => (
            
        <iframe
          title={question.title}
          className='videos'
          src={question.url}
          allowFullScreen={true}
        />
    )

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
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q201 - Q250',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q251 - Q300',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q301 - Q350',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q351 - Q400',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q401 - Q450',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q451 - Q500',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q501 - Q550',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
            title: 'Q551 - Q600',
            content: (
                <div className="answers">
                <h2 className='title'>Q151 to Q200</h2>
                    <div className="answer">
                        <div className="vid">
                            {activeQuestion && <QuestionComponent question={questions.find(q => q.id === activeQuestion)} />}
                        </div>
                        <div className="vid-links">
                        {questions.map(q=>(
                            <div key={q.id} onClick={() => setActiveQuestion(q.id)}>
                                <Link to='/books' className={`link ${activeQuestion === q.id ? 'active' : ''}`}>
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
