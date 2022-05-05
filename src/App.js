import { Button, Input, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db } from "./firebase";
import ImageUpload from './ImageUpload';
import Post from './Post';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "white",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState("")
  useEffect(() => {
    const func = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        console.log(authuser);
        setUser(authuser);
        if (authuser.displayName) {

        } else {
          return authuser.updateProfile({
            displayName: username,
          })
        }
      }
      else {
        setUser(null);
      }
    })
    return () => {
      func()
    }
  }, [user, username]);
  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  const handleClose = () => setOpen(false);
  const Signup = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        return auth.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  }
  function SignIn(e) {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  }
  return (
    <div className="App">

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className='app_signup'>
              <center>
                <img
                  className='app_headerImage'
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
                <Input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}  required={true}/>
                <Input type="text" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                <Input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <Button type='submit' onClick={Signup}>Sign IP</Button>
              </center>

            </form>
          </Box>
        </Modal>
        <Modal
          open={openSignIn}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className='app_signup'>

              <center>
                <img
                  className='app_headerImage'
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
                {/* <Input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /> */}
                <Input type="text" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                <Input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <Button type='submit' onClick={SignIn}>Sign In</Button>
              </center>

            </form>
          </Box>
        </Modal>
      </div>
      <div className="app_header">
        <img
          className='app_headerImage'
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
        <div className="appLogInContainer">
          {
            user ? (

              <Button onClick={() => auth.signOut()}>Log Out</Button>
            ) : (
              <>
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
              </>
            )
          }
        </div>
      </div>
      {
        user ?
          (
            <>
              <div className="app_posts">
                {
                  posts.map(({ id, post }) => (
                    <Post 
                    key={id} 
                    postId={id}
                    user={user}
                    username={post.username} 
                    caption={post.caption} 
                    imageUrl={post.imageUrl} />
                  ))
                }
              </div>
            </>
          ) :
          (
            <div>
            </div>
          )
      }
      <ImageUpload username={username} />
    </div>
  );
}

export default App;
