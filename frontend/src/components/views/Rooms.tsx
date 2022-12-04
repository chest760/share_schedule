import React,{useContext,useState,useEffect,useCallback,useLayoutEffect } from "react";
import { Box,Grid,Card, CardHeader, CardContent, makeStyles,Theme,TextField,Button } from "@material-ui/core";
import { AuthContext,Context } from "App";
import { ShareRoomData} from "utils/index";
import {enterRoom,makeRoom,getRoom} from  "lib/api/share";
import { redirect, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme:Theme)=>({
    card:{
        marginTop: theme.spacing(7),
        margin:"auto",
        maxWidth: 300,
        minWidth: 250
    },
    cardheader :{
        fontSize:"2rem"
    },
    roomcard:{
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        margin:"auto",
        maxWidth: 300,
        minWidth: 250,
        height:40,
        paddingTop:15
    }
}))

const Rooms:React.FC = () =>{



    const styles = useStyles()
    const {userid,setUserid} = useContext(AuthContext)
    const {roomid,setRoomid,room_open,setRoom_Open} = useContext(Context)
    // const [roomid,setRoomid] = useState<number|null>(null)
    const [makepassword, setMakePassword] = useState<string>("")
    const [makeroom_name, setMakeRoom_name] = useState<string>("")
    const [enterpassword, setEnterPassword] = useState<string>("")
    const [enterroom_name, setEnterRoom_name] = useState<string>("")
    const [status, setStatus] = useState<boolean>(false)
    const [rooms, setRooms] = useState<any>([])
    // const [room_open, setRoom_Open] = useState<boolean>(false)
   
    const navigate = useNavigate()



    const EnterRoom = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()

        const data:ShareRoomData ={
            user1_id:userid,
            user2_id:userid,
            user3_id:userid,
            room_name:enterroom_name,
            password:enterpassword
        }

        try{
            const res = await enterRoom(data,userid)
            console.log(res)
            if(res.status == 200){
                setStatus(!status)
            }
        }catch(error){

        }
    }


    const MakeRoom = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        const data:ShareRoomData ={
            user1_id:userid,
            user2_id:null,
            user3_id:null,
            room_name:makeroom_name,
            password:makepassword
        }

        try{
            const res = await makeRoom(data)
            console.log(res)
            if(res.status==200){
                setStatus(!status)
            }
        }catch(error){

        }
    }

    const Link_to_Room = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,room:any) => {
        e.preventDefault()
        setRoom_Open(true)
        setRoomid(room.id)  


        
        console.log(room.id)  
    }

    

    const GetRooms = async()=>{
        try{
            const res = await getRoom()
            
            if(res.status == 200){
                
                setRooms(res.data.data)
                
            }

        }catch(error){

        }
    }




    useEffect(()=>{
        setRoom_Open(false)
        console.log("AA")
        if(roomid!=0 && room_open){
            // setRoom_Open(true)
        }
        GetRooms()
    },[status])

    useEffect(()=>{
        console.log(roomid)
        console.log(room_open)
        if(roomid!=0 && room_open){
            console.log("CCC")
            navigate(`/room/${roomid}`)
    }
    },[])


    return(
        <Grid container >
            <Grid item xs ={8} style={{textAlign:"center"}}>
                <Card className={styles.card}>
                    <CardHeader
                    titleTypographyProps={{variant:'h6' }}
                    title="roomに入る"
                    />
                    <CardContent>
                        <TextField
                        required
                        label = "room_name"
                        fullWidth
                        margin="normal"
                        onChange={(event)=>{setEnterRoom_name(event.target.value)}}
                        />
                        <TextField
                        required
                        label = "password"
                        fullWidth
                        margin="normal"
                        onChange = {(event)=>{setEnterPassword(event.target.value)}}
                        />
                        <Button
                        type = "submit"
                        variant="outlined"
                        color = "primary"
                        disabled={enterroom_name && enterpassword? false : true}
                        onClick={(e)=>{EnterRoom(e)}}
                        >
                            入室
                        </Button>
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardHeader
                    titleTypographyProps={{variant:'h6' }}
                    title="room作成"
                    />
                    <CardContent>
                        <TextField
                        required
                        label = "room_name"
                        fullWidth
                        margin="normal"
                        onChange={(event)=>{setMakeRoom_name(event.target.value)}}
                        />
                        <TextField
                        required
                        label = "password"
                        fullWidth
                        margin="normal"
                        onChange = {(event)=>{setMakePassword(event.target.value)}}
                        />
                        <Button
                        type = "submit"
                        variant="outlined"
                        color = "primary"
                        disabled={makeroom_name && makepassword? false : true}
                        onClick={(e)=>{MakeRoom(e)}}
                        >
                            作成
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs = {4} style={{textAlign:"center"}}>
                <Card className={styles.card} style={{padding:10}}>
                    Room List   
                </Card>

                {/* <Button 
                          type = "button"
                          style={{marginTop:20, textTransform: 'none'}}
                          onClick ={(e)=>{Link_to_Room (e,rooms[0])}}
                        >ss
                        </Button> */}
                
                {
                    rooms.map((room:any, index:number)=>{
                        return(
                        <div key = {index} >
                        <Button 
                          type = "button"
                          style={{marginTop:20, textTransform: 'none'}}
                          onClick ={(e)=>{Link_to_Room(e,room)}}
                        >
                            <Card className={styles.roomcard}>
                                {room.roomName}
                            </Card>
                        </Button>
                        </div>
                        )
                    })
                }
                
            </Grid>
        </Grid>
    )
}

export default Rooms