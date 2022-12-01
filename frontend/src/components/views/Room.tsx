import React from "react";
import { Box,Grid,Card, CardHeader, CardContent, makeStyles,Theme,TextField } from "@material-ui/core";

const useStyles = makeStyles((theme:Theme)=>({
    card:{
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(7),
        margin:"auto",
        maxWidth: 250
    },
    cardheader :{
        fontSize:"2rem"
    }
}))

const Room:React.FC = () =>{
    const styles = useStyles()

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
                   
                    />
                    <TextField
                    required
                    label = "password"
                    fullWidth
                    margin="normal"
                    />
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
                   
                    />
                    <TextField
                    required
                    label = "password"
                    fullWidth
                    margin="normal"
                    />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs = {4} style={{textAlign:"center"}}>
                bb
            </Grid>
        </Grid>
    )
}

export default Room