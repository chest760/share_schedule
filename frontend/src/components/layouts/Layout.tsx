import React from "react";
import { Container, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Header from "components/layouts/Header"

const useStyles = makeStyles((thema:Theme)=>({
    container: {
        paddingTop: "2rem"
    }
}))

const Layout = ({children}:{children:React.ReactElement}) =>{
    const styles = useStyles()

    return(
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Container maxWidth="lg" className={styles.container}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item xs = {12}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </>
    )
}

export default Layout