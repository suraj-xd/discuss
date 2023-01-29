import Link from "next/link";
function Demo({ username, photoURL, comment, timestamp, replyFlag }) {
    const favorite = false;
    return (
        <ul>
            <li>

                <div className="flex flex-col">
                    <div style={{ 'backgroundColor':(!replyFlag) ? '#d4d4d9' : '#d4d4d0', 'borderRadius': favorite ? '8px 8px 0px 0px' : '8px 8px 8px 8px' }} className="p-4 mt-5    rounded-2xl shadow-sm">
                        <div className="flex items-center space-x-2 cursor-pointer">
                        <Link href={`/${username}/`}>
                            <img className="rounded-full" src={photoURL} width={40} height={40} />
                            </Link>
                            <div>
                            <Link href={`/${username}/`}>
                                <p  className="cursor-pointer font-sans  font-bold text-gray-900 ">@{username}</p>
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

                        <p className="pt-4 text-black">{comment}</p>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Demo;
