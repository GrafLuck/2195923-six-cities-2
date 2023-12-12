import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { AppRoute } from '../../app-route';
import { store } from '../../store/stores';
import { loginAction } from '../../store/actions/api-actions';
import { AuthData } from '../../types/auth-data';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AuthorizationStatus } from '../../const';

function LoginPage() : React.JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const onFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = (evt.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (evt.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    if (email && password) {
      const authorizationData: AuthData = {
        email: email,
        password: password
      };
      store.dispatch(loginAction(authorizationData));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities: Login</title>
      </Helmet>
      <Header isNavRequired={false}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={onFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

