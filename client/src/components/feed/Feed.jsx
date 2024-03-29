import { useEffect,useState, useContext } from "react";
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import {Posts,Users} from "../../dummyData"

export default function Feed({username}) {
  // const user = Users.filter(u=> u.id===1)
  // console.log(user[0].username)
  // const F_URL = process.env.REACT_APP_API_ENDPOINT;
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = username 
       ? await axios.get("https://mjsocial2.onrender.com/api/posts/profile/" + username)
       : await axios.get("https://mjsocial2.onrender.com/api/posts/timeline/" + user._id)
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) -new Date(p1.createdAt)
      }))
    };

   fetchPosts();
    
  }, [username,user._id])

  return (
    <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts.map(p=>(
            <Post key={p._id} post={p}/>
          ))}
        </div>
    </div>
  )
}
