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

export const AuthContext = createContext({} as {
  loading:boolean
  setLoading:React.Dispatch<React.SetStateAction<boolean>>
  loginstate:boolean
  setLoginstate:React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser:React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading,setLoading] = useState<boolean>(true)
  const [loginstate,setLoginstate] = useState<boolean>(false)
  const [currentUser,setCurrentUser] = useState<User | undefined>()
  const [userid,setUserid] = useState<any>(0)


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
  }, [setCurrentUser])

  const Approval = ({children}: {children: React.ReactElement }) => {
    if (!loading){
      if(loginstate){
        return children
      }else{
        console.log("AAA")
        return <Routes><Route path="/*" element={<Navigate to="/login"/>}/></Routes>
      }
    }else{
      
      return<></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, loginstate, setLoginstate, currentUser, setCurrentUser}}>
        <Layout>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path ="/*"element={
              <Approval>
                <Routes>
                  <Route path="/calender" element={<Calendar/>} />
                  <Route path="/edit" element={<Edit/>} />
                  <Route path="/home/:id" element={<Home/>} />
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
