import React from "react";
import '../Styles/dashboard.css';
import { FaRegChartBar, FaEuroSign, FaDollarSign, FaBitcoin } from "react-icons/fa";
import Header from "../Components/header/header"
import Grafico from "../Components/grafico/Grafico";


function HomePage() {

    return (
        <div className="App">
            <div className='content'>
                <Header />
                <h1>This is the dashboard</h1>
                <div class="clearfix"></div>
            </div>
        </div>

    );
}

export default HomePage;