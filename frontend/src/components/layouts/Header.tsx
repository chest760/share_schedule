import React, { useContext, useEffect,useState } from "react";
import { Drawer, IconButton, makeStyles,Box,List,ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import { useNavigate} from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import { AuthContext } from "App";
import { SignOut } from "lib/api/auth";
import Cookies from "js-cookie";
import useSize from "utils/size";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from '@material-ui/icons/Home';
import CalendarMonthIcon from '@material-ui/icons';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';






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
    const {isMobileSize} = useSize()
    const [open, setOpen] = useState<boolean>(false)

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


    const Sidebar = () =>{
        if(!loading){
            if(loginstate){
                return(
                    <Box>
                        <List component="nav">
                            <ListItem >          
                                <Button
                                style={{marginLeft:-20,marginRight:20}}
                                className={styles.changebutton}
                                onClick={()=>{setOpen(false)}}
                                component ={Link}
                                to={`/home/${userid}`}
                                >
                                <IconButton style={{color:'primary'}}><HomeIcon/></IconButton>
                                Home
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button
                                style={{marginLeft:-20,marginRight:20}}
                                onClick={()=>{setOpen(false)}}
                                className={styles.changebutton}
                                component ={Link}
                                to={`/calendar/${userid}`}
                                >
                                <IconButton style={{color:'primary'}}><EventNoteIcon/></IconButton>
                                Calendar
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button
                                style={{marginLeft:-20,marginRight:20}}
                                onClick={()=>{setOpen(false)}}
                                className={styles.changebutton}
                                component ={Link}
                                to={`/rooms/${userid}`}
                                >
                                <IconButton style={{color:'primary'}}><MeetingRoomIcon/></IconButton>
                                Room
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button
                                style={{marginLeft:-20,marginRight:20}}
                                className={styles.changebutton}
                                onClick={(e)=>{
                                    setOpen(false)
                                    handleLogout(e)
                                }}
                                >
                                <IconButton style={{color:'primary'}}><ExitToAppIcon/></IconButton>
                                    
                                Log Out
                                </Button>
                            </ListItem>
                        </List>
                    </Box>
                )
            }else{
                return(
                    <Box>
                    <List component="nav">
                        <ListItem>
                            <Button
                            style={{marginLeft:-20,marginRight:20}}
                            onClick={()=>{setOpen(false)}}
                            component = {Link}
                            to = "/login"
                            className={styles.changebutton}
                            >
                             <IconButton style={{color:'primary'}}><ExitToAppIcon/></IconButton>
                            Log In
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                            style={{marginLeft:-20,marginRight:20}}
                            onClick={()=>{setOpen(false)}}
                            component = {Link}
                            to = "/signup"
                            className={styles.changebutton}
                            >
                            <IconButton style={{color:'primary'}}><PersonAddIcon/></IconButton>
                                Sign Up
                            </Button>
                        </ListItem>
                    </List>
                </Box>   
                )
            }
        }else{
            return(
                <></>
            )
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
        <>
        {!isMobileSize
        ?   <AppBar className={styles.container}>
                <Toolbar>
                    <Typography 
                    style={{textDecorationLine:"none"}}
                    component={Link}
                    to="/home"
                    variant="h6"
                    className={styles.app}
                    >
                        Share
                    </Typography>
                    <ChangeButton />

                </Toolbar>
             </AppBar>
            
        :   <>
            <div style={{textAlign:"right"}}>
            <IconButton
            onClick={()=>{setOpen(!open)}}
            >
                <MenuIcon style={{fontSize:"150%"}}/>
            </IconButton>
            </div>
            
            <Drawer
            anchor="left"
            open={open}
            onClose ={()=>{setOpen(false)}}  
            >

                <Sidebar />
            </Drawer>
            </>
        }
        </>
        
    )
}

export default Header