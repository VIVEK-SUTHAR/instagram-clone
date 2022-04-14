import { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "VIVEK",
      caption: "HEY ALL",
      imageUrl: "https://dummyimage.com/600x400/000/fff"
    },
    {
      username: "PAPA",
      caption: "WHAT US CVOR",
      imageUrl: "https://dummyimage.com/600x400/000/aff"
    }
  ]);
  return (
    <div className="App">
      <div className="app_header">
        <img
          className='app_headerImage'
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
      </div>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
