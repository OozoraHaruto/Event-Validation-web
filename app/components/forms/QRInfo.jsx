import React from 'react';
import { Formik } from 'formik';

const QRInfo = props => {
  const { handleFormSubmission } = props;

  return (
    <div>
      <h1>QR Generator</h1>
      <Formik
        initialValues={{
          eventName: "はるはのチックトック動画を見ています",
          date: "2018-10-16",
          website: "http://vt.tiktok.com/JAXNDx/",
        }}
        onSubmit={(values, actions) => {
          handleFormSubmission(values)
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                className="form-control" 
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.eventName}
                id="eventName"
                name="eventName"
              />
              {props.errors.eventName && <small id="emailHelp" className="form-text text-muted">{props.errors.eventName}</small>}
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control" 
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.date}
                id="date"
                name="date"
              />
              {props.errors.date && <small id="emailHelp" className="form-text text-muted">{props.errors.date}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="eventName">Website</label>
              <input
                type="url"
                className="form-control" 
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.website}
                id="website"
                name="website"
              />
              {props.errors.website && <small id="emailHelp" className="form-text text-muted">{props.errors.website}</small>}
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </div>
  )
};

export default QRInfo;