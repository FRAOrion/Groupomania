import React, { useState } from 'react'
import apiClient from "../http-common";
import { useNavigate, Link } from "react-router-dom";
 
const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [logStatus, setLogStatus] = useState('');
    const navigate = useNavigate();

    const EMAIL_REGEX = /^[\w-.]+@(\w+)\.[\w-]{2,4}$/g;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const validEmail = EMAIL_REGEX.test(email);
    const validPwd = PWD_REGEX.test(password);
 
    async function onSubmit(e) {
        e.preventDefault();        

        if (!validEmail || !validPwd) return;
        if (!verifPwd()) return;
        const postData = {
          email: email,
          password: password,
        };
        console.log(postData);
        try {
          const res = await apiClient.post("/auth/signup", postData);
    
          const result = {
            status: res.status + "-" + res.statusText,
            headers: res.headers,
            data: res.data,
          };

          if (res.status === 201) {
            setLogStatus('alert alert-success');
            setMsg('Inscription réussie !');
          }

          console.log(result);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (err) {
          console.log(err);
        }
    }

    function verifPwd() {
      if (password === '') {
        return false;
      }
      if (password !== confPassword) {
        return false;
      } else {
        return true;
      }
    };
    console.log(verifPwd());

    return (
    <section className="container mt-5">
      <h1>Inscription</h1>
      <form onSubmit={onSubmit}>
          <div className={logStatus}>
              {msg}
          </div>
          <div className='py-2'>
              <label className="form-label">Email</label>
              {validEmail ?
                <input type="text" className="form-control is-valid" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              :
              <input type="text" className="form-control" placeholder="exemple@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              }
          </div>
          <div className='py-2'>
              <label className="form-label">Mot de passe</label>
              {validPwd ?
              <input type="password" className="form-control is-valid" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required />
              :
              <input type="password" className="form-control" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} required />
              }
              <p className='mb-0'><small className="text-muted"><i className="fa-solid fa-circle-info"></i> Une majuscule, un numéro et un caractère spécial requis. Longueur de 8 à 24 caractères.</small></p>
          </div>
          <div className='py-2'>
              <label className="form-label">Confirmez le mot de passe</label>
              {verifPwd() ?
              <input type="password" className="form-control is-valid" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
              :
              <input type="password" className="form-control" placeholder="******" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} required />
              }
          </div>
          <div className='py-2'>
              <input type="submit" value="S'enregistrer" className="btn btn-primary" />
              <ul className='list-group'>
                  <li><Link to="/">Se connecter</Link></li>
              </ul>
          </div>
      </form>
    </section>
    )
}
 
export default Register;