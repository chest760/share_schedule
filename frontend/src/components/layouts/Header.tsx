import React, { useContext, useEffect } from "react";
import { useNavigate} from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import { AuthContext } from "App";
import { SignOut } from "lib/api/auth";
import Cookies from "js-cookie";



const useStyles = makeStyles(() => ({
    container : {
        backgroundColor:"blue"
    },
    app:{
        color:"inherit",
        flexGrow: 5
    },
    changebutton:{
        color:"inherit",
        textTransform: 'none'
    }
})) 

const Header: React.FC = () =>{
    const styles = useStyles()
    const navigate = useNavigate();

    type props = {onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}
      
      

    const {loading,setLoading,loginstate,setLoginstate,userid,setUserid} = useContext(AuthContext)

    const handleLogout = async (event:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        try{
            console.log("BBB")
            const res = await SignOut()

            if (res.data.success === true){
                Cookies.remove("_access_token")
                Cookies.remove("_client")
                Cookies.remove("_uid")
                setLoginstate(false)
                setUserid(0)
                navigate("/login")
            }
        }catch(err){
            console.log("Failed in sign out")
        }
    }

    const ChangeButton = () =>{
        if(!loading){
            if(loginstate){
                return(
                    <>
                        <Button
                        className={styles.changebutton}
                        component ={Link}
                        to={`/home/${userid}`}
                        >
                            Home
                        </Button>
                        <Button
                        className={styles.changebutton}
                        component ={Link}
                        to={`/calendar/${userid}`}
                        >
                            Calendar
                        </Button>
                        <Button
                        className={styles.changebutton}
                        component ={Link}
                        to={`/rooms/${userid}`}
                        >
                            Room
                        </Button>
                        <Button
                        className={styles.changebutton}
                        onClick={(e)=>handleLogout(e)}
                        >
                            Log Out
                        </Button>
                    </>
                )
            }else{
                return(
                    <>
                        <Button
                        component = {Link}
                        to = "/about"
                        className={styles.changebutton}
                        >
                            About
                        </Button>
                        <Button
                        component = {Link}
                        to = "/login"
                        className={styles.changebutton}
                        >
                            Log In
                        </Button>
                        <Button
                        component = {Link}
                        to = "/signup"
                        className={styles.changebutton}
                        >
                            Sign Up
                        </Button>
                    </>
                )
            }
        }else{
            return(
                <></>
            )
        }
    }
    




    return(
        <AppBar className={styles.container}>
            <Toolbar>
                <Typography 
                component={Link}
                to="/home"
                variant="h6"
                className={styles.app}
                >
                    Share With you
                </Typography>
                <ChangeButton />

            </Toolbar>
        </AppBar>
    )
}

export default Header