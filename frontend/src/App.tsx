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

const App: React.FC = () => {
  const [loading,setLoading] = useState<boolean>(true)
  const [loginstate,setLoginstate] = useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()
  const [userid,setUserid] = useState<number>(0)


  const handleuser= async() =>{
    try {
      
      const res = await getCurrentUser()
      if (res?.status === 200){
        
        setLoginstate(true)
        setCurrentUser(res?.data.currentUser)
        setUserid(res?.data.currentUser.id)
        console.log("AAAAAAA")
      } else {
        console.log("No current user")
      }
    }catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
    
  useEffect(() => {
    console.log("AAA")
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

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, loginstate, setLoginstate, currentUser ,setCurrentUser,userid,setUserid}}>
        <Layout>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path ="/*" element={
              <Approval>
                <Routes>
                  <Route path={`/calendar/${userid}`} element={<Calendar/>} />
                  <Route path={`/room/${userid}`} element={<Room/>} />
                  <Route path={`/edit/${userid}`} element={<Edit/>} />
                  <Route path={`/home/${userid}`} element={<Home/>} />
                  <Route path="/*" element={<Notfound/>} />
                </Routes>
              </Approval>
            }/>
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </Router>
  )
}
export default App
