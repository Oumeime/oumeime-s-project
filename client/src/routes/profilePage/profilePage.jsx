import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await apiRequest.delete(`/posts/${postId}`);
    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>informations de l'utilisateur</h1>
            <Link to="/profile/update">
              <button>Mettre à jour le profil</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
            Nom d'utilisateur: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </div>
          <div className="title">
            <h1>Ma liste</h1>
            <Link to="/add">
              <button>Créer un nouveau Poste</button>
            </Link>
          </div>
          <Suspense fallback={<p>Chargement...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Erreur lors du chargement des postes!</p>}
            >
              {(postResponse) => (
                <List posts={postResponse.data.userPosts} onDelete={handleDeletePost} />
              )}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Liste enregistrée</h1>
          </div>
          <Suspense fallback={<p>Chargement...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Erreur lors du chargement des postes!</p>}
            >
              {(postResponse) => (
                <List posts={postResponse.data.savedPosts} onDelete={handleDeletePost} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Chargement...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Erreur lors du chargement des messages!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
