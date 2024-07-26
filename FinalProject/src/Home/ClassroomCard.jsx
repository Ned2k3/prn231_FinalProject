import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ClassroomCard = ({
  className,
  teacherName,
  classImage,
  teacherImage,
}) => {
  return (
    <div className="col-md-4 col-12">
      <Link to='/home'>
        <div className="mcard mb-4">
          <div
            className="card-header"
            style={{
              backgroundImage: `url(${classImage})`,
              backgroundPosition: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <p className="card-header-classname">{className}</p>
            <p className="card-header-teachername">{teacherName}</p>
            <div className="card-header-teacherimage">
              <img src={teacherImage}></img>
            </div>
          </div>
          <div className="card-body"></div>
          <div className="card-footer"></div>
        </div>
      </Link>
    </div>
  );
};

export default ClassroomCard;
