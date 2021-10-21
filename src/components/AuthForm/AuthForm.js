import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { SignIn, SignUp } from '../../actions/Auth';
import { v4 as uuid } from 'uuid';
import { addNotification } from '../../actions/Notification';
import { useSelector } from 'react-redux';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';

const AuthForm = ({ title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const statusCode = useSelector((state) => state.auth.statusCode)
  const passwordRef = useRef();
  const mailRef = useRef();
  const [showPassword,setShowPassword] = useState(false);

  const _handleSubmit = (values,{setSubmitting }) => {
    if (title === 'Giriş Yap') {
      dispatch(SignIn(values.email, values.password));
      setSubmitting(false)
    } else {
      dispatch(SignUp(values.email, values.password));
      setSubmitting(false)
    }
  };

  useEffect(() => {
    if(statusCode.code === 401 && statusCode.code !==null)
    {
      dispatch(addNotification({id:uuid(),type:'ERROR',message:'Mail/Şifre Hatalı'}))

    }


  },[statusCode])

  //console.log(statusCode);
  return (
    <AuthFormContainer>
      <FormArea>
        <header>
          <div>{title}</div>
          <p>Fırsatlardan yararlanmak için {title.toLowerCase()}!</p>
        </header>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required('Mail Alanı boş bırakılamaz'),
            password: Yup.string().min(8,'Şifreniz en az 8 karakterden oluşmalıdır').max(20,'Şifreniz en fazla 20 karakterden oluşabilir').required('Şifre Alanı boş bırakılamaz'),
          })}
          onSubmit={_handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            touched,
            dirty,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <InputArea>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  ref={mailRef}
                  value={values.email}
                  onChange={handleChange}
                />
              </InputArea>
              {(errors.email || touched.email) && <Error>{errors.email}</Error>}
              <InputArea>
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  ref={passwordRef}
                  value={values.password}
                  autoComplete="on"
                  onChange={handleChange}

                />
                {!showPassword && <AiFillEyeInvisible onClick={()=>setShowPassword(!showPassword)} style={{position:'absolute',right:'14%',cursor:'pointer'}} size={20}/>}
                {showPassword && <AiFillEye onClick={()=>setShowPassword(!showPassword)} style={{position:'absolute',right:'14%',cursor:'pointer'}} size={20}/>}
              {(errors.password || touched.password) && <Error>{errors.password}</Error>}
                <a htmlFor="">Şifremi Unuttum</a>
              </InputArea>

              <Button type="submit" disabled={!dirty || isSubmitting || errors.password || errors.email }>
                {title}
              </Button>
            </form>
          )}
        </Formik>
        <footer>
          {title === 'Giriş Yap' ? (
            <span>Hesabın yok mu?</span>
          ) : (
            <span>Zaten üye misin?</span>
          )}
          {title === 'Giriş Yap' ? (
            <span onClick={() => history.push('/register')}>Üye Ol</span>
          ) : (
            <span onClick={() => history.push('/login')}>Giriş Yap</span>
          )}
        </footer>
      </FormArea>
    </AuthFormContainer>
  );
};

export default AuthForm;

const AuthFormContainer = styled.div`
  width: 50%;
  height: 60%;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 3px 12px #1e36480a;
  border-radius: 8px;
  margin-top: 25px;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  header {
    div {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
    }
    p {
      font-size: 15px;
      text-align: center;
    }
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  footer {
    margin-top: 8px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  position: relative;
  input {
    width: 80%;
    padding: 5px 0;
    border-radius: 8px;
    font-size: 16px;
    color: #99a0a7;
  }
  label {
    display: flex;
    width: 80%;
    font-size: 15px;
  }
  a {
    display: flex;
    justify-content: flex-end;
    width: 80%;
  }
`;

const Button = styled.button`
  display: flex;
  width: 80%;
  justify-content: center;
  padding: 5px;
  color: #ffffff;
  background-color: #4b9ce2;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-top:8px;
  :disabled{
    cursor: auto;

  }
`;

const Error = styled.div`
width: 80%;
text-align: start;
color:red;
`