import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate} from "react-router-dom"
import { Card,CardHeader, CardContent, makeStyles, Theme, Button} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import { SignUpData } from "utils/index"
import { SignUp } from "lib/api/auth";
import { AuthContext } from "App";

const useStyles = makeStyles((theme:Theme)=>({
    root:{
        alignItems:"center"
    },
    card : {
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



const Signup: React.FC = () =>{
    const styles = useStyles()
    const navigate = useNavigate();
    const {setLoginstate,setCurrentUser} = useContext(AuthContext)
    const [error, setError] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [confirmed_password, setConfirmed_password] = useState<string>("")


    
    const handleSignUp =async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const data:SignUpData ={
            name: name,
            email: email,
            password: password,
            passwordConfirmation: confirmed_password   
        }
        console.log(data)

        try{
            const res = await SignUp(data)
            console.log(res)

            if(res.status === 200){
                Cookies.set("_access_token", res.headers["access-token"]||"")
                Cookies.set("_client", res.headers["client"]||"")
                Cookies.set("_uid", res.headers["uid"]||"")
                
                setLoginstate(true)
                setCurrentUser(res.data.data)
                console.log(res.data.data)
                navigate(`/home/${res.data.data.id}`)
            }else{
                console.log("DDD")
            }

        }catch(error){
            console.log(error)
            console.log("FFF")
        }
    }

    return(
        <form noValidate autoComplete="off">
            <Card className={styles.card}>
                <CardHeader
                title="新規登録"
                className={styles.header}
                >
                </CardHeader>
                <CardContent >
                    <TextField
                    error = {error}
                    required
                    label = "name"
                    fullWidth
                    id="outlined-error"
                    margin="normal"
                    onChange={(event)=>{setName(event.target.value)}}
                    />
                    <TextField
                    required
                    label = "email"
                    fullWidth
                    margin="normal"
                    onChange={(event)=>{setEmail(event.target.value)}}
                    />
                    <TextField
                    required
                    label = "password"
                    fullWidth
                    margin="normal"
                    onChange={(event)=>{setPassword(event.target.value)}}
                    />
                    <TextField
                    required
                    label = "password"
                    fullWidth
                    margin="normal"
                    onChange={(event)=>{setConfirmed_password(event.target.value)}}
                    />
                    <div className={styles.submit}>
                        <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        disabled={!name || !email || !password || !confirmed_password? true : false}
                        onClick={(e)=>{handleSignUp(e)}}
                        >
                            登録
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default Signup