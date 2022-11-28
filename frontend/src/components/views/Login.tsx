import { Button, Card,CardContent,CardHeader, makeStyles,Theme } from "@material-ui/core";
import {TextField} from "@material-ui/core";
import React,{useContext,useState} from "react";
import { AuthContext } from "App";
import { LoginData } from "utils/index";
import { LogIn } from "lib/api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme:Theme)=>({
    root : {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(7),
        margin:"auto",
        maxWidth: 400
    },
    header : {
        textAlign:"center",
        paddingTop:theme.spacing(3),
    },
    submit:{
        marginTop:10,
        textAlign: "right",
        textTransform: "none"
    }
}))

const Login: React.FC = () =>{
    const styles = useStyles()
    const navigate = useNavigate()
    const[name,setName] = useState<string>("")
    const[password,setPassword] = useState<string>("")
    const {setLoginstate,setCurrentUser} = useContext(AuthContext)


    const handleLogin = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        const data:LoginData = {
            name: name,
            password: password
        }

        console.log(data)

        try{
            const res = await LogIn(data)

            if(res.status === 200){
                Cookies.set("_access_token", res.headers["access-token"]||"")
                Cookies.set("_client", res.headers["client"]||"")
                Cookies.set("_uid", res.headers["uid"]||"")
                setLoginstate(true)
                setCurrentUser(res.data.data)
                navigate(`/home/${res.data.data.id}`)
            }else{

            }

        }catch(error){
            console.log(error)
        }
    }

    return(
        <form noValidate autoComplete="off">
            <Card className={styles.root}>
                <CardHeader
                title = "ログイン"
                className={styles.header}
                >
                </CardHeader>
                <CardContent>
                    <TextField
                    required
                    label = "name"
                    fullWidth
                    margin="normal"
                    onChange={(event) => {setName(event.target.value)}}
                    />
                    <TextField
                    required
                    label = "passsword"
                    fullWidth
                    margin="normal"
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                    <div className={styles.submit}>
                        <Button
                        type="submit"
                        variant="outlined"
                        color = "primary"
                        disabled={name && password? false : true}
                        onClick={(e)=>{handleLogin(e)}}>
                            OK
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default Login