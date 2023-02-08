import styles from '@styles/Admin.module.css';
import AuthCheck from '@components/AuthCheck';
import { firestore, auth, serverTimestamp } from '@lib/firebase';
import ImageUploader from '@components/ImageUploader';
import { UserContext } from '@lib/context';
import { useState , useContext} from 'react';
import { useRouter } from 'next/router';

import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';

import Login from '@components/Login';

export default function AdminPostEdit(props) {
  return (
    <AuthCheck fallback={<Link href="/enter"><Login/></Link>}>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);



  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  const [post] = useDocumentDataOnce(postRef);
  

  const { username } = useContext(UserContext);

  

  return (
    <>
      <main className={styles.container}>
        {post && (
          <>

            <section>
              <span className='flex mb-2'>

              <h1 className='font-sans font-bold rounded  p-2'>{post.title}</h1>
              </span>
                
              {/* <p>ID: {post.slug}</p> */}

              <button className='shadow-md shadow-gray-400   bg-gray-700 text-white ' onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
              <PostForm postRef={postRef} defaultValues={post} preview={preview} />
            </section>
          </>
        )}
      </main>
      {/* <header  className="absolute   align-center bottom-2 border-b-blue-100 border-blue-100 border-2 rounded-2xl  z-60  bg-gray-100  items-center pt-2 p-2 ">
      <div className="flex flex-grow">
        <div className="flex space-x-8 md:space-x-6">
          <div >
        <button className='shadow-xl' onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
           
          </div>
          <div >
        <DeletePostButton postRef={postRef} />
          
          </div>
         

        </div>
      </div>
    </header> */}
    </>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty } = formState;
  const router = useRouter();
  const [isTrend,setTrend] = useState(false);
  const updatePost = async ({ content, published }) => {
    const tags = content.split(' ').filter(v=> v.startsWith('#'))
    if(tags.length > 3) tags.slice(0,3);
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
      trending:isTrend,
      tag:tags
    });
    
    reset({ content, published });
    
    toast.success('Post updated successfully!');
    router.push('/admin');
  };
  const { username } = useContext(UserContext);
  const [isAdmin, setAdmin] = useState(false);
  
  let adminsName = ['surajgaud','abhinavawasthi','anishde85'];
  if(adminsName.includes(username) && !isAdmin){
    setAdmin(true);
  }
  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>

        <textarea
          className='rounded bg-yellow-50 mt-2'
          name="content"
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
        ></textarea>

        <ImageUploader />
        {/* {errors.content && <p className="text-danger">{errors.content.message}</p>} */}

        <fieldset>
          <input className="w-auto p-2 m-2 shadow " name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>
        {isAdmin && 
        <fieldset>
          <input onClick={()=>setTrend(!isTrend)} className="w-auto p-2 m-2 shadow " name="published" type="checkbox" />
          <label>Trending</label>
        </fieldset>
        }
        

        <button type="submit" className="btn-green shadow-xl shadow-gray-200" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
        <DeletePostButton postRef={postRef} /> 

      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('post annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <>
      <button className="btn-red" onClick={deletePost}>
        Delete
      </button>
    </>
  );
}
