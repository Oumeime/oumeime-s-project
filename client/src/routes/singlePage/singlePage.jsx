import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await apiRequest.post("/chats", { message, receiverId: post.userId });
      setMessage("");
      setIsChatOpen(false);
      setSuccessMessage("Message sent successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiRequest.delete(`/posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        navigate("/profile"); // Redirect to profile page after deletion
      } else if (response.status === 403) {
        alert("Not Authorized!");
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={post.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{post.title}</h1>
                <div className='address'>
                  <img src='/pin.png' alt='' />
                  <span>{post.address}</span>
                </div>
                <div className='price'>MRU {post.price}</div>
              </div>
              <div className='user'>
                <img src={post.user.avatar} alt='' />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className='bottom'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='features'>
        <div className='wrapper'>
          <p className='title'>Générale</p>
          <div className='listVertical'>
            <div className='feature'>
              <img src='/utility.png' alt='' />
              <div className='featureText'>
                <span>Utilitaires</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Le propriétaire est responsable</p>
                ) : (
                  <p>Le locataire est responsable</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>meublage</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>meublé</p>
                ) : (
                  <p>non meublé </p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='' />
              <div className='featureText'>
                <span>Politique de revenu</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className='title'>Tailles</p>
          <div className='sizes'>
            <div className='size'>
              <img src='/size.png' alt='' />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className='size'>
              <img src='/bed.png' alt='' />
              <span>{post.bedroom} des lits</span>
            </div>
            <div className='size'>
              <img src='/bath.png' alt='' />
              <span>{post.bathroom} salle de bain</span>
            </div>
          </div>
          <p className='title'>Lieux à proximité</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <img src='/school.png' alt='' />
              <div className='featureText'>
                <span>ecole</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>Mosquée</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='' />
              <div className='featureText'>
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className='title'>Emplacement</p>
          <div className='mapContainer'>
            <Map items={[post]} />
          </div>
          <div className='buttons'>
            <button onClick={() => setIsChatOpen(true)}>
              <img src='/chat.png' alt='' />
              Envoyer un message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#1ABC9C" : "white",
              }}
            >
              <img src='/save.png' alt='' />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
            {currentUser && currentUser.id === post.userId && (
              <button onClick={handleDelete} className='deleteButton'>
                <img src='/delete.png' alt='' />
                Supprimer le poste
              </button>
            )}
          </div>
          {isChatOpen && (
            <form onSubmit={handleMessageSend} className='chatForm'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Type your message here'
              ></textarea>
              <button type='submit'>Envoyer</button>
            </form>
          )}
          {successMessage && (
            <div className='successMessage'>{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
