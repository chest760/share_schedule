import { Container, Grid, IconButton, makeStyles,Theme,Card,CardContent } from "@material-ui/core";
import React,{useEffect,useContext,useState} from "react";
import sample_img from "../../img/sample.jpg";
import { AuthContext } from "App";
import { getCurrentUser } from "lib/api/auth";
import { Link } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import Modal from "react-modal";


const useStyles = makeStyles((theme:Theme) => ({
    container : {
        padding:"3rem"
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
}))


const Home: React.FC = () =>{
    const styles = useStyles()
    const [name,setName] = useState<string>("") 
    const {setCurrentUser} = useContext(AuthContext)


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

    const handleGetCurrentUser = async() =>{
        try{
            const res = await getCurrentUser()
            console.log(res?.data)
            if (res?.status === 200){
                setName(res?.data.currentUser.name)
            }
        }catch(error){
        }
    }

    useEffect(()=>{
        handleGetCurrentUser()
    },[setCurrentUser])

    return(
            <>
                <Grid container className={styles.container}>
                    <Grid item xs={4} style={{textAlign:"center"}}>
                        <img src={sample_img} className={styles.image}/>
                        <table style={{margin:"auto",fontSize:"110%"}}>
                            <thead>
                                <tr>
                                    <th style={{paddingRight : 40}}>名前 </th>
                                    <th style={{paddingRight : 20}}>{name}</th>
                                    <th>
                                    <IconButton
                                      component = {Link}
                                      to = "/edit"
                                    >
                                        <SettingsIcon />
                                    </IconButton>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </Grid>
                    <Grid item xs ={8} className={styles.item}>
                        <Card>
                            <CardContent>
                                To Do
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </>
       
    )
}

export default Home