import React, { useState } from "react";
import apiClient from "../http-common";
import { useNavigate } from "react-router-dom";



const NewArticle = () => {

  const token = localStorage.getItem('token');
  const localId = localStorage.getItem('id');

  const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();

    async function onSubmit(e) {
      e.preventDefault();
      const postData = new FormData();
        postData.append("userId", localId);
        postData.append("title", title);
        postData.append("description", description);
        postData.append("image", image);
      console.log(postData);

      try {
        const res = await apiClient.post("/articles", postData, {
          headers: {
            "Authorization": token,
          }
        });
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
  
        console.log(result);
        navigate("/articles");
      } catch (err) {
        console.log(err.response);
      }
    }

    return (
      <section className="container mt-5">
        <h1>Nouvel Article</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="titre" className="form-label">Titre</label>
              <input type="text" className="form-control" id="titre" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea type="text" className="form-control" id="description" placeholder="..." value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="file">Image</label>
              <input type="file" name="image" id="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-3">                    
                <input className='btn btn-primary' type='submit' value='Créer' />
            </div>
        </form>
      </section>
    );
};
 
export default NewArticle;