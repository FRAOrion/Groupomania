import React, { useState } from 'react'
import apiClient from "../http-common";
import { useNavigate, Link } from 'react-router-dom';
 
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [logStatus, setLogStatus] = useState('');
    const navigate = useNavigate();
 
    async function onSubmit(e) {
        e.preventDefault();

        const postData = {
          email: email,
          password: password,
        };

        try {
          const res = await apiClient.post("/auth/signin", postData);
    
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };
          console.log(result);
          console.log(res.status);

          if (res.status === 200) {
            setLogStatus('alert alert-success');
            setMsg('Connexion réussie !');
          }
          
          localStorage.setItem('id', result.data.user.id);
          localStorage.setItem('email', result.data.user.email);
          localStorage.setItem('role', result.data.user.role);
          localStorage.setItem('token', result.data.token);
          setTimeout(() => {
            navigate("/articles");
          }, 1000);
          
        } catch (err) {
          if (err.response.status === 404) {
            setLogStatus('alert alert-danger');
            setMsg('Email ou mot de passe incorrect !');
          }
          console.log(err);
        }
    }

    return (
        <section className="container mt-5">
        <h1>Connexion</h1>
            <form onSubmit={onSubmit}>
                <div className={logStatus}>
                    {msg}
                </div>
                <div className='py-2'>
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='py-2'>
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='py-2'>
                    <input type="submit" value="Se connecter" className="btn btn-primary" />
                    <ul className='list-group'>
                        <li><Link to="/register">S'enregistrer</Link></li>
                    </ul>
                </div>
            </form>
        </section>
    )
}
 
export default Login