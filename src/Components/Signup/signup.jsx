import React, {  useContext, useState } from 'react';
import { firebaseDB, firebaseStorage } from '../../Config/firebase';
import { AuthContext } from '../../Context/AuthProvider';
import { Button,Card,CardContent,CardActions,Grid,TextField,Container,CardMedia, makeStyles,Typography} from '@material-ui/core';
import logo from "../images.png";
import { Link } from 'react-router-dom';



const Signup = (props) => {
 const[userName,setUserName]=useState("");
 const[email,setEmail]=useState("");
 const[password,setPassword]=useState("");
 const[profileImage,setProfileImage]=useState(null);
 const[message,setMessage]=useState("");
 let {signup}=useContext(AuthContext);


 const handleSignUpEvent = async ()=>{
     try {
        let response=await  signup(email,password);
        let uid=response.user.uid;
         const uploadPhotoObj= firebaseStorage.
         ref(`/profilePhotos/${uid}/image.jpg`).put(profileImage);
         uploadPhotoObj.on('state_chnaged',fun1,fun2,fun3);


         function fun1(){
        //this function track the progress of the upload
         }
         function fun2(error){
           //it indicates the error this the process of upload
         }
        async function fun3(){
           //it indicates the success of the upload event
           let profilePhotoUrl=await uploadPhotoObj.snapshot.ref.getDownloadURL();

           firebaseDB.collection("users").doc(uid).set({
               userName:userName,
               email:email,
               UserId:uid,
               profilePhotoUrl:profilePhotoUrl,
               postCreated:[],
           })
           props.history.push('/');

         }


        
     } catch (error) {
         setMessage(error.message);
     }

 }
 const handleFileSubmit=(e)=>{
   let fileObj=e.target.files[0];
   setProfileImage(fileObj);
 }
  let useStyles=makeStyles({
    centerDivs:{
        height:"100vh",
       width:"100vw",
       
   },
      alignElement:{
          height:"100%",
          width:"100%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          
      },
      cardStyling:{
        
          display:"flex",
          flexDirection:"column",
          
      },
      mb:{
          marginBottom:"0.8rem",
         
      },
      fW:{
       width:"100%",
      }


  });

  let classes=useStyles();

    return ( 
        // <div className={classes.centerDivs}>
        //     <Container className={classes.centerDivs}>
        //       <Grid container  className={classes.alignElement} >
        //           <Grid  item>
        //               <Card  variant="outlined">
        //                   <CardMedia image={logo}style={{height:"5rem" , backgroundSize:"contain"}}></CardMedia>
        //                   <CardContent className={classes.cardStyling} >
        //                       <Typography className={classes.mb}>Sign up to see photos and videos from your friends</Typography>
        //                       <TextField className={classes.mb} variant="outlined" label="Full Name" onChange={(e)=>setUserName(e.target.value)}></TextField>
        //                       <TextField className={classes.mb} variant="outlined" label="Email" onChange={(e)=>setEmail(e.target.value)}></TextField>
        //                       <TextField className={classes.mb }variant="outlined" label="Password" onChange={(e)=>setPassword(e.target.value)}></TextField>
        //                   </CardContent>
        //                   <CardActions>
        //                       <Button size="large" className={classes.fW} variant="contained" color="primary"  onClick={handleSignUpEvent}>Sign up</Button>
        //                   </CardActions>
        //                   <Typography style={{textAlign:"center"}}>By signing up, you agree to our Terms,</Typography>
        //                   <Typography style={{textAlign:"center"}}>Data Policy and Cookies Policy </Typography>
        //                   <Typography style={{textAlign:"center"}}>
        //                      Already, have an Account ?
        //                      <Button  >
        //                          <Link   to="/login" style={{textDecoration:"none",color:"blue"}}>Login in</Link>
        //                      </Button>
        //                  </Typography>
        //               </Card>
        //           </Grid>
        //       </Grid>  
        //     </Container>
        // </div>
    <React.Fragment> 
        <h1>Signup</h1>
        <div>    
            <h1>userName</h1>

            <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div>    
            <h1>Email</h1>

            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <h1>Password</h1>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div>
            <h1>Profile Image</h1>
            <input type="file" accept="image/*" onChange={(e)=>handleFileSubmit(e)} ></input>
        </div>
        <div>
            <button onClick={handleSignUpEvent}>Signup</button>
        </div>
        <h1>{message}</h1>
        </React.Fragment> 
        );
}
 
export default Signup;