import React, { useEffect, useState } from "react";
import InputComponent from "../Authentication/Login/InputComponent";
import config from "../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const Popup = ({ onClose, type }) => {
  const backgrounds = [
    "https://th.bing.com/th/id/OIP.TyYGJ1AHoTaAwKb5QioiAwHaEK?w=323&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.axzg_3fBAbIWaJgCUx1ZBgHaD_?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.xtJPA1p2lW2BPoQSTqkMbwHaEo?w=312&h=200&c=7&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.YAnXNjkx5UaxKqv9T6ut2AHaE7?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.EyxW0GXRoy8-CrZXn1fwLAHaEo?w=294&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  ];
  const getRandomString = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[randomIndex];
  };

  const history = useHistory();

  const [code, setCode] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [btnClass, setBtnClass] = useState("join-btn");
  const [classBackground, setClassBackground] = useState(getRandomString());

  //profile data
  const [profile, setProfile] = useState({
    name: '',
    image: '',
    gender: '',
    dateOfBirth: '',
  });
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    image: '',
    gender: '',
    dateOfBirth: '',
  });
  const [isEdited, setIsEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCodeChange = (value) => {
    const regex = /^#\d{6}$/; // Regular expression to match exactly 6 digits
    setIsValid(regex.test(value));
    setCode(value);
  };

  const handleChangeBackgroundClick = () => {
    setClassBackground(getRandomString());
  };

  const handleClassroomNameChange = (value) => {
    const regex = /^.{8,}$/; // Regular expression to match exactly 6 digits
    setIsValid(regex.test(value));
    setClassroomName(value);
  };

  const handleClose = () => {
    onClose(); // Call onClose function passed from parent component
  };

  const handleInputChange = (key, value) => {
    if (profile[key] !== value) {
        setEditedProfile({
          ...editedProfile,
          [key]: value,
        });
        setIsEdited(true);
      } else {
        // If value is the same as the original, do not update editedProfile
        setEditedProfile({
            ...editedProfile,
            [key]: value,
        });
        setIsEdited(false);
      }
  };


  const handleSave = async () => {
    try{
        setIsSaving(true);
        const userString = localStorage.getItem("authUser");
        if(!userString){
           localStorage.clear();
           history.push("/login");
           return;
        }
        const userId = JSON.parse(userString).id;
        if(!editedProfile.name || editedProfile.name == ''){
            alert('Bạn phải cập nhật họ và tên!');
            return;
        }
        editedProfile.image = !editedProfile.image ? '' : editedProfile.image;
        editedProfile.gender = !editedProfile.gender ? '' : editedProfile.gender;
        const updateBody = {accountId: userId, 
                            name: editedProfile.name.trim(), 
                            image: editedProfile.image.trim(), 
                            dateOfBirth: editedProfile.dateOfBirth, 
                            gender: editedProfile.gender.trim()};
        const token = localStorage.getItem("authToken");
        const response = await axios.put(config.updateProfileDataApi, updateBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
        alert(response.data.message);

        const authUser = JSON.parse(userString);
        const updateUser = {
            id: authUser.id,
            name: editedProfile.name,
            image: editedProfile.image,
            email: authUser.email
        }
        localStorage.setItem("authUser", JSON.stringify(updateUser));
        onClose();
        history.push('/home');
    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                localStorage.clear()
                localStorage.setItem("message", "Phiên đăng nhập hết hạn!");
                history.push("/login");
                return;
            }
            alert(error.response.data.message);
        }
        else console.log(error);
    }
  };

  const handleJoinClass = async (event) => {
    event.preventDefault();
    try{
        const userString = localStorage.getItem("authUser");
        if(!userString){
           localStorage.clear();
           history.push("/login");
           return;
        }
        const userId = JSON.parse(userString).id;
        const joinBody = {
            userId: userId,
            classroomCode: code
        }
        const token = localStorage.getItem("authToken");
        const response = await axios.post(config.joinClassroomApi, joinBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
        alert(response.data.message);
        onClose();
        history.push('/home');
    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                localStorage.clear()
                localStorage.setItem("message", "Phiên đăng nhập hết hạn!");
                history.push("/login");
                return;
            }
            alert(error.response.data.message);
        }
        else alert("Hệ thống đang tạm thời bị gián đoạn!");
    }
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    try{
        const userString = localStorage.getItem("authUser");
        if(!userString){
           localStorage.clear();
           history.push("/login");
           return;
        }
        const userId = JSON.parse(userString).id;
        const createBody = {
            teacherId: userId,
            classroomName: classroomName,
            classroomBackground: classBackground
        }
        const token = localStorage.getItem('authToken');
        const response = await axios.post(config.createClassroomApi, createBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
        alert(response.data.message);
        onClose();
        history.push('/home');
    }
    catch(error){
        if(error.response){
            if(error.response.status === 401){
                localStorage.clear()
                localStorage.setItem("message", "Phiên đăng nhập hết hạn!");
                history.push("/login");
                return;
            }
            alert(error.response.data.message);
        }
        else alert("Hệ thống đang tạm thời bị gián đoạn!");
    }
  };

  useEffect(() => {
    if (isValid) {
      setBtnClass("join-btn enabled");
    } else {
      setBtnClass("join-btn");
    }
  }, [{ isValid }]);


  if (type === "join") {
    return (
      <div className="popup">
        <form onSubmit={handleJoinClass}>
          <div className="popup-content">
            <div>
              <p>Tham gia lớp học</p>
            </div>
            <div className="popup-content-section class-code">
              <span style={{ fontWeight: "bold" }}>Mã lớp học</span>
              <p>Lấy thông tin mã lớp học từ giáo viên và điền vào đây</p>

              <InputComponent
                classNamed="input-class"
                type="text"
                label="Mã lớp học"
                value={code}
                onChange={handleCodeChange}
              ></InputComponent>
            </div>
            <div className="popup-content-section">
              <span className="fw-bold">Để có thể tham gia lớp học:</span>
              <ul>
                <li>Sử dụng một tài khoản được xác thực</li>
                <li>Sử dụng mã lớp học với 6 chữ số</li>
              </ul>
              <p>
                Mọi thắc mắc vui lòng liên hệ <a href="#">Trung tâm hỗ trợ</a>
              </p>
            </div>
            <div className="popup-footer">
              <button className="close-btn" onClick={handleClose}>
                Hủy
              </button>
              <button className={btnClass} type="submit">
                Tham gia
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (type === "create") {
    return (
      <div className="popup">
        <form onSubmit={handleCreateClass}>
          <div className="popup-content">
            <div>
              <p>Tạo lớp học</p>
            </div>
            <div className="popup-content-section class-code">
              <span style={{ fontWeight: "bold" }}>Tên lớp học</span>
              <p>
                Tên lớp học phải có ít nhất 8 ký tự và sẽ không thể thay đổi!
              </p>

              <InputComponent
                classNamed="input-class"
                type="text"
                label="Tên lớp học"
                value={classroomName}
                onChange={handleClassroomNameChange}
              ></InputComponent>
            </div>

            <div className="popup-content-section background-select">
              <div
                className="background-demo"
                style={{ backgroundImage: `url('${classBackground}')` }}
              ></div>
              <div className="background-demo-icon">
                <i
                  className="fa-solid fa-rotate"
                  onClick={handleChangeBackgroundClick}
                ></i>
              </div>
            </div>

            <div className="popup-footer">
              <button className="close-btn" onClick={handleClose}>
                Hủy
              </button>
              <button className={btnClass} type="submit">
                Tạo
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else if (type === "profile") {
    useEffect(() => {
        async function fetchData(){
            try {
              const userString = localStorage.getItem("authUser");
              if(!userString){
                history.push("/login");
                return;
              }
              const userId = JSON.parse(userString).id;
              const token = localStorage.getItem("authToken");
              const response = await axios.get(config.getProfileDataApi + userId, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
              }); // Replace with your API endpoint
              
              const data = response.data.data;
              setProfile(data);
              setEditedProfile(data);
            } catch (error) {
              if(error.response){
                if(error.response.status === 401){
                    localStorage.clear();
                    localStorage.setItem("message", "Phiên đăng nhập đã hết hạn!");
                    history.push("/login");
                }
                else{
                    alert(error.response.data.message);
                }
              }
              else alert("Hệ thống tạm thời bị gián đoạn!");
            }
        };
        fetchData(); 
      }, [history]);  
      
    return (
      <div className="popup">
          <div className="popup-content">
            <div className="popup-content-user-image">
                <img src={(!editedProfile.image || editedProfile.image === "") ? "https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?w=199&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7" : editedProfile.image} alt="avatar"></img>
            </div>
            <h4 className="text-center text-success">{JSON.parse(localStorage.getItem("authUser")).email}</h4>
            <br />
            <form>
                <InputComponent classNamed="input-class" type="text" label="Họ và tên" value={editedProfile.name} onChange={(value) => handleInputChange('name', value)}></InputComponent>
                <InputComponent classNamed="input-class" type="text" label="Ảnh đại diện" value={editedProfile.image} onChange={(value) => handleInputChange('image', value)}></InputComponent>
                <InputComponent classNamed="input-class" type="date" label="Ngày sinh" value={editedProfile.dateOfBirth} onChange={(value) => handleInputChange('dateOfBirth', value)}></InputComponent>
                <InputComponent classNamed="input-class" type="text" label="Giới tính" value={editedProfile.gender} onChange={(value) => handleInputChange('gender', value)}></InputComponent>
            </form>
            <div className="popup-footer">
              <button className="close-btn" onClick={handleClose}>
                Hủy
              </button>
              <button className="save-btn" onClick={handleSave} disabled={!isEdited || isSaving}>
                {isSaving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Popup;
