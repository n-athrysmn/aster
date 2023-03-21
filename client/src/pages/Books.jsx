import React from 'react'
import '../style.scss'
import Tabs from '../components/Tab';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube'

const Books = () => {

    const questions = [
        {
            id: 1,
            title: "Question 1",
            url: "SG_IhpbfDe8"
        },
        {
            id: 2,
            title: "Question 2",
            url: "oftmvDhLtEU"
        },
        {
            id: 3,
            title: "Question 3",
            url: "BQioJUAtk2E"
        },
    ]

    const mobileWidth = 320;
    const mobileHeight = 240;
    const tabletWidth = 300;
    const tabletHeight = 700;
    const desktopWidth = 720;
    const desktopHeight = 690;

    const tabs = [
      {
        title: 'Q1-Q50',
        content: 
        <div className="posts">
            {questions.map(q=>(
                <div className="post" key={q.id}>
                    <div className="img">
                        <div className="video-container">
                            <YouTube videoId={q.url} opts={{
                                height: mobileHeight,
                                width: mobileWidth
                            }}/>
                        </div>
                        <style>{`
                            @media (min-width: 540px) {
                                .video-container {
                                    width: ${tabletWidth}px;
                                    height: ${tabletHeight}px;
                                }
                                .video-container iframe {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            @media (min-width: 720px) {
                                .video-container {
                                    width: ${desktopWidth}px;
                                    height: ${desktopHeight}px;
                                }
                            }
                        `}</style>
                    </div>
                    <div className="content">
                        <Link to={`/questions/${q.id}`} className='link'>
                            <h1>{q.title}</h1>
                            <p>{q.desc}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>,
      },
    ]

    return(
        <div className='home'>
          <Tabs tabs={tabs} />
        </div>
    )
}

export default Books
