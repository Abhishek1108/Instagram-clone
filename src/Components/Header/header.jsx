import React, { Component, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import{IconButton,Container,Grid,Card,TextField,CardMedia,CardContent,makeStyles,CardActions,Avatar} from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import Home from "@material-ui/icons/Home"
import Heart from "@material-ui/icons/Favorite"
import logo from "../images.png"
import Feeds from '../Feeds/feeds';
import { AuthContext } from '../../Context/AuthProvider';
import { firebaseAuth, firebaseDB } from '../../Config/firebase';


const Header = (props) => {
  const[user,setUser]=useState(null);
  let {currentUser,setModal}=useContext(AuthContext);
 let showModal=useContext(AuthContext);
  let useStyles=makeStyles({
    header:{
        height:"50px",
        widht:"100vw"
    },
     alignHeader:{
      //  display:"flex",
      //  flexDirection:"row"
     },
     centerDivs:{
       height:"100%",
       display:"flex",
       justifyContent:"space-between",
       alignItems:"center",
     },
     buttonStyling:{
      //  color:"white",
         
     },
     reSize:{
       height:"10px",
       
       
     }

  })
  let classes=useStyles();

  const handleAddPost = () =>{
      
       setModal("true");
        
  }
  const handleNavgationToFeeds=()=>{
       props.history.push("/");
  }

  useEffect( async()=> {
      let uid=currentUser.uid;
      console.log(uid);

      let doc=await firebaseDB.collection("users").doc(uid).get();
      let user=doc.data();
      setUser(user);
  },[])


    return (
       <div className={classes.header}>
        <Container  style={{height:"100%",paddingLeft:"230px",paddingRight:"230px",maxWidth:"100%"}}>
          <Grid container className={classes.centerDivs}>
          <Grid item sm={2} style={{height:"100%"}}>
            <Card variant="outlined" style={{border:"none",height:"100%"}}>
              <CardMedia image={logo} style={{height: "2.5rem",backgroundSize:"contain" }}></CardMedia>
            </Card>
          </Grid>  
          <Grid item sm={4}  style={{height:"100%"}}>
            <CardContent style={{height:"100%",justifyContent:"center",alignItems:"center",display:"flex",paddingTop:"22px"}}>
            <TextField InputProps={{classes:{input:classes.reSize}}} InputLabelProps={{style:{fontSize:"0.7rem"}}} variant="outlined" label="Search" size="small" ></TextField> 

            </CardContent>
          </Grid>
          <Grid item  style={{height:"100%"}}>
          <CardActions  style={{height:"100%"}}>
            <Link to="/">
            <IconButton className={classes.buttonStyling} ><Home></Home></IconButton>
            </Link>
               
               <IconButton onClick={handleAddPost} className={classes.buttonStyling}><Add></Add></IconButton> 
              
               <IconButton className={classes.buttonStyling}><Heart></Heart></IconButton> 
               <Link to="/profile">
               <Avatar  style={{height:'35px'}} src={user ? user.profilePhotoUrl : ""}></Avatar>
               </Link>
            </CardActions>
          </Grid>
          </Grid>
        </Container> 
        

       </div>
      );
}
 
export default Header;