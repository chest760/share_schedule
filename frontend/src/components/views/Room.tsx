import { makeStyles,Button,Card,CardContent, CardHeader,Theme, TextField,Radio,RadioGroup,FormControlLabel,FormControl,Select,Checkbox, FormGroup, InputLabel, MenuItem } from "@material-ui/core";
import React, { useCallback, useEffect,useState,useContext } from "react";
import FullCalendar,{DateSelectArg, EventClickArg} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { registerEvent, getEventofAll, updateEvent,deleteEvent,deleteRoom } from "lib/api/get";
import { CalendarData } from "utils/index";
import { Style } from "@material-ui/icons";
import { minutes,hours } from "utils/time";
import { Console } from "console";
import { Context,AuthContext } from "App";
import { useNavigate } from "react-router-dom";
import useSize from "utils/size";

const useStyles = makeStyles((theme:Theme)=>({
    root:{
        margin:"auto",
    },
    card:{
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(7),
        margin:"auto",
        maxWidth: 500,
        minWidth:350
    },
    header : {
        textAlign:"center",
        paddingTop:theme.spacing(3),
    },
    content:{
        marginRight:10,
        marginLeft: 10
    },
    resize:{
        fontsize:"3rem"
    }
}))

const Room:React.FC = () =>{
    const {isMobileSize} = useSize()
    
    type eventType =[
        {
        title:string
        start:string
        end: string
        color: string
        }
    ]

    var list:Array<eventType> = [] 

    const styles = useStyles()
    const navigate = useNavigate()
    const [events, setEvents] = useState<Array<eventType>>([])
    const [name1, setName1] = useState<string>("")
    const [name2, setName2] = useState<string>("")
    const [name3, setName3] = useState<string>("")
    const [selectStartData, setSelectStartData] = useState<string>("")
    const [selectEndData, setSelectEndData] = useState<string>("")
    const [todo,setTodo] = useState<boolean>(false)
    const [title,setTitle] = useState<string>("")
    const [screen,setScreen] = useState<boolean>(false)
    const [changescreen, setChangeScreen] = useState<boolean>(false)
    const [post, setPost] = useState<boolean>(false)
    const [starthour, setStartHour] = useState<number>(0)
    const [startmin, setStartMin] = useState<number>(0)
    const [endhour, setEndHour] = useState<number>(0)
    const [endmin, setEndMin] = useState<number>(0)
    const [scheduleID, setScheduleID] = useState<string>("")
    const [deleteAlert, setDeleteAlert] = useState<boolean>(false)
    const [allDay, setAllDay] = useState<boolean>(true)

    const {roomid,setRoomid} = useContext(Context)
    const {userid} = useContext(AuthContext)


    const handlegetEvent = async () =>{
        try{
            console.log(roomid)
            const res = await getEventofAll(roomid)
            console.log(res.data)
            
            if (res?.status === 200){ 
                console.log("get events")
                console.log(list)
                if(res?.data.data1 != null){
                    setName1(res.data.user1.name)
                    for(const value of res?.data.data1){
                        value.color = "red"
                        list.push(value)
                    }
                }
                if(res?.data.data2 != null){
                    setName2(res.data.user2.name)
                    for(const value of res?.data.data2){
                        value.color = "blue"
                        list.push(value)
                    }
                }
                if(res?.data.data3 != null){
                    setName3(res.data.user3.name)
                    for(const value of res?.data.data3){
                        value.color = "green"
                        list.push(value)
                    }
                }
                console.log(list)  
                setEvents(list)

 
            }
        }catch(error){
        }
    }

    const handlesubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        var start_year = parseInt(selectStartData.slice(0,4))
        var start_month = parseInt(selectStartData.slice(5,7))-1
        var start_day = parseInt(selectStartData.slice(8,10))
        var end_year = parseInt(selectEndData.slice(0,4))
        var end_month = parseInt(selectEndData.slice(5,7))-1
        var end_day = parseInt(selectEndData.slice(8,10))-1        
        var startdate = (new Date(start_year,start_month, start_day, starthour+9, startmin, 0)).toISOString()
        var enddate = (new Date(end_year,end_month, end_day, endhour+9, endmin, 0)).toISOString()

        const data:CalendarData ={
            title: title,
            start: startdate,
            end: enddate,
            todo: todo,
            color:"",
            allDay:allDay   
        }

        try{
            const res = await registerEvent(data)
            console.log(res?.data)
            if (res?.status === 200){
                setPost(!post)
                setScreen(false)
                setStartHour(0)
                setStartMin(0)
                setEndHour(0)
                setEndMin(0)
                setTitle("")
            }
        }catch(error){
        }
    }

    const handleClickEvent = (clickEvent:EventClickArg) => {
        console.log(clickEvent)
        setChangeScreen(true)
        setScreen(false)     
        setStartHour(parseInt(clickEvent.event._instance?.range.start.toISOString().slice(11,13) as string))
        setStartMin(parseInt(clickEvent.event._instance?.range.start.toISOString().slice(14,16) as string))
        setEndHour(parseInt(clickEvent.event._instance?.range.end.toISOString().slice(11,13) as string))
        setEndMin(parseInt(clickEvent.event._instance?.range.end.toISOString().slice(14,16) as string))
        setSelectStartData(clickEvent.event._instance?.range.start.toISOString().slice(0,10) as string)
        setSelectEndData(clickEvent.event._instance?.range.end.toISOString().slice(0,10) as string)
        setTitle(clickEvent.event._def.title)
        setScheduleID(clickEvent.event._def.publicId)


    }


    
    const handleEditEvent = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        var start_year = parseInt(selectStartData.slice(0,4))
        var start_month = parseInt(selectStartData.slice(5,7))-1
        var start_day = parseInt(selectStartData.slice(8,10))
        var end_year = parseInt(selectEndData.slice(0,4))
        var end_month = parseInt(selectEndData.slice(5,7))-1
        var end_day = parseInt(selectEndData.slice(8,10))-1
        var startdate = (new Date(start_year,start_month, start_day, starthour+9, startmin, 0)).toISOString()
        var enddate = (new Date(end_year,end_month, end_day, endhour+9, endmin, 0)).toISOString()
        const data:CalendarData ={
            title: title,
            start: startdate,
            end: enddate,
            todo: todo,
            color:"",
            allDay:allDay

        }

        try{
            const res = await updateEvent(data, scheduleID)
            console.log("ABC")
            console.log(res)
            if (res?.status === 200){
                console.log("GGG")
                setPost(!post)
                setChangeScreen(false)
                setStartHour(0)
                setStartMin(0)
                setEndHour(0)
                setEndMin(0)
                setTitle("")
            }
        }catch(error){
        }

     }

    const handleDeleteEvent =  async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()

        try{
            const res = await deleteEvent(scheduleID)
            console.log(res)
            if (res?.status === 200){
                console.log("DELETE")
                setPost(!post)
                setChangeScreen(false)
                setStartHour(0)
                setStartMin(0)
                setEndHour(0)
                setEndMin(0)
                setTitle("")
            }
        }catch(error){
        }

    }


    const handleselectdate = async (selectionInfo:DateSelectArg) =>{
        console.log('selectionInfo: ', selectionInfo); // ??????????????????????????????console?????????   
        setSelectStartData(selectionInfo.startStr)
        setSelectEndData(selectionInfo.endStr)
        setChangeScreen(false)
        setScreen(true)
    }

    useEffect(()=>{
        handlegetEvent()
    },[post]) 


    const DeleteRoom = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        try{
            const res = await deleteRoom(String(roomid))
            if (res.status===200){
                setRoomid(0)
                console.log(`/rooms/${userid}`)
                navigate(`/rooms/${userid}`)

            }
        }catch(error){

        }
    }


    const Calendar = useCallback( () =>{
        return(
            <>
            {!isMobileSize
             ?   <FullCalendar 
                    plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]} 
                    headerToolbar={{
                        start: 'dayGridMonth,timeGridWeek',
                        center: 'title',
                        end: 'today prev,next'
                    }}
                    timeZone= 'Asia/Tokyo'
                    locale= 'ja'
                    initialView="dayGridMonth" 
                    weekends={true}
                    dayCellContent = {(e)=>{e.dayNumberText = e.dayNumberText.replace('???', '');}}
                    // selectable = {true}
                    select = {(e) => handleselectdate(e)}
                    events = {events}
                    // eventClick={(e)=>{handleClickEvent(e)}}
                    longPressDelay = {0}
                />
                :
                <FullCalendar 
                plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]} 
                headerToolbar={{
                    start: 'title',
                    
                    end: 'today prev,next'
                }}
                timeZone= 'Asia/Tokyo'
                locale= 'ja'
                initialView="dayGridMonth" 
                weekends={true}
                dayCellContent = {(e)=>{e.dayNumberText = e.dayNumberText.replace('???', '');}}
                // selectable = {true}
                select = {(e) => handleselectdate(e)}
                events = {events}
                // eventClick={(e)=>{handleClickEvent(e)}}
                longPressDelay = {0}
            />
            }
            </>
        )
    },[events])


    return(
        
        <div style={screen || changescreen? {width:"100%",backgroundColor:"rgba(0,0,0,0.25)",paddingTop:"3rem",paddingBottom:"3rem"}
                           : {paddingTop:"3rem",paddingBottom:"3rem"}}>
            <div style={{position: "relative", zIndex:1}}>

                <table style={{borderSpacing:10}}>
                    <tr>
                        <ul style={{margin:0}}>
                        <td>
                            <li style={{color:"red",fontSize:20}}><span style={{color:"black",fontSize:17,marginRight:30}}>{name1}</span></li>
                        </td>
                        <td>
                            <li style={{color:"blue",fontSize:20}}><span style={{color:"black",fontSize:17,marginRight:30}}>{name2}</span></li>
                        </td>
                        <td>
                            <li style={{color:"green",fontSize:20}}><span style={{color:"black",fontSize:17,marginRight:30}}>{name3}</span></li>
                        </td>
                        </ul>
                    </tr>
                </table>

                <Calendar />
                {!deleteAlert ?
                    <div style={{marginTop:50,textAlign:"center"}}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="secondary"
                            onClick={()=>{setDeleteAlert(true)}}
                        >
                            ??????
                        </Button>
                    </div>
                    :
                    <div style={{marginTop:50,textAlign:"center"}}>
                        <span style={{color:"red", marginRight:30}}>??????????????????????????????</span>
                        <Button
                            type="submit"
                            style={{marginRight:30}}
                            variant="outlined"
                            color="secondary"
                            onClick={(e)=>{
                                setDeleteAlert(false)
                                DeleteRoom(e)
                            }}
                        >
                            ??????
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="secondary"
                            onClick={()=>{setDeleteAlert(false)}}
                        >
                            ?????????
                        </Button>
                    </div>
                }
            </div>
            {screen  && !changescreen ?
                <div style={{position:"absolute",top:"60%",left:"50%",transform:"translate(-50%, -50%)",zIndex:2}}>
                    <Card className={styles.card}>
                        <CardHeader
                            title= {selectStartData.slice(5,7)+"???"+selectStartData.slice(8,10)+"???"} 
                            className={styles.header}
                        />
                        <CardContent>
                            <div style={{display:"flex"}}>
                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>hour</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={starthour}
                                        label="hour"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setStartHour(e.target.value as number)}}
                                    >
                                        {
                                            hours.map((hour: string, index: number)=>
                                            <MenuItem value={index} key={hour}>{hour}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <span style={{paddingTop:"9%"}}>???</span>
        
                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={startmin}
                                        label="min"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setStartMin(e.target.value as number)}}
                                    >
                                        {
                                            minutes.map((min: string, index:number)=>
                                            <MenuItem value={index*10} key={min}>{min}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                        
                                <span style={{paddingTop:"9%"}}>???</span>

                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>hour</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={endhour}
                                        label="hour"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndHour(e.target.value as number)}}
                                    >
                                    {
                                        hours.map((hour: string, index:number)=>
                                        <MenuItem value={index} key={hour}>{hour}</MenuItem>
                                        )
                                    }
                                    </Select>
                                </FormControl>
                
                                <span style={{paddingTop:"9%"}}>???</span>
                        
                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={endmin}
                                        label="min"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndMin(e.target.value as number)}}
                                    >
                                        {
                                            minutes.map((min: string, index:number)=>
                                            <MenuItem value={index*10} key={min}>{min}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <TextField
                                required
                                margin="normal"
                                label = "Event"
                                fullWidth
                                onChange = {(e) => {setTitle(e.target.value)}}
                            />

                            <div style={{textAlign:"center",marginTop:20}}>
                                <FormControlLabel control={<Checkbox  onChange={()=>{setTodo(!todo) }} /> } label="Todo" />
                            </div>

                            <div style={{marginTop:20,display:"flex"}}>
                                <div style={{textAlign:"right"}}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color =  "primary"
                                        disabled={title ? false : true}
                                        onClick={(e)=>{handlesubmit(e)}}
                                    >
                                        ??????
                                    </Button>
                                </div >
                                <div style={{textAlign:"left"}}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        color =  "primary"
                                        onClick={()=>{ 
                                            setScreen(false)
                                            setStartHour(0)
                                            setStartMin(0)
                                            setEndHour(0)
                                            setEndMin(0)
                                            setTitle("")
                                        }}
                                    >
                                        ?????????
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                   </Card>
                </div>




            : !screen  && changescreen ?
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:2}}>
                <Card className={styles.card}>
                    <CardHeader
                        title = {selectStartData.slice(5,7)+"???"+selectStartData.slice(8,10)+"???"+"??????"}
                        className={styles.header}
                    />
                    <CardContent>
                        <div style={{display:"flex"}}>
                            <FormControl variant="outlined" margin="normal">
                                <InputLabel className={styles.content} style={{fontSize:12}}>hour</InputLabel>
                                <Select
                                    className={styles.content}
                                    value={starthour}
                                    label="hour"
                                    onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setStartHour(e.target.value as number)}}
                                >
                                    {
                                        hours.map((hour: string, index:number)=>
                                        <MenuItem value={index} key={hour}>{hour}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>

                            <span style={{paddingTop:"9%"}}>???</span>

                            <FormControl variant="outlined" margin="normal">
                                <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                <Select
                                    className={styles.content}
                                    value={startmin}
                                    label="min"
                                    onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setStartMin(e.target.value as number)}}
                                >
                                    {
                                        minutes.map((min: string, index:number)=>
                                        <MenuItem value={index*10} key={min}>{min}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                    
                            <span style={{paddingTop:"9%"}}>???</span>

                            <FormControl variant="outlined" margin="normal">
                                <InputLabel className={styles.content} style={{fontSize:12}}>hour</InputLabel>
                                <Select
                                    className={styles.content}
                                    value={endhour}
                                    label="hour"
                                    onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndHour(e.target.value as number)}}
                                >
                                {
                                    hours.map((hour: string, index:number)=>
                                    <MenuItem value={index} key={hour}>{hour}</MenuItem>
                                    )
                                }
                                </Select>
                            </FormControl>
            
                            <span style={{paddingTop:"9%"}}>???</span>
                    
                            <FormControl variant="outlined" margin="normal">
                                <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                <Select
                                    className={styles.content}
                                    value={endmin}
                                    label="min"
                                    onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndMin(e.target.value as number)}}
                                >
                                    {
                                        minutes.map((min: string, index:number)=>
                                        <MenuItem value={index*10} key={min}>{min}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <TextField
                            required
                            margin="normal"
                            label = {title}
                            fullWidth
                            onChange = {(e) => {setTitle(e.target.value)}}
                        />

                        <div style={{textAlign:"center",marginTop:20}}>
                            <FormControlLabel control={<Checkbox  onChange={()=>{setTodo(!todo) }} /> } label="Todo" />
                        </div>

                        <div style={{marginTop:20,display:"flex"}}>
                            <div style={{textAlign:"right"}}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color =  "primary"
                                    disabled={title ? false : true}
                                    onClick={(e)=>{handleEditEvent(e)}}
                                >
                                    ??????
                                </Button>
                            </div >
                            <div style={{textAlign:"right"}}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color =  "primary"
                                    disabled={title ? false : true}
                                    onClick={(e)=>{handleDeleteEvent(e)}}
                                >
                                    ??????
                                </Button>
                            </div >
                            <div style={{textAlign:"left"}}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color =  "primary"
                                    onClick={()=>{ 
                                        setChangeScreen(false)
                                        setStartHour(0)
                                        setStartMin(0)
                                        setEndHour(0)
                                        setEndMin(0)
                                        setTitle("")
                                    }}
                                >
                                    ?????????
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
            :<></>
            }            
        </div>
    )
}


export default Room