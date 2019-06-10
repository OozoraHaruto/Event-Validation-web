import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';


const QRInfoForm = props => {
  const { handleFormSubmission } = props;
  const validate = values => {
    const errors = {};

    const requiredFields = ['username', 'password'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    })

    return errors
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validate={validate}
        onSubmit={(values, formikBag) => handleFormSubmission(values, formikBag)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Username</label>
              <Field type="text" className="form-control" placeholder="Username" name="username" />
              <ErrorMessage component="div" className="form-text small text-danger" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="eventName">Password</label>
              <Field type="password" className="form-control" placeholder="password" name="password" />
              <ErrorMessage component="div" className="form-text small text-danger" name="password" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        )}
      />
    </div>
  )
};

export default QRInfoForm;