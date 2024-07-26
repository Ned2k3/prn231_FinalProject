import logo from '/vite.svg';

const Logo = () => {
    return(
        <div style={{position: "absolute", display: 'flex', flexDirection: 'row', alignItems: 'center', top: "20px", left: "40px"}}>
            <img src={logo}></img>
            <h2 style={{marginBottom: '0', marginLeft: '5px'}}><span style={{fontWeight: 'bold'}}>NED</span>_CLASSROOM</h2>
        </div>
    );
}

export default Logo