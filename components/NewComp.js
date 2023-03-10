import PostFeed from '@components/PostFeed';
import TrendingPostFeed from '@components/TrendingPostFeed';

export default function NewComp({ posts }) {

    const newPostArray = [];
    posts?.map(post => {
        if (!post?.trending) newPostArray.push(post);
    })

    return (

        <>
            <main >
                <div className='container '>
                    <h1 className='font-bold'>Latest Blog 🔥</h1>
                    <div className='flex overflow-x-scroll hide-scroll-bar'>
                        <TrendingPostFeed posts={posts} />
                    </div>
                    <br></br>
                    <h1 className='font-bold'>Explore Discuss 🔎</h1>

                    <div className='flex flex-col overflow-hidden'>
                        <PostFeed posts={newPostArray} />

                    </div>
                </div>
            </main>
        </>



    )
}