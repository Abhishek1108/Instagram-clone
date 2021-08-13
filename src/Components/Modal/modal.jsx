import React, { Component, useState } from 'react';
import Cross from "@material-ui/icons/Close";
import {InsertPhoto,Movie,Instagram} from '@material-ui/icons';
import { uuid } from 'uuidv4';
import { firebaseDB, firebaseStorage } from '../../Config/firebase';

import { Container, makeStyles,Grid, Typography,Divider,Card,IconButton,CardActions,Button} from '@material-ui/core';



import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';




const Modal = (props) => {
    let {setModal}=useContext(AuthContext);
    const[postObj,setPost]=useState(null);
    const{currentUser}=useContext(AuthContext);

let useStyles=makeStyles({
    modalHeader:{
        display:"flex",
        flexDirection:"row",
         height:"10%",
         width:"100%",
    },
    modalBody:{
        height:"90%",
        width:"100%",
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

    }
})

let classes=useStyles();

const closeModal =()=>{
   setModal("false");
}

const setfileInState = (e)=>{

    let fileObj=e.target.files[0];
     setPost(fileObj);
}
 const handlePostUpload = async ()=>{
    try {
        let uid=currentUser.uid;
        const uploadpostobj=firebaseStorage.ref(`/profilePost/${uid}/${Date.now()}`).put(postObj);
        uploadpostobj.on("state_changed",fun1,fun2,fun3);


        function fun1(){

        }
        function fun2(){

        }
       async function fun3(){
          let postUrl=await uploadpostobj.snapshot.ref.getDownloadURL();
           let pid=uuid();
           firebaseDB.collection("post").doc(uid).set({
             pid:pid,
             uid:uid,
             comments:[],
             likes:[],
             postLink:postUrl,
           })
         let doc= await firebaseDB.collection("users").doc(uid).get();
         let document=doc.data();
         document.postCreated.push(pid);
         await firebaseDB.collection("users").doc(uid).set(document);

        }
        
      } catch (error) {
        
      }
 }

    return ( 
        <div style={{position:"absolute",height:'100vh',width:'100vw',background:"white"}}>
            <Container style={{height:"100%",display:"flex",justifyContent:'center',alignItems:"center"}}>
                <Card variant="inclined" style={{height:'90%',width:"90%",boxShadow:"2px 3px 4px 4px lightgray"}}>
                  <Grid container style={{height:'100%',display:"flex",flexDirection:"row"}}>
                      <Grid className={classes.modalHeader} item >
                         <Typography style={{width:"55%",display:'flex',alignItems:'center',justifyContent:"flex-end",fontSize:'2rem'}}>New Post</Typography>
                         <CardActions style={{width:"45%",height:'100%',display:'flex',alignItems:'center',justifyContent:"flex-end"}}> <IconButton onClick={closeModal}><Cross></Cross></IconButton></CardActions>
                        
                       </Grid >
                       
                       <Divider variant="middle" orientation="horizontal" flexItem></Divider>
                
                       
                       <Grid item className={classes.modalBody}>
                         <Instagram fontSize="large" style={{fontSize:"90"}}></Instagram>
                         <Typography style={{fontSize: '2rem',color: '#576574'}}>Select Photos and Videos</Typography>

                            <Button size="large"  variant="contained" color="primary" onClick={handlePostUpload} component="label"  >
                            
                              Select from Computer
                            </Button>
                            <input type="file"  onChange={(e)=>setfileInState(e)} ></input>   
                       </Grid>
                    </Grid>
                </Card>
              
            </Container>
        </div>
     );
}
 
export default Modal;