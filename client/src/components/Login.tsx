import React, { useContext } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { login, logout, userIsNone } from '../auth';
import { AuthContext } from './App';

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const user = useContext(AuthContext);
  const initialValues: FormValues = { email: '', password: '' };

  const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setSubmitting(true);
    const error = await login(values.email, values.password);
    if (error) {
      const invalid = 'Incorrect email or password';
      actions.setErrors({ email: invalid, password: invalid });
    }
  };

  const renderLoginForm = () => (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {props => (
        <form className="mt-6" onSubmit={props.handleSubmit}>
          <div>
            <label
              className="flex items-center justify-between text-sm text-gray-600 font-bold"
              htmlFor="email"
            >
              <span>Email</span>
              <span className="italic text-red-500 font-normal">{props.errors.email || ''}</span>
            </label>
            <input
              type="text"
              name="email"
              className={`mt-1 p-2 w-72 border border-gray-400 ${
                props.errors.email ? 'bg-red-100' : 'bg-gray-50'
              } focus:bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 focus:border-blue-400`}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
          <div className="mt-6">
            <label
              className="flex items-center justify-between text-sm text-gray-600 font-bold"
              htmlFor="password"
            >
              <span>Password</span>
              <span className="italic text-red-500 font-normal">{props.errors.password || ''}</span>
            </label>
            <input
              type="password"
              name="password"
              className={`mt-1 p-2 w-72 border border-gray-400 ${
                props.errors.password ? 'bg-red-100' : 'bg-gray-50'
              } focus:bg-white focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 focus:border-blue-400`}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </div>
          <button
            className="mt-6 w-full p-3 flex items-center justify-center bg-green-300 hover:bg-green-400 font-bold focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40"
            type="submit"
            disabled={!props.isValid || props.isSubmitting}
          >
            <span>Login</span>
            <svg
              className="ml-1 w-6 h-6 text-green-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </form>
      )}
    </Formik>
  );

  const renderLogBackIn = () => (
    <div className="flex flex-col">
      <button className="mt-6 py-3 px-6 w-full flex items-center bg-white border-2 border-green-400">
        <div className="-ml-2">
          <svg
            className="w-10 h-10 text-gray-400 transform rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </div>
        <div className="ml-3 text-left">
          <p className="text-sm text-gray-600">Login as</p>
          <p className="text-xl font-bold">{user.email}</p>
        </div>
      </button>
      <button
        className="mt-6 py-3 px-6 w-full flex items-center bg-gray-100 hover:bg-gray-50 border border-gray-400 text-left"
        onClick={() => logout()}
      >
        <div>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </div>
        <p className="ml-3">Login as a different user</p>
      </button>
    </div>
  );

  return (
    <div className="m-auto max-w-screen-sm h-screen flex items-center justify-center">
      <div>
        <div className="h-2 bg-blue-300 rounded-t"></div>
        <div className="bg-white shadow-lg p-12 rounded-b-sm">
          <h1 className="font-black text-2xl">Reporter Login</h1>
          {userIsNone(user) ? renderLoginForm() : renderLogBackIn()}
        </div>
      </div>
    </div>
  );
};
