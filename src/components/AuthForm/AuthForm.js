import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  AuthFormContainer,
  FormArea,
  InputArea,
  Button,
  Error,
  RouteAuth,
} from './ScAuthForm';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { SignIn, SignUp , ClearStatusCode } from '../../actions/Auth';
import { v4 as uuid } from 'uuid';
import { addNotification } from '../../actions/Notification';
import { useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const AuthForm = ({ title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const statusCode = useSelector((state) => state.auth.statusCode);
  const passwordRef = useRef();
  const mailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const _handleSubmit = (values, { setSubmitting }) => {
    if (title === 'Giriş Yap') {
      dispatch(SignIn(values.email, values.password));
      setSubmitting(false);
    } else {
      dispatch(SignUp(values.email, values.password));
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log(statusCode);
    if (statusCode.code === 401 && statusCode.code !== null) {
      dispatch(
        addNotification({
          id: uuid(),
          type: 'ERROR',
          message: 'Mail/Şifre Hatalı',
        })
      );
    } else if (statusCode.code === 409 && statusCode.code !== null) {
      dispatch(
        addNotification({
          id: uuid(),
          type: 'ERROR',
          message: 'Mail Adresi Zaten Kayıtlı',
        })
      );
    }
  }, [statusCode]);

  useEffect(() => {
    mailRef.current.focus();
  }, []);

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
            email: Yup.string()
              .email('Lütfen geçerli bir mail adresi girin')
              .required('Mail Alanı boş bırakılamaz'),
            password: Yup.string()
              .min(8, 'Şifreniz en az 8 karakterden oluşmalıdır')
              .max(20, 'Şifreniz en fazla 20 karakterden oluşabilir')
              .required('Şifre Alanı boş bırakılamaz'),
          })}
          onSubmit={_handleSubmit}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
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
                  onBlur={handleBlur}
                />
              </InputArea>
              {errors.email && touched.email && <Error>{errors.email}</Error>}
              <InputArea>
                <label htmlFor="password">Password</label>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    ref={passwordRef}
                    value={values.password}
                    autoComplete="on"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {!showPassword && (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14%',
                        cursor: 'pointer',
                      }}
                      size={20}
                    />
                  )}
                  {showPassword && (
                    <AiFillEye
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14%',
                        cursor: 'pointer',
                      }}
                      size={20}
                    />
                  )}
                </div>
                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}
                {title === 'Giriş Yap' && (
                  <a htmlFor="" href="#">
                    Şifremi Unuttum
                  </a>
                )}
              </InputArea>

              <Button
                type="submit"
                title={title}
                disabled={
                  !dirty || isSubmitting || errors.password || errors.email
                }
              >
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
            <RouteAuth onClick={() => history.push('/register')}>
              Üye Ol
            </RouteAuth>
          ) : (
            <RouteAuth onClick={() => history.push('/login')}>
              Giriş Yap
            </RouteAuth>
          )}
        </footer>
      </FormArea>
    </AuthFormContainer>
  );
};

export default AuthForm;
