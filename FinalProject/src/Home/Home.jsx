import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ClassroomCard from "./ClassroomCard";
import Header from "./Header";
import "./Home.css";
import config from "../../config";
import axios from "axios";
import { Router, Routes, Route } from "react-router-dom/cjs/react-router-dom";
import DashBoard from "./Classroom/Dashboard";

const Home = () => { 
     
  const img = JSON.parse(localStorage.getItem("authUser")).image;
  const teacherAvatar = (!img || img === "") ? "https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7" : img;

  //define useState here
  const [data, setData] = useState([]);

  const history = useHistory();
  const location = useLocation();

  async function getCards(){
    try{
        if(!localStorage.getItem("authUser")){
            history.push("/login");
            localStorage.setItem("message", "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        }

        const userId = JSON.parse(localStorage.getItem("authUser")).id;
        const token = localStorage.getItem("authToken");
        const response = await axios.get(config.getClassroomCardsApi + userId, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
        setData(response.data.data);
    }catch(error){
        if(error.response){
            if(error.response.status === 401){
                localStorage.clear()
                localStorage.setItem("message", "Phiên đăng nhập hết hạn!");
                history.push("/login");
                return;
            }
            alert(error.response.data.message);
        }
        else{
            alert("Hệ thống tạm thời bị gián đoạn!");
        }
    }
  };
  
  useEffect(() => {
    getCards();
  }, [location])

  return (
    <>
      <Header avatar={teacherAvatar}></Header>
      <div className="home-body">
        <div className="row home-body-row">
          <div className="col-2 home-body-menu">
            <div className="home-body-menu-section">
              <Link to="/home">
              <div className="home-body-menu-section-tab">
                <div className="home-body-menu-tab icon">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div className="home-body-menu-section-tab text">Home</div>
              </div>
              </Link>
              <div className="home-body-menu-section-tab">
                <div className="home-body-menu-section-tab icon">
                  <i className="fa-regular fa-calendar"></i>
                </div>
                <div className="home-body-menu-section-tab text">Calendar</div>
              </div>
            </div>

            <div className="home-body-menu-section">
              <div className="home-body-menu-section-tab">
                <div className="home-body-menu-tab icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                <div className="home-body-menu-section-tab text">Teaching</div>
              </div>
            </div>

            <div className="home-body-menu-section">
              <div className="home-body-menu-section-tab">
                <div className="home-body-menu-tab icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="home-body-menu-section-tab text">Enrolled</div>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};
export default Home;
