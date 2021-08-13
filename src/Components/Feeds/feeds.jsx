import React, { Component, useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Header from '../Header/header';
import Modal from '../Modal/modal';
import { firebaseDB, firebaseStorage } from '../../Config/firebase';
import {Container,Grid,Card,Avatar,Typography,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { width } from '@material-ui/system';
import { uuid } from 'uuidv4';
import VideoPost from '../VideoPost/videopost';

const Feeds = (props) => {
  
  const [user,setUser]=useState(null);
  const[allPostObj,setAllPost]=useState([]);
  let {signOut,currentUser,showModal}=useContext(AuthContext);
  let[suggestedUserList,setSuggestedUserList]=useState([]);
  


  const handleLogOut= async (e)=>{
    await signOut();
  }

  let useStyle=makeStyles({
    mainGrid:{
      height:"calc(100% - 50px)",
       display:'flex',
       flexDirection:'column',
       background:"#f5f6fa",
       paddingLeft: "270px",
       paddingRight: "270px",
    },
    feeds:{
      height:"100%",
       width:'70%',
       overflowY:'auto',
    },
    suggestion:{
      display:'flex',
      height:'40%',
       width:"30%",
       flexDirection:'column',
       paddingTop:'50px',
    }
    // 8448131005
  })

  let classes=useStyle();
  
  let conditionObject = {
    root: null, //observe from whole page
    threshold: "0.8", //80%
  };

  function cb(entries) {
    console.log(entries);
    entries.forEach((entry) => {
      let child = entry.target.children[0];
      // play(); => async
      // pause(); => sync

      child.play().then(function () {
        if (entry.isIntersecting == false) {
          child.pause();
        }
      });
    });
  }
  useEffect(() => {
    // code which will run when the component loads
    let observerObject = new IntersectionObserver(cb, conditionObject);
    let elements = document.querySelectorAll(".video-container");

    elements.forEach((el) => {
      observerObject.observe(el); //Intersection Observer starts observing each video element
    });
  }, [allPostObj]);

  useEffect( async  ()=>{
      let uid=currentUser.uid;
    
    let doc=await firebaseDB.collection("users").doc(uid).get();
    let userData=doc.data();
    setUser(userData);
     let snapshot=await firebaseDB.collection("post").get();
     let allPost=snapshot.docs.map(doc=>{
       return doc.data();
     })
     
     setAllPost(allPost);

    let allUsers= await firebaseDB.collection("users").get();
     let allUserlist=allUsers.docs.map(doc=>{
       return doc.data();
     })
     let filteredList=allUserlist.filter(userObj =>{
      
       if(userObj.UserId==currentUser.uid){
         return false;
       }else{
         return true;
       }
     })
     console.log(allUserlist);
     console.log(filteredList);
     setSuggestedUserList(filteredList);

  },[]);

    
    console.log(showModal)
    return (
      showModal=='true'?<Modal></Modal>:
    <div style={{height:'100vh',width:'100vw'}}>
      <Container style={{height:'100%',maxWidth:'100%',paddingLeft:'0px',paddingRight:'0px'}}>
        <Header></Header>
        
        <Grid container className={classes.mainGrid}>
          {/* //left feeds side grid */}
          <Grid item className={classes.feeds}>
            <Grid item style={{height:"100%"}}>
              {allPostObj.map((postObj)=>{
                
                return <VideoPost key={postObj.pid} postObj={postObj}></VideoPost>
              })}
            </Grid>
          </Grid>
          {/* //right side grid */}
          <Grid item className={classes.suggestion}>
           <Grid item style={{height:'30%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:"30px",paddingRight:'30px'}}>
                <Avatar style={{height:"80%",width:'19%'}} src={user?user.profilePhotoUrl:""}></Avatar>
                 <Typography style={{fontWeight:"bold",color:"#2d3436"}}>{user?user.userName:''}</Typography>
                 {/* <Typography>Abhishek Singh Tanwar</Typography> */}
                 <Button  >
                 <Link onClick={handleLogOut}  to="/login" style={{textDecoration:"none",color:"blue",fontSize:"0.7rem",fontWeight:'bold'}}>Switch</Link>
                 </Button>
           </Grid>
           <Grid item style={{height:'70%',paddingLeft:"30px",paddingRight:'30px'}}>
             <Typography style={{color:"#636e72",paddingTop:'10px',fontWeight:'bold',marginBottom:'10px'}}>Suggestion For You</Typography>
             {suggestedUserList.map(userObj=>{
                return  <div style={{display:"flex",alignItems:'center',marginBottom:"5px",justifyContent:'space-around'}}>
                         <Avatar src={userObj.profilePhotoUrl}></Avatar>
                        <Typography>{userObj.userName}</Typography>
                        <Typography style={{textDecoration:"none",color:"blue",fontSize:'0.8rem'}}>follow</Typography>
                        </div>
                         
             })}

           </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
    );
}
 
export default Feeds;
