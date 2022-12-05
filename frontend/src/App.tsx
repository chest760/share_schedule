import React,{useEffect, useState,createContext, useContext} from "react"
import { BrowserRouter as Router, Route,Navigate, Routes} from "react-router-dom"
import {getCurrentUser, SignUp} from "lib/api/auth"
import { User } from "utils/index"
import Signup from "components/views/SignUp"
import Login from "components/views/Login"
import Home from "components/views/Home"
import About from "components/views/About"
import Notfound from "components/views/Notfound"
import Layout from "components/layouts/Layout"
import Calendar from "components/views/Calendar"
import Edit from "components/views/Edit"
import  Rooms  from "components/views/Rooms"
import  Room  from "components/views/Room"

export const AuthContext = createContext({} as {
  loading:boolean
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
  loginstate:boolean
  setLoginstate:React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser:React.Dispatch<React.SetStateAction<User | undefined>>
  userid: number
  setUserid:React.Dispatch<React.SetStateAction<number>>
})

export const Context = createContext({} as {

  roomid: number
  setRoomid:React.Dispatch<React.SetStateAction<number>>
  room_open: boolean
  setRoom_Open:React.Dispatch<React.SetStateAction<boolean>>
})

const App: React.FC = () => {
  const [loading,setLoading] = useState<boolean>(true)
  const [loginstate,setLoginstate] = useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()
  const [userid,setUserid] = useState<number>(0)
  const [roomid, setRoomid] = useState<number>(0)
  const [room_open, setRoom_Open] = useState<boolean>(false)


  const handleuser= async() =>{
    try {
      
      const res = await getCurrentUser()
      if (res?.status === 200){
        
        setLoginstate(true)
        setCurrentUser(res?.data.currentUser)
        setUserid(res?.data.currentUser.id)
        
      } else {
        console.log("No current user")
      }
    }catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
    
  useEffect(() => {
  
    handleuser()
  }, [])

  const Approval = ({children}: {children: React.ReactElement }) => {
    if (!loading){
     
      if(loginstate){
        return children
      }else{
        return <Routes><Route path="/*" element={<Navigate to="/login"/>}/></Routes>
      }
    }else{
      
      return<></>
    }
  }

  const EnterRoom = ({children}:{children: React.ReactElement }) =>{
    console.log("aaaaaaaaaa")
    console.log(roomid)
    if(roomid != 0){
      return children
    }else{
      return <Routes>
        <Route path={`/rooms/0`} element={<Navigate to={`/rooms/${userid}`}/>}/>
        <Route path="*" element={<Navigate to={`/home/${userid}`}/>}/>
        </Routes>
    }

  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, loginstate, setLoginstate, currentUser ,setCurrentUser,userid,setUserid}}>
      <Context.Provider value={{roomid,setRoomid,room_open,setRoom_Open}}>
        <Layout>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path ="/*" element={
              <Approval>
                {/* <Context.Provider value={{roomid,setRoomid,room_open,setRoom_Open}}> */}
                <Routes>
                  <Route path={`/calendar/${userid}`} element={<Calendar/>} />
                  <Route path={`/rooms/${userid}`} element={<Rooms/>} />
                  <Route path={`/edit/${userid}`} element={<Edit/>} />
                  <Route path={`/home/${userid}`} element={<Home/>} />
                  <Route path={`/*`} element={
                    <EnterRoom>
                      <Routes>
                        <Route path={`/room/${roomid}`} element={<Room/>} />
                      </Routes>
                    </EnterRoom>
                   }/>
                </Routes>
                {/* </Context.Provider> */}
              </Approval>
            }/>
          </Routes>
        </Layout>
        </Context.Provider>
      </AuthContext.Provider>
    </Router>
  )
}
export default App
