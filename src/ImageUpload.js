import { Button } from '@mui/material';
import fb from "firebase/compat/app";
import React, { useState } from 'react';
import { db, storage } from "./firebase";
import "./Imageupload.css";
function ImageUpload({ username }) {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                storage.ref("images").child(image.name).getDownloadURL().then(url => {
                    db.collection("posts").add({
                        timestamp: fb.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })
                })
                setImage(null);
            }
        )

    }
    return (
        <div className='Imageupload'>
            <progress value={progress} max="100"></progress>
            <input type="text" name="" id="" placeholder='Enter A Caption' value={caption} onChange={e => setCaption(e.target.value)} />
            <input type="file" onChange={handleChange} />
            <Button className="Imageupload_button" onClick={handleUpload}>    Upload</Button>
        </div>
    )
}

export default ImageUpload