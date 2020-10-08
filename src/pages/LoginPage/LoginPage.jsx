import React, { useState, useRef, useEffect } from 'react';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useForm } from '../../hooks/useForm';
import userService from '../../utils/userService';

export default function LoginPage(props){
    const [invalidForm, setValidForm] = useState(false);
    const [error, setError ]          = useState('')
    const [state, handleChange]       = useForm({
        email: '',
        pw: '',
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
                await userService.login(state);
                // Route to wherever you want!
                alert("Logged in, time to go code where you want to go now!")
              } catch (err) {
                // Invalid user data (probably duplicate email)
                console.log(err.message)
                setError(err.message)
              }
          }}>
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
                name="pw"
                type="password"
                placeholder="password"
                value={ state.password}
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

