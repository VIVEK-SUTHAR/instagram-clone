import { Avatar } from '@mui/material';
import firebase from "firebase/compat/app";
import React, { useEffect, useState } from 'react';
import { db } from "./firebase";
import "./post.css";
function Post({ postId, user,username, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = () => {
                db.collection('posts')
                    .doc(postId)
                    .collection('comments')
                    .orderBy("timestamp","desc")
                    .onSnapshot((snapshot) => {
                        setComments(snapshot.docs.map(
                            (doc) =>
                                doc.data()
                        ))
                    })
            }
        }
        return unsubscribe;
    }, [postId])
    const postComment = (e) => {
        e.preventDefault();
        db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
        
    }
    return (
        <div className='post'>
            <div className="post_header">
                <Avatar className='post_avatar' alt='vivek' />
                <h3>{username}</h3>
            </div>
            <img className='post_image' src={imageUrl} alt="" />
            <h4 className='post_text'>
                <strong>
                    {username}
                </strong>
                {caption}</h4>
            <div className="comments">
                {
                    comments.map((cmt) => (
                        <p>
                            <b>{cmt.username}</b>{cmt.text}
                        </p>
                    ))
                }
            </div>
            <form className='commentBox'>
                <input type="text"
                    className='post_input'
                    placeholder='Add A Comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className="post_button"
                    type="submit"
                    onClick={postComment}
                >Post</button>
            </form>
        </div>
    )
}

export default Post