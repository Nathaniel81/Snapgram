import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader";
import { useGetUsers } from "../../lib/react-query/queries";
import { IUser } from "../../types";
import PostCard from "../../components/shared/PostCard";
import { Post } from "../../types";
import { useGetRecentPosts } from "../../lib/react-query/queries";


const Home = () => {
    const userLogin = useSelector((state: RootState) => state.user);
    const { 
        userInfo, 
      } = userLogin;
      const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/sign-in');
        }
    }, [userInfo, navigate]);

    const {
      data: posts,
      isLoading: isPostLoading,
      isError: isErrorPosts,
    } = useGetRecentPosts();

    const {
      data: creators,
      isLoading: isUserLoading,
      isError: isErrorCreators,
    } = useGetUsers(5);
  
    if (isErrorPosts || isErrorCreators) {
      return (
        <div className="flex flex-1">
          <div className="home-container">
            <p className="body-medium text-light-1">Something bad happened</p>
          </div>
          <div className="home-creators">
            <p className="body-medium text-light-1">Something bad happened</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-1">
        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            {isPostLoading && !posts ? (
              <Loader />
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full ">
                {posts?.map((post: Post) => (
                  <li key={post?.id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
  
        <div className="home-creators">
          <h3 className="h3-bold text-light-1">Top Creators</h3>
          {isUserLoading && !creators ? (
            <Loader />
          ) : (
            <ul className="grid 2xl:grid-cols-2 gap-6">
              {creators?.map((creator: IUser) => (
                <li key={creator?.id}>
                  {/* <UserCard user={creator} /> */}
                  {creator?.id}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

export default Home;
