import Link from "next/link";
function Demo({ username, photoURL, comment, timestamp, replyFlag }) {
    const favorite = false;

    const arr = (comment).split(' ');

    return (
        <ul>
            <li>

                <div className="flex flex-col">
                    <div style={{ 'backgroundColor': (!replyFlag) ? '#d4d4d9' : '#d4d4d0', 'borderRadius': favorite ? '8px 8px 0px 0px' : '8px 8px 8px 8px' }} className="p-4 mt-5    rounded-2xl shadow-sm">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Link href={`/${username}/`}>
                                <img className="rounded-full" src={photoURL} width={40} height={40} />
                            </Link>
                            <div>
                                <Link href={`/${username}/`}>
                                    <p className="cursor-pointer font-sans  font-semibold text-blue-600 ">@{username}</p>
                                </Link>
                                {timestamp ? (
                                    <p className="text-xs text-black">
                                        {new Date(timestamp?.toDate()).toLocaleString()}
                                    </p>
                                ) : (
                                    <p className="text-xs text-black">Loading</p>
                                )}
                            </div>
                        </div>

                        {/* <p className="pt-4 text-black font-bold">{comment}</p> */}
                        <div className="flex flex-wrap">
                        {   

                            arr.map((text) => {
                                return (
                                    (text[0] == '@') ?
                                    <Link href={`/${text.slice(1,text.length)}`}>
                                    <pre className="flex pt-4 text-blue-700 font-bold font-sans cursor-pointer">{text} </pre>
                                    </Link> 
                                      : <pre className="flex pt-4 text-black font-bold font-sans">{text} </pre>
                                    )
                                })
                        }
                                </div>
                    </div>
                </div>
            </li>
        </ul>
    );
}
function Com(cmnt) {

    const arr = (cmnt).split(' ');
    return (
        <>
            {
                arr.map((text) => {
                    return (
                        (text[0] == '@') ? <p className="pt-4 text-blue-700 font-bold">{text}</p> : <p className="pt-4 text-black font-bold">{text}</p>
                    )
                })
            }
        </>
    )
}
export default Demo;
