import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '@lib/firebase';
import Loader from './Loader';
import {
  FolderRemoveIcon,UserRemoveIcon,UploadIcon,CameraIcon,ClipboardCopyIcon
} from "@heroicons/react/solid";
import { toast } from 'react-hot-toast';
// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const [iscopied,setCopied] = useState(false);
  const uploadFile = async (e) => {
    setCopied(false);
    const toastid = toast.loading("Uploading...",{"icon":"📤"});
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        toast("Paste Source URL in your Markdown", {"icon":"📝"})
        setUploading(false);
        toast.dismiss(toastid);

      });
      
    };
    
    function copyfunc(){
      navigator.clipboard.writeText(`![alt](${downloadURL})`);
      setCopied(true);
      toast.success("Text Copied to Clipboard!")
    }
  return (
    <div className="box">
      {/* <Loader show={uploading} /> */}
      {/* {uploading && <h3>{progress}%</h3>} */}

      {!uploading  && (
        <>
          <label className="flex ">
            <CameraIcon className='icon text-gray-700'/><h3 className='mt-9 font-sans text-gray-700 font-bold'>Upload Image</h3>
            <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
        </>
      )}

      {downloadURL &&  !iscopied && <code  className="upload-snippet overflow-hidden rounded-md ">{`![alt](${downloadURL})`}</code>}
      {
        downloadURL && !iscopied &&
        <span>
          <ClipboardCopyIcon onClick={copyfunc}   className='icon   bg-gray-300' /> 
          <p className='font-mono text-sm m-1 font-bold text-center'>COPY</p>
        </span>
      }
    </div>
  );
}
