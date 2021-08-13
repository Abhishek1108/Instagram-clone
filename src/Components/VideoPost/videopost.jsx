import React, { Component, useContext, useEffect, useState } from 'react';
import {Card,CardActions,CardMedia,CardContent,Button,makeStyles,Typography,CardHeader,Container,Avatar,Grid,IconButton,TextField,Divider} from '@material-ui/core'
import { firebaseDB } from '../../Config/firebase';
import {Favorite,FavoriteBorder } from "@material-ui/icons";
import Send from "@material-ui/icons/Send";
import { AuthContext } from '../../Context/AuthProvider';
const VideoPost = (props) => {
   const[user,setUser]=useState(null);
   const[comment,setComment]=useState("");
   const{currentUser}=useContext(AuthContext);
   const[commentList,setCommentList]=useState([]);
   let[isLike,setIsLike]=useState(false);
   let[likeCount,setLikeCount]=useState(null);


   useEffect(async ()=>{
       let uid=props.postObj.uid;
    let doc= await firebaseDB.collection("users").doc(uid).get();
    let user=doc.data();

   let commentList=props.postObj.comments;

   let updatedCommentList=[];

//    for(let i=0;i<commentList.length;i++){
//        let commentObj=commentList[i];
//        let doc= await firebaseDB.collection('users').doc(commentObj.uid).get();
//        let commentUserPic=doc.data().profilePhotoUrl;
//        updatedCommentList.push({
//            profilePic:commentUserPic,
//            comment:commentObj.comment,
//        }) 
//     }

    setUser(user);
     setCommentList(updatedCommentList);    
   },[])
  
   let useStyles=makeStyles({
       mainContainer:{
           height:"100%",
          width:"100%",
         
       },
       headerGrid:{
           height:"55px",
           display:"flex",
           alignItems:'center',
           gridGap:"20px",
       },
       videoPost:{
           display:"flex",
           alignItems:'flex-start',
          height:"365px",
       },
       Footer:{
         height:"180px",
         display:'flex',
         flexDirection:'column',
       }

   })

let classes=useStyles();
const addCommentToCommentList = async ()=>{

    let profilePic;

    if(currentUser.uid==user.uid){
          profilePic=user.profilePhotoUrl;

    }else{
      let doc =await firebaseDB.collection('users').doc(currentUser.uid).get();
      let user=doc.data();
      profilePic=user.profilePhotoUrl;

    }

    let newCommentList=[...commentList,{profilePic:profilePic,comment:comment}];


    let postObject=props.postObj;
    postObject.comments.push({uid:currentUser.uid,comment:comment});

    await firebaseDB.collection('post').doc(postObject.pid).set(postObject);
    setCommentList(newCommentList);
    
    setComment("");


}
const toggleLikeButton = async  () =>{
   if(isLike){
   //already like hai post
   let postObj=props.postObj;
  let filteredLikesArray= postObj.likes.filter(uid=>{
       if(uid==currentUser.uid){
           return false;
       }else{
           return true;
       }
   })
  postObj.likes=filteredLikesArray;
  await firebaseDB.collection('post').doc(postObj.pid).set(postObj);
  setIsLike(false);
  likeCount==1?setLikeCount(null):setLikeCount(likeCount-1);

   }else{
   //first time like kr rahe hai post

   let postObj=props.postObj;
   postObj.likes.push(currentUser.uid);
   await firebaseDB.collection('post').doc(postObj.pid).set(postObj);
   setIsLike(true);
   likeCount==null?setLikeCount(1):setLikeCount(likeCount+1);

   }
}

    return (
        <div style={{height:"100%", paddingTop:"50px",}}>
            <Container className={classes.mainContainer}>
               <Card style={{height:"600px",display:"flex",flexDirection:'column'}}>
                    <Grid item className={classes.headerGrid}>
                       <Avatar style={{marginLeft:"5px"}} src={user?user.profilePhotoUrl:""}></Avatar>
                      <Typography  style={{fontSize:"1.3rem",fontWeight:'bold'}} variant="span">{user?user.userName:""}</Typography>
                    </Grid>
                   <CardMedia  className={classes.videoPost}>
                     <Video src={props.postObj.postLink}></Video>
                   </CardMedia>
                   <Grid item  className={classes.Footer}>
                     <Grid item style={{height:'20%',display:'flex'}}>
                        {/* like icon */}
                       {isLike ? <Favorite  style={{ color: "red" }} onClick={()=>toggleLikeButton()}></Favorite >: <FavoriteBorder onClick={()=>toggleLikeButton()}></FavoriteBorder >}
                       {likeCount &&(<div><Typography variant="p" >Liked by {likeCount} other</Typography></div>)}
                     </Grid>
                     <Grid item style={{minHeight:'60%',overflowY:'auto'}}>
                         
                            {commentList.map((commentObj)=>{
                                console.log(commentObj);
                                return <div style={{display:'flex',alignItems:'center',padding:"7px"}}>
                                <Avatar sizes="small"  src={commentObj.profilePic}></Avatar>
                                <Typography variant="p">{commentObj.comment}</Typography>
                                </div>
                            })}
                     </Grid>
                     <Divider></Divider>
                     <Grid item style={{height:'20%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            {/* comment input field */}
                          
                        <TextField  InputProps={{ disableUnderline: true ,placeholder:'Add a comment...',}} style={{width:'90%',padding:'7px'}}
                         value={comment}
                         onChange={(e) => {
                           setComment(e.target.value);
                         }}
                        ></TextField>
                        <IconButton style={{width:'10%'}} onClick={addCommentToCommentList}><Send></Send></IconButton>
                     </Grid>
                   </Grid>
               </Card>
            </Container>
        </div>
        
        
     );
}
function Video(props){
    return (
        <video muted={true} loop={true} controls style={{height:"100%",width:'100%'}}>
            <source src={props.src} type="video/mp4"></source>
        </video>
    );
} 
 
export default VideoPost;