import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from "./firebase"
import { Button, Input, Modal } from '@mui/material';
import { Box } from '@mui/system';
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
    db.collection('posts').onSnapshot(snapshot => {
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
      .then((authUser) => {
        return authUser.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message));
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
                <Input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="text" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
                <Input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <Button type='submit' onClick={Signup}>Sign Up</Button>
              </center>

            </form>
          </Box>
        </Modal>
      </div>
      <div className="app_header">
        <img
          className='app_headerImage'
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
      </div>
      {
        user ?
          (
            <Button onClick={() => auth.signOut}>Sign Up</Button>
          ) :
          (
            <Button onClick={() => setOpen(true)}>Log Out</Button>
          )

      }
      {
        posts.map(({ id, post }) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
