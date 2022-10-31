import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../http-common";

function ModifyArticle() {

    const [newTitle, setNewTitle] = useState();
    const [newDescription, setNewDescription] = useState();
    const [image, setImage] = useState();
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const articleId = localStorage.getItem('articleId');
    const articleTitle = localStorage.getItem('articleTitle');
    const articleDescription = localStorage.getItem('articleDescription');
    const articleImageUrl = localStorage.getItem('articleImageUrl');

  async function onSubmit(e) {
    e.preventDefault();
    const postData = new FormData();
      postData.append("id", articleId);
      postData.append("title", newTitle);
      postData.append("description", newDescription);
      postData.append('ancientImageUrl', articleImageUrl);
      postData.append("image", image);

    try {
      const res = await apiClient.put(`/articles/${articleId}`, postData, {
        headers: {
          "Authorization": token,
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);

      localStorage.removeItem('articleId');
      localStorage.removeItem('articleTitle');
      localStorage.removeItem('articleDescription');
      localStorage.removeItem('articleImageUrl')
      navigate("/articles");
    } catch (err) {
      console.log(err.reponse.data.message);
    }    
  }

  return (
    <section className="container mt-5">
      <h1>Modifier l'article <span className="badge bg-secondary">#{articleId}</span></h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Titre de l'article</label>
          <input type="text" className="form-control" id="titre" placeholder={articleTitle} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" placeholder={articleDescription} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="file">Image</label>
          <input type="file" name="image" id="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="mb-3">
          <input className='btn btn-primary' type='submit' value='Modifier' />
        </div>
      </form>
    </section>
  );
}

export default ModifyArticle;