import React, { Component, useContext, useEffect, useState } from 'react';
import Header from '../Header/header';
import Modal from '../Modal/modal';
import { Container,Grid,Avatar,makeStyles,Typography,Divider,Tabs,Tab, AppBar } from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel';
import { AuthContext } from '../../Context/AuthProvider';
import { firebaseDB } from '../../Config/firebase';
import Post from '@material-ui/icons/GridOn';
import Igtv from '@material-ui/icons/LiveTv';
import Saved from '@material-ui/icons/Bookmark';
import Tagged from '@material-ui/icons/PersonPin';


const Profile = () => {

const [user,setUser]=useState(null);
let{currentUser,showModal}=useContext(AuthContext);
const[value,setNewValue]=useState(0);
let [currentUserPostList,setCurrentUserPostList]=useState([]);

let useStyles=makeStyles({
     
     mainContainer:{
       height:"calc(100% - 50px)",
       display:"flex",
       flexDirection:"row",
       background:"#f5f6fa",
       paddingLeft: "230px",
       paddingRight: "230px",
      
     },
     userDetail:{
        height:"40%",
        width:'100%',
        display:"flex",
        flexDirection:"row",
        paddingLeft:'90px',
        paddingRight: "130px"
     },
     userPost:{
        height:"60%",
        width:"100%",
        paddingLeft:'160px',
        paddingRight: "130px",
        display:"flex",
        flexDirection:'column',
        justifyContent:"center",
    
     },
     profilePhoto:{
         height:"100%",
         width:"50%",
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
     },
     profileInfo:{
        height:"100%",
        width:"50%",
        display:"flex",
        justifyContent:"center",
       
        flexDirection:"column",
     },
     userPostInfo:{
         height:"50%",
         display:"flex",
         justifyContent:"space-between",
        // alignItems:'center',
         flexDirection:'row',
     },
     userNameStyling:{
         height:"50%",
        display:"flex",
        // justifyContent:"center",
        alignItems:"center",
        
     }

})

let classes=useStyles();


useEffect( async()=> {
   
let uid=currentUser.uid;

let doc=await firebaseDB.collection("users").doc(uid).get();
let userData=doc.data();
setUser(userData);


let allPostDoc=await firebaseDB.collection('post').get();
 let allPostObj=allPostDoc.docs.map(obj=>{
      return obj.data();
  })

 let filteredPostObj= allPostObj.filter( obj=>{
      if(obj.uid==currentUser.uid){
       return true;
      }else{
       return  false;
      }
  });
 console.log(filteredPostObj);
  setCurrentUserPostList(filteredPostObj);


},[])

const handleOnchange =(newValue)=>{
   setNewValue(newValue);
}

    return (
       showModal=="true"?<Modal></Modal>:  
    <div style={{height:"99vh",width:"100vw"}}>
        <Container style={{height:"100%",maxWidth:"100%",paddingLeft:"0px",paddingRight:"0px"}}>
            <Header  ></Header>
            <Grid container   className={classes.mainContainer}>
                <Grid item className={classes.userDetail}>
                    <Grid item className={classes.profilePhoto}><Avatar style={{height:"70%",width:"40%"}} src={user?user.profilePhotoUrl:""}></Avatar></Grid>
                    <Grid item className={classes.profileInfo}>
                        <Grid item className={classes.userNameStyling}>
                        <Typography style={{fontSize:"2rem"}}>{user?user.userName:""}</Typography>
                        </Grid>
                     <Grid item className={classes.userPostInfo}>
                     <Typography>{0+" "+"posts"}</Typography>
                     <Typography>{0+" "+"followers" }</Typography>
                     <Typography>{0+" "+"following"}</Typography>
                     </Grid>
                    </Grid>
                </Grid>
                <Divider  variant="middle"></Divider>
                <Grid item className={classes.userPost}>
                    <Grid item style={{height:"15%",width:"100%"}}>
                        <Post></Post>
                        <Typography>Posts</Typography>
                        <Divider></Divider>
                    </Grid>
                    <Grid item style={{height:"85%",width:"100%",display:'flex',flexWrap:'wrap',gridGap:'20px'}}>
                      {currentUserPostList.map(obj=>{
                          console.log(obj);
                          return <div style={{height:'70%',width:'40%'}} >
                                   <video style={{height:'100%',width:'100%'}} muted={true} loop={true}>
                                       <source src={obj.postLink} ></source>
                                   </video>
                                </div>
                      })}
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    </div>);
}
 
export default Profile;
