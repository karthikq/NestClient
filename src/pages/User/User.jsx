/** @format */

import React, { useEffect, useState } from "react";
import "./user.styles.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserbyId, updateUserdata } from "../../store/userSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { CreateNewFile } from "../../firebase/upload";
import CustomrLottie from "../../components/Lottie/Lottie";

import toast from "react-hot-toast";
import UserLottie from "../../components/Lottie/UserLottie";
import Useractions from "../../components/Useractions/Useractions";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { fetchposts } from "../../store/postsSlice";
import LoaderLottie from "../../components/Lottie/Loader";
const User = () => {
  const [changeImage, setChangeImage] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchedUser = useSelector((state) => state.user.fetchedUser);
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    url: "",
  });
  const [imageFile, setImageFile] = useState("");
  const [locationHash, setLocationHash] = useState("");

  useEffect(() => {
    fetchUser(id);
    setisUpdating(true);
    fetchPostDetails();
    setTimeout(() => {
      setisUpdating(false);
    }, 1000);
  }, [id]);

  const fetchPostDetails = async () => {
    await dispatch(fetchposts());
  };
  const fetchUser = async (id) => {
    try {
      await dispatch(getUserbyId(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetchedUser) {
      setUserData({
        username: fetchedUser?.username,
        email: fetchedUser?.email,
        url: fetchedUser?.url,
      });
    }
  }, [fetchedUser]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const localUrl = URL.createObjectURL(file);
    setUserData(() => ({ ...userData, url: localUrl }));
  };
  const cb = (val) => {
    setisUpdating(false);
    setChangeImage(false);
    if (val === 1) {
      toast.success("Your data has been updated");
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (
      userData.username === fetchedUser.username &&
      userData.url === fetchedUser.url
    ) {
      toast.error("Nothing to update");
      return setisUpdating(false);
    }
    setisUpdating(true);
    if (imageFile) {
      const uploadcallback = async (url) => {
        if (url) {
          const newData = userData;
          newData.url = url;

          await dispatch(updateUserdata(id, newData, cb));
        }
      };
      CreateNewFile(imageFile, imageFile.name, "", "", uploadcallback);
    }
  };

  useEffect(() => {
    if (window.location.hash) {
      setLocationHash(window.location.hash.split("#")[1]);
    }
  }, [window.location.hash]);

  const sortedarrPost =
    fetchedUser.posts?.length > 0 &&
    [...fetchedUser.posts]?.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });

  return (
    <div className="user-container">
      {isUpdating && (
        <div className="loader-wrapper ">
          <LoaderLottie />
        </div>
      )}
      <div className="user-contents">
        <div className="user-details">
          <div className="user-image-container">
            <div className="user-bgimage">
              <img src={"https://picsum.photos/800/200"} alt="bgimage" />
            </div>
            <div className="user-nav-wrapper">
              <div className="user-profile-img">
                <img src={userData && userData.url} alt="err" />
              </div>
              <div className="user-nav">
                <ul>
                  {user.userId === fetchedUser.userId && (
                    <>
                      <Link to="#settings">
                        <li
                          className={
                            locationHash === "settings" ? "li-active" : ""
                          }
                        >
                          <SettingsIcon className="user-nav-icon" />
                          Setting's
                        </li>
                      </Link>
                      <Link to="#liked">
                        <li
                          className={
                            locationHash === "liked" ? "li-active" : ""
                          }
                        >
                          <FavoriteIcon className="user-nav-icon" /> Liked
                        </li>
                      </Link>
                      <Link to="#comment">
                        <li
                          className={
                            locationHash === "comment" ? "li-active" : ""
                          }
                        >
                          <CommentIcon className="user-nav-icon" />
                          Comments
                        </li>
                      </Link>{" "}
                    </>
                  )}
                  <Link to="#post">
                    <li className={locationHash === "post" ? "li-active" : ""}>
                      <DynamicFeedIcon className="user-nav-icon" />
                      posts
                    </li>
                  </Link>
                </ul>
              </div>
            </div>{" "}
          </div>
          <div className="user-items">
            {user.userId === fetchedUser.userId &&
              locationHash === "settings" && (
                <div className="user-form">
                  <form onSubmit={formSubmit}>
                    <div className="user-form-item">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="text"
                        value={userData.username ? userData.username : ""}
                        onChange={(e) =>
                          setUserData(() => ({
                            ...userData,
                            username: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div
                      className="user-form-item"
                      style={{ opacity: "0.7", cursor: "not-allowed" }}
                    >
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="text"
                        readOnly
                        value={userData.email ? userData.email : ""}
                        onChange={(e) =>
                          setUserData(() => ({
                            ...userData,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {!changeImage ? (
                      <div className="user-form-item">
                        <span
                          className="change-btn"
                          onClick={() => setChangeImage(!changeImage)}
                        >
                          Change profile image
                        </span>
                      </div>
                    ) : (
                      <div className="user-form-item">
                        <label
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Profile image
                          <span onClick={() => setChangeImage(false)}>
                            <CancelIcon className="cancel-icon" /> cancel change
                          </span>
                        </label>
                        <input type="file" onChange={handleChangeImage} />
                      </div>
                    )}

                    <div className="user-form-item">
                      <button>Update</button>
                    </div>
                  </form>
                </div>
              )}{" "}
            <div className="useractions-wrapper">
              {locationHash === "liked" && (
                <div>
                  {fetchedUser?.likes?.length > 0 ? (
                    fetchedUser?.likes.map((item) => (
                      <Useractions
                        item={item.post}
                        key={item.id}
                        user={user}
                        fetchedUser={fetchedUser}
                      />
                    ))
                  ) : (
                    <>
                      <UserLottie />
                      <p
                        style={{
                          textAlign: "center",
                          margin: "0",
                          fontSize: "20px",
                          fontWeight: "500",
                          position: "relative",
                          bottom: 15,
                        }}
                      >
                        Nothing Found
                      </p>
                    </>
                  )}
                </div>
              )}{" "}
              {locationHash === "comment" && (
                <div>
                  {fetchedUser?.comments?.length > 0 ? (
                    fetchedUser?.comments
                      ?.filter(
                        (value, index, self) =>
                          index ===
                          self.findIndex((t) => t.post.id === value.post.id)
                      )
                      .map((item) => (
                        <Useractions
                          item={item.post}
                          key={item.id}
                          user={user}
                          fetchedUser={fetchedUser}
                        />
                      ))
                  ) : (
                    <>
                      <UserLottie />
                      <p
                        style={{
                          textAlign: "center",
                          margin: "0",
                          fontSize: "20px",
                          fontWeight: "500",
                          position: "relative",
                          bottom: 15,
                        }}
                      >
                        Nothing Found
                      </p>
                    </>
                  )}
                </div>
              )}{" "}
              {locationHash === "post" && (
                <div>
                  {fetchedUser?.posts?.length > 0 ? (
                    sortedarrPost.map((item) => (
                      <Useractions
                        item={item}
                        key={item.id}
                        user={user}
                        fetchedUser={fetchedUser}
                      />
                    ))
                  ) : (
                    <>
                      <UserLottie />
                      <p
                        style={{
                          textAlign: "center",
                          margin: "0",
                          fontSize: "20px",
                          fontWeight: "500",
                          position: "relative",
                          bottom: 15,
                        }}
                      >
                        Nothing Found
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
