const DashBoard = () => {
    return(
        <div className="col-8 home-body-classrooms">
            <div className="row gx-2">
              {data.map(item => (
                    <ClassroomCard key={item.code} 
                  cardCode={item.code}
                  className={item.name} 
                  classImage={item.background} 
                  teacherImage={teacherAvatar}
                  teacherName={item.type == 1 ? "" : item.teacherName}>
                </ClassroomCard>
              ))}
            </div>
          </div>
    );
}
export default DashBoard