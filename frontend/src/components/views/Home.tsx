import { Container, Grid, IconButton, makeStyles,Theme,Card,CardContent,Button, CardHeader,useMediaQuery } from "@material-ui/core";
import React,{useEffect,useContext,useState} from "react";
import sample_img from "../../img/sample.jpg";
import { AuthContext } from "App";
import { getCurrentUser } from "lib/api/auth";
import { Link } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from "react-modal";
import { getEvent,deleteEvent } from "lib/api/get";
import useSize from "utils/size";


const useStyles = makeStyles((theme:Theme) => ({
    container : {
        padding:"1rem"
    },
    item :{
        textAlign:"center"
    },
    image :{
        width: "80%",
        height: "auto",
        borderRadius: "50%",
        marginBottom: 20,
    },
    roomcard:{
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        margin:"auto",
        maxWidth: 350,
        minWidth: 250,
        height:40,
        paddingTop:15
    }
}))


const Home: React.FC = () =>{
    const {isMobileSize} = useSize()

    type eventType =[
        {
        title:string
        start:string
        end: string
        }
    ]


    const styles = useStyles()
    const [name,setName] = useState<string>("") 
    const [todo,setTodo] = useState<string>("") 
    const [todoevent,setTodoevent] = useState<boolean>(false) 
    const [events, setEvents] = useState<eventType>([{title:" ",start:" ",end:" "}])
    const {setCurrentUser} = useContext(AuthContext)
    const [id,setId] = useState<string>("")
    const [render, setRender] = useState<boolean>(false)


    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const handleDelete = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()

        try{
            const res = await deleteEvent(id)
            if (res?.status === 200){
                console.log("DELETE")
                setRender(!render)
            }
        }catch(error){

        }
    }
    
    const Alert = () =>{
        return(
            <Card style={{maxWidth:350,margin:"auto",top:"20%",position: "absolute",left:"50%",transform:"translate(-50%, -50%)", zIndex:2,paddingLeft:20,paddingRight:20}}>
                <CardHeader
                style={{textAlign:"center"}}
                title={`'${todo}'は完了しましたか？`}
                titleTypographyProps={{variant:'subtitle1'}}
                />
                <CardContent>
                    <div style={{display:"flex"}}>
                        <Button
                        style={{marginRight:30}}
                        type="submit"
                        variant="outlined"
                        color = "primary"
                        onClick={(e)=>{
                            setTodoevent(false)
                            handleDelete(e)
                        }}
                        >
                            完了
                        </Button>
                        <Button
                        type="submit"
                        variant="outlined"
                        color = "primary"
                        onClick={()=>{setTodoevent(false)}}
                        >
                            いいえ
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }



    

    const handleGetCurrentUser = async() =>{
        try{
            
            const res = await getCurrentUser()
            console.log(res?.data)
            if (res?.status === 200){
                setName(res?.data.currentUser.name)
            }
        }catch(error){
        }

        try{
            const res_event = await getEvent()
            if (res_event?.status === 200){
                setEvents(res_event?.data.data)
            }
        }catch(error){

        }
    }

    useEffect(()=>{
       
        handleGetCurrentUser()
    },[setCurrentUser,render])

    return(
            <>
            {!isMobileSize?
                <Grid container className={styles.container} style={{position: "relative",margin:"auto", marginTop:"3rem",zIndex:1}}>
                {todoevent?
                    <Alert />
                    :<></>} 
                    <Grid item xs ={4} style={{textAlign:"center"}}>
                        {/* <img src={sample_img} className={styles.image}/> */}
                        <table style={{margin:"auto",fontSize:"110%"}}>
                            <thead>
                                <tr>
                                    <th style={{paddingRight : 40}}>名前 </th>
                                    <th style={{paddingRight : 20}}>{name}</th>
                                    <th>
                                    {/* <IconButton
                                      component = {Link}
                                      to = "/edit"
                                    >
                                        <SettingsIcon />
                                    </IconButton> */}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </Grid>
                    <Grid item xs ={8} className={styles.item}>
                        <Card className={styles.roomcard} style={{marginBottom:30}}>
                            To Do
                        </Card>

                    {
                        events.map((event:any, index:number)=>{
                            return(
                                <div key = {index} >
                                
                                {event.todo?

                                    <Button 
                                    type = "button"
                                    style={{marginTop:20, textTransform: 'none'}}
                                    onClick ={(e)=>{
                                        setTodo(event.title)
                                        setTodoevent(true)
                                        setId(event.id)
                                    }}
                                    >
                                    <Card className={styles.roomcard}>
                                        {event.title}
                                        &nbsp;&nbsp;&nbsp;
                                        {event.end.slice(5,7)+"月"}
                                        {event.end.slice(8,10)+"日"}
                                        &nbsp;
                                        {event.end.slice(11,13)+"時"}
                                        {event.end.slice(14,16)+"分"}
                                    </Card>
                                    </Button>
                               :<></>}
                            </div>
                            )
                        })
                    }
                    </Grid>
                </Grid>
            :
            <Grid container className={styles.container} style={{position: "relative", zIndex:1}}>
                {todoevent?
                    <Alert />
                    :<></>} 
                    <Grid item xs ={12} style={{textAlign:"center",marginBottom:20}}>
                        {/* <img src={sample_img} className={styles.image}/> */}
                        <table style={{margin:"auto",fontSize:"110%"}}>
                            <thead>
                                <tr>
                                    <th style={{paddingRight : 40}}>名前 </th>
                                    <th style={{paddingRight : 20}}>{name}</th>
                                    <th>
                                    {/* <IconButton
                                      component = {Link}
                                      to = "/edit"
                                    >
                                        <SettingsIcon />
                                    </IconButton> */}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </Grid>
                    <Grid item xs ={12} className={styles.item}>
                        <Card className={styles.roomcard} style={{marginBottom:30}}>
                            To Do
                        </Card>

                    {
                        events.map((event:any, index:number)=>{
                            return(
                                <div key = {index} >
                                
                                {event.todo?

                                    <Button 
                                    type = "button"
                                    style={{marginTop:20, textTransform: 'none'}}
                                    onClick ={(e)=>{
                                        setTodo(event.title)
                                        setTodoevent(true)
                                        setId(event.id)
                                    }}
                                    >
                                    <Card className={styles.roomcard}>
                                        {event.title}
                                        &nbsp;&nbsp;&nbsp;
                                        {event.end.slice(5,7)+"月"}
                                        {event.end.slice(8,10)+"日"}
                                        &nbsp;
                                        {event.end.slice(11,13)+"時"}
                                        {event.end.slice(14,16)+"分"}
                                    </Card>
                                    </Button>
                               :<></>}
                            </div>
                            )
                        })
                    }
                    </Grid>
                </Grid>
            }
            </>
       
    )
}

export default Home