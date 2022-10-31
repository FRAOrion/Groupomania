import React, { useState, useEffect } from "react";
import apiClient from "../http-common";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const GetArticles = () => {

    const token = localStorage.getItem('token');
    const localId = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const [articles, setArticles] = useState([]);
    const [articleLiked, setArticleLiked] = useState([]);
    const [articleDisliked, setArticleDisliked] = useState([]);

    useEffect(() => {
        getArticles();
        isLiked();
        isDisliked();
    }, []);

    const getArticles = async () => {
        try {
        const res = await apiClient.get("/articles",{
            headers: {
              "Authorization": token,
            }
        });
        const result = {
            data: res.data
        };
        setArticles(result.data)
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteById(id) {
        // const articleId = article.id;
        if (id) {
            try {
                const res = await apiClient.delete(`/articles/${id}`, {
                    headers: {
                        "Authorization": token,
                    }
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                };
                console.log(result);
                window.location.reload(false);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
    };

    async function modifyById(article) {
        localStorage.setItem('articleId', article.id);
        localStorage.setItem('articleTitle', article.title);
        localStorage.setItem('articleDescription', article.description);
        localStorage.setItem('articleImageUrl', article.imageUrl);
        navigate("/modifyarticle");
    };

    async function likeById(e) {
        const articleId = e;

        if (articleId) {
            try {
                const res = await apiClient.put(`/articles/like/${articleId}`, {
                    userLiked: localId
                }, {
                    headers: {
                        "Authorization": token,
                    }
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                };
                console.log(result);
                window.location.reload(false);
            } catch (err) {
                console.log(err.response);
            }
        }
    };

    async function dislikeById(e) {
        const articleId = e;

        if (articleId) {
            try {
                const res = await apiClient.put(`/articles/dislike/${articleId}`, {
                    userDisliked: localId
                }, {
                    headers: {
                        "Authorization": token,
                    }
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                };
                console.log(result);
                window.location.reload(false);
            } catch (err) {
                console.log(err.response);
            }
        }
    };

    function isLoggedOrAdmin(userId) {
        if (localId === userId || role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    const isLiked = async () => {
        try {
        const res = await apiClient.get('/articles/liked',{
            headers: {
              "Authorization": token,
            }
        });
        const result = {
            data: res.data
        };
        setArticleLiked(result.data)
        } catch (err) {
            console.log(err);
        }
    }
    
    function articleIsLiked(id) {
        const userLiked = articleLiked.filter(article => article.userId == localId);
        const found = userLiked.find(article => article.articleId == id);
        if (!found) {
            return true;
        } else {
            return false;
        }
    }

    const isDisliked = async () => {
        try {
        const res = await apiClient.get('/articles/disliked',{
            headers: {
              "Authorization": token,
            }
        });
        const result = {
            data: res.data
        };
        setArticleDisliked(result.data)
        } catch (err) {
            console.log(err);
        }
    }
    
    function articleIsDisliked(id) {
        const userDisliked = articleDisliked.filter(article => article.userId == localId);
        const found = userDisliked.find(article => article.articleId == id);
        if (!found) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-4">
            {articles.map((article) => (
                <div className="col">
                    <div className="card">
                    <img src={article.imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.description}</p>
                        </div>
                        <div className="container mb-2">
                            <div className="btn-toolbar justify-content-between">
                                <div className="btn-group">
                                    {isLoggedOrAdmin(article.userId) ?
                                        <>
                                        <button className="btn btn-sm btn-warning" onClick={e => modifyById(article)}><i className="fa-solid fa-pen"></i></button>
                                        <button className="btn btn-sm btn-danger" onClick={e => deleteById(article.id)}><i className="fa-solid fa-trash"></i></button>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                                
                                <div className="btn-group">
                                    {articleIsLiked(article.id) ?
                                    <button type="button" className="btn btn-sm btn-outline-success" onClick={e => likeById(article.id)}><i className="fa-regular fa-thumbs-up"></i> {article.likes}</button>
                                    :
                                    <button type="button" className="btn btn-sm btn-success" disabled><i className="fa-solid fa-thumbs-up"></i> {article.likes}</button>
                                    }
                                    {articleIsDisliked(article.id) ?
                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={e => dislikeById(article.id)}><i className="fa-regular fa-thumbs-down"></i> {article.dislikes}</button>
                                    :
                                    <button type="button" className="btn btn-sm btn-danger" disabled><i className="fa-solid fa-thumbs-down"></i> {article.dislikes}</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Publié le {moment(article.createdAt).format('DD-MM-YYYY')} à {moment(article.createdAt).format('HH:MM')}</small>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default GetArticles;