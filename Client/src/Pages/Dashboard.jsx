import React from "react"
import '../Styles/dashboard.css'
import { FaRegChartBar, FaEuroSign, FaDollarSign, FaBitcoin } from "react-icons/fa"
import Header from "../Components/Header"


function HomePage() {

    return (
        <div className="App">
            <div className='content'>
                <Header />
                <h1>This is the dashboard</h1>
                <div className="clearfix"></div>
            </div>
        </div>

    )
}

export default HomePage