import React, { Component, useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Container,Card,CardMedia,Grid,Paper,TextField,CardContent,CardActions,Typography, makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo  from "../images.png"
const Login = (props) => {
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[message,setMessage]=useState("");
    let{login}=useContext(AuthContext);

    const handleLoginEvent= async(e)=>{
        
        try {

            await login(email,password);
           
            props.history.push('/');

        } catch (error) {   
            setEmail("");
            setPassword("");
            setMessage(error.message);
            console.log(error.message);
        }
      
    }

    let useStyles=makeStyles({
        centerDivs:{
             height:"100vh",
            width:"100vw",
             display:"flex",
            justifyContent:"center",
            alignItems:"center"
        },
        fullwidth:{
             width:"100%",
             marginBottom:"1rem",
        },
        centerElement:{
            display:"flex",
            flexDirection:"column",
        },
        mb:{
            marginBottom:"0.5rem",
        },
        alignCenter:{
            alignItems:"center",
        }
    });
    let classes=useStyles();
    return (
        <div className={classes.centerDivs}>
            <Container>
                <Grid container spacing={2}>
                  <Grid item sm={5}>
                      <Paper> Carouel</Paper>
                  </Grid>
                  <Grid item sm={4}>
                     {/* Login form */}
                     <Card variant="outlined">
                     <CardMedia image={logo} style={{height:"5rem" , backgroundSize:"contain"}}></CardMedia>
                     <CardContent className={classes.centerElement}>
                         <TextField  className={classes.fullwidth} variant="outlined" label="Email" type="Email" onChange={(e)=>setEmail(e.target.value)}></TextField>
                         <TextField className={classes.fullwidth} variant="outlined" label="Password" type="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
                     </CardContent>
                     </Card>
                     <CardActions>
                         <Button size="large" className={classes.fullwidth} variant="contained" onClick={handleLoginEvent} color="primary">Login</Button>
                     </CardActions>
                     <Card variant="outlined">
                         <Typography style={{textAlign:"center"}}>
                             Don't have an Account ?
                             <Button  >
                                 <Link   to="/signup" style={{textDecoration:"none",color:"blue"}}>sign up</Link>
                             </Button>
                         </Typography>

                     </Card>
                     

                   </Grid>
                </Grid>
            </Container>
        </div>
             



        // <React.Fragment> 
        // <div>
        //     <h1>Email</h1>

        //     <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        // </div>
        // <div>
        //     <h1>Password</h1>
        //     <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
        // </div>
        // <div>
        //     <button onClick={handleLoginEvent}>Login</button>
        // </div>
        // <h1>{message}</h1>
        // </React.Fragment>
     );
}
 
export default Login;