import React, {useState, useRef, useEffect } from 'react';
import './SignupPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useForm } from '../../hooks/useForm';
import userService from '../../utils/userService';

export default function SignUpPage(props){
    const [invalidForm, setValidForm] = useState(false);
    const [error, setError ]          = useState('')
    const [state, handleChange]       = useForm({
        username: '',
        email: '',
        password: '',
        passwordConf: ''    
    })
   

    const formRef = useRef();

    useEffect(() => {
      formRef.current.checkValidity() ? setValidForm(false) : setValidForm(true);
    });



    return (
        <>
          <h1>Sign Up</h1>
          <form  autoComplete="off" ref={formRef} onSubmit={async (e) => {
            e.preventDefault()
            console.log(state, ' this is state')
            try {
                await userService.signup(state);
                // Route to wherever you want!
                alert("You're logged in! Time to Code where you want to go Now! ~ SignupComponent")
              } catch (err) {
                // Invalid user data (probably duplicate email)
                console.log(err.message)
                setError(err.message)
              }
          }}>
            <div className="form-group">
              <input
                className="form-control"
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="email"
                value={ state.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="password"
                type="password"
                placeholder="password"
                value={ state.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={ state.passwordConf}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn"
              disabled={invalidForm}
            >
              Signup
            </button>
          </form>

          {error ? <ErrorMessage error={error} /> : null}
        </>
      );
}
