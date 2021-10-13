import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { SignIn, SignUp } from '../../actions/Auth';
const AuthForm = ({ title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const _handleSubmit = (values) => {
    if (title === 'Giriş Yap') {
      dispatch(SignIn(values.email, values.password));
    } else {
      dispatch(SignUp(values.email, values.password));
    }
  };
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
            password: Yup.string().required('Şifre Alanı boş bırakılamaz'),
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
                  value={values.email}
                  onChange={handleChange}
                />
              </InputArea>
              <InputArea>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={values.password}
                  autoComplete="on"
                  onChange={handleChange}
                />
                <a htmlFor="">Şifrenimi Unuttun</a>
              </InputArea>
              <Button type="submit" disabled={!dirty || isSubmitting}>
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
    margin-top: 10px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px;
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
`;
