import React from 'react'
import styles from './header.module.scss'
import mygif from "../../images/final.gif"
import insta from '../../images/insta.jpeg'
import twitter from '../../images/twitter.png'
import profile from "../../images/profile.jpeg"
import logout from '../../images/logout.jpg'
import { Popover } from 'antd';
import { useDispatch,  } from 'react-redux'
import { emailId, gender, name, role } from '../../base/reducer/loginReducer'
import { useNavigate } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate ()
    const text =  sessionStorage.getItem("role") == 1 ? <h3  className={styles.Popover_content} >ADMIN</h3> : sessionStorage.getItem("role")== 2 ? <h3 >MANAGER</h3> : <h3 >CUSTOMER</h3> ;

    const content = (
        <div >
            <p>{sessionStorage.getItem("emailId")}</p>
            <p>{sessionStorage.getItem("name")}</p>
        </div>
    );

    const doLogout = () =>{
        dispatch(emailId(''))
        dispatch(gender(''))
        dispatch(role(''))
        dispatch(name(''))
        sessionStorage.removeItem("emailId")
        sessionStorage.removeItem("name")
        navigate('/')
    }
    return (<div>
        <img className={styles.gif} src={mygif} alt="my-gif"  />
        <img className={styles.insta} src={insta} alt="insta" />
        <img className={styles.twitter} src={twitter} alt="twitter" />
        <img className={styles.logout} src={logout} alt="my-gif" onClick={doLogout} />
        <div className={styles.Popover_content}>
            <Popover placement="bottomRight" title={text} content={content} trigger="click">
                <img className={styles.profile} src={profile} alt="my-gif" />
            </Popover>
        </div>


        <h1 className={styles.headerone}  >FLIX MOVIES</h1>

    </div>

    )
}

export default Header   