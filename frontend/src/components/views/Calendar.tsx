import { makeStyles,Button,Card,CardContent, CardHeader,Theme, TextField,Radio,RadioGroup,FormControlLabel,FormControl,Select,Checkbox, FormGroup, InputLabel, MenuItem } from "@material-ui/core";
import React, { useCallback, useEffect,useState } from "react";
import FullCalendar,{DateSelectArg} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Eventregister, getEvent } from "lib/api/get";
import { CalendarData } from "utils/index";
import { Style } from "@material-ui/icons";
import { minutes,hours } from "utils/time";
import { Console } from "console";

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

const Calendar:React.FC = () =>{
    
    type eventType =[
        {
        title:string
        start:string
        end: string
        }
    ]

    const styles = useStyles()
    // const events = [{title: 'Event 2', start: "2022-11-27T09:00:00",end:"2022-11-27T18:00:00" }]
    const [events, setEvents] = useState<eventType>([{title:" ",start:" ",end:" "}])
    const [selectStartData, setSelectStartData] = useState<string>("")
    const [selectEndData, setSelectEndData] = useState<string>("")
    const [todo,setTodo] = useState<boolean>(false)
    const [startdate, setStartdate] = useState<string>("")
    const [enddate,setEnddate] = useState<string>("")
    const [title,setTitle] = useState<string>("")
    const [start, setStart] = useState<string>("")
    const [end,setEnd] = useState<string>("")
    const [screen,setScreen] = useState<boolean>(false)
    const [post, setPost] = useState<boolean>(false)
    const [starthour, setStartHour] = useState<number>(0)
    const [startmin, setStartMin] = useState<number>(0)
    const [endhour, setEndHour] = useState<number>(0)
    const [endmin, setEndMin] = useState<number>(0)

    var a = (new Date(2022,8, 21, 21, 10, 5)).toISOString()


    const handlegetEvent = async () =>{
        try{
            const res = await getEvent()
            
            console.log(res?.data.data)
            if (res?.status === 200){
               setEvents(res?.data.data)
               console.log("aa")
              
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
        console.log(startdate)
        console.log(enddate)
        console.log(todo)

        const data:CalendarData ={
            title: title,
            start: startdate,
            end: enddate,
            todo: todo   
        }
        try{
            const res = await Eventregister(data)
            console.log("ABC")
            console.log(res?.data)
            if (res?.status === 200){
                // setName(res?.data.currentUser.name)
                console.log("GGG")
                setPost(!post)
                setScreen(false)
                setStartHour(0)
                setStartMin(0)
                setEndHour(0)
                setEndMin(0)
            }
        }catch(error){
        }
        
    }

     
  

    const handleselectdata = async (selectionInfo:DateSelectArg) =>{
        console.log('selectionInfo: ', selectionInfo); // 選択した範囲の情報をconsoleに出力
       
        var resourceA = selectionInfo.view.calendar.getEvents()
        const data :CalendarData = {
            title: "EVENT",
            start: "2022-09-21T12:10:05.000Z",
            end: "2022-09-21T12:10:05.000Z",
            todo: false
        } 

        setSelectStartData(selectionInfo.startStr)
        setSelectEndData(selectionInfo.endStr)
        setScreen(true)

        // try{
        //     const res = await Eventregister(data)
        //     console.log("ABC")
        //     console.log(res?.data)
        //     if (res?.status === 200){
        //         // setName(res?.data.currentUser.name)
        //         console.log("GGG")
        //         setPost(!post)
        //     }
        // }catch(error){
        // }
        
        // 選択した部分の選択を解除
    }

    useEffect(()=>{
        handlegetEvent()
    },[post]) 

    const Calendar = useCallback( () =>{
        return(
            <FullCalendar 
            plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]} 
            headerToolbar={{
                start: 'dayGridMonth,timeGridWeek', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
            }}
            timeZone= 'Asia/Tokyo'
            locale= 'ja'
            initialView="dayGridMonth" 
            weekends={true}
            selectable = {true}
            select = {(e) => handleselectdata(e)}
            events = {events}
            />
        )
    },[events])

    return(
        
        <div style={screen ? {width:"100%",backgroundColor:"rgba(0,0,0,0.25)",paddingTop:"3rem",paddingBottom:"3rem"}
                           : {paddingTop:"3rem",paddingBottom:"3rem"}}>
            <div style={{position: "relative", zIndex:1}}>
                <Calendar />
            </div>
            {screen ?
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:2}}>
                    <Card className={styles.card}>
                        <CardHeader
                            title= {selectStartData.slice(5,7)+"月"+selectStartData.slice(8,10)+"日"} 
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
                                            hours.map((hour: number)=>
                                            <MenuItem value={hour} key={hour}>{hour}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>

                                <span style={{paddingTop:"9%"}}>：</span>
        
                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={startmin}
                                        label="min"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setStartMin(e.target.value as number)}}
                                    >
                                        {
                                            minutes.map((min: number)=>
                                            <MenuItem value={min} key={min}>{min}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                        
                                <span style={{paddingTop:"9%"}}>〜</span>

                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>hour</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={endhour}
                                        label="hour"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndHour(e.target.value as number)}}
                                    >
                                    {
                                        hours.map((hour: number)=>
                                        <MenuItem value={hour} key={hour}>{hour}</MenuItem>
                                        )
                                    }
                                    </Select>
                                </FormControl>
                
                                <span style={{paddingTop:"9%"}}>：</span>
                        
                                <FormControl variant="outlined" margin="normal">
                                    <InputLabel className={styles.content} style={{fontSize:12}}>min</InputLabel>
                                    <Select
                                        className={styles.content}
                                        value={endmin}
                                        label="min"
                                        onChange={(e:React.ChangeEvent<{ value: unknown }>)=>{setEndMin(e.target.value as number)}}
                                    >
                                        {
                                            minutes.map((min: number)=>
                                            <MenuItem value={min} key={min}>{min}</MenuItem>
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
                                        確定
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
                                        }}
                                    >
                                        閉じる
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

export default Calendar