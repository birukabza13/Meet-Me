import { FaPlus } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

import { fetchUserProfile, toggleFollow, signOutApi } from "../../api/userApi";

import { useEffect, useState } from "react";

import { CLOUDINARY_BASE_URL } from "../../constants/constants";

import { Link, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const UserDetails = ({ username }) => {
    const [loading, setLoading] = useState(true);
    const [followersCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await fetchUserProfile(username);
                setIsFollowing(userData.is_following);
                setShowEditProfile(userData.is_self);
                setAvatarUrl(userData.avatar);
                setBio(userData.bio);
                setFollowerCount(userData.followers_count);
                setFollowingCount(userData.following_count);
                setPostsCount(userData.post_count);
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
            } catch (error) {
                console.log(error, "error occurred while getting user data");
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, [username]);

    const handleToggleFollow = async () => {
        try {
            await toggleFollow(username);
            isFollowing
                ? setFollowerCount((prevCount) => prevCount - 1)
                : setFollowerCount((prevCount) => prevCount + 1);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.log(error);
            alert("error occurred while trying to follow/unfollow");
        }
    };

    const handleSignOut = async () => {
        try {

            await signOutApi();
            localStorage.removeItem("user");
            navigate("/");
        }catch (error) {
            console.log(error, "error occurred while signing out");
            alert("error occurred while signing out");
        }
    }
    
    return (
        <>
            <div className="flex justify-center  mb-10">
                <div className="relative size-48">
                    {avatarUrl ? (
                        <img
                            src={`${CLOUDINARY_BASE_URL}${avatarUrl}`}
                            alt="User Avatar"
                            className="w-full h-full rounded-full object-cover border-4 border-primary shadow-md"
                        />
                    ) : (
                        <IoPersonCircleSharp className="w-full h-full text-white" />
                    )}

                    {avatarUrl ? null : (
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:text-secondary">
                            <FaPlus />
                        </div>
                    )}

                    <div className="absolute -bottom-7 -left-0 text-white">
                        <span>@{username}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start gap-3 pt-5">
                {showEditProfile ? (
                    <div className="flex  items-center gap-24">

                        <div className="flex ">
                            <Link to="/profile/edit" className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm shadow-secondary hover:shadow-none hover:bg-secondary">
                                Edit Profile
                            </Link>
                        </div>
                        <button className="all-unset bg-black w-28  h-10 rounded-lg flex justify-center items-center hover:bg-secondary shadow-secondary shadow-sm" onClick={handleSignOut}>
                            <span className="text-center">Sign out</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-start mb-3 relative group w-24">
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-lg shadow-sm shadow-secondary hover:shadow-none hover:bg-secondary w-28"
                            onClick={handleToggleFollow}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </button>

                        <div className="absolute top-[-20px] left-[110px] bg-black text-white text-sm px-2 py-1 rounded shadow-lg scale-0 group-hover:scale-100 transition-all duration-100 origin-left">
                            {isFollowing ? "Unfollow" : "Follow"}
                        </div>
                    </div>



                )}

                <div className="flex gap-12 justify-center text-white">
                    <div className="flex gap-1">
                        <span>{loading ? "-" : postsCount}</span>
                        <p>posts</p>
                    </div>
                    <div className="flex gap-1">
                        <span>{loading ? "-" : followersCount}</span>
                        <p>followers</p>
                    </div>
                    <div className="flex gap-1">
                        <span>{loading ? "-" : followingCount}</span>
                        <p>following</p>
                    </div>
                </div>

                <div className="flex gap-1">
                    <h3>{firstName}</h3>
                    <h3>{lastName}</h3>
                </div>

                <div className="mt-4">
                    <p className="text-white">{loading ? "" : bio}</p>
                </div>
            </div>
        </>
    );
};

UserDetails.propTypes = {
    username: PropTypes.string.isRequired,
};

export default UserDetails;
