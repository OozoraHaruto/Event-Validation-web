import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage } from 'formik';

const QRInfoForm = props => {
  const { handleFormSubmission }                                  = props;
  const validate = values =>{
    const errors                                                  = {};
    const now                                                     = new Date();

    const requiredFields = ['eventName', 'dateType'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field]                                             = 'Required';
      }
    })

    if(values.date.length == 0){
      errors.date                                                 = 'Required'
    }else{
      if (values.dateType == "Range" && values.date.length != 2){
        errors.date                                               = "2 dates are required for range"
      }else{
        var dateErrors                                            = {
          fieldEmpty: [],
          fieldInvalid: [],
        }
        values.date.forEach(function (item, index) {
          if(item == "") dateErrors.fieldEmpty.push((index + 1))
          else if (now > new Date(`${item}T23:59:59`)) dateErrors.fieldInvalid.push((index+1))
        })
        if (dateErrors.fieldEmpty.length != 0) errors.date        = "Dates cannot be blank at index " + dateErrors.fieldEmpty.toString();
        else if (dateErrors.fieldInvalid.length != 0) errors.date = "Date have to be later than now at index " + dateErrors.fieldInvalid.toString();
      }
    }

    if (values.website && !/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.website)) {
      errors.website                                              = 'Invalid Website'
    }

    return errors
  }

  return (
    <div>
      <Formik
        initialValues={{
          eventName: "",
          dateType: "Range",
          date: ["2009-10-16", "2059-10-16"],
          website: "",
        }}
        validate={validate}
        onSubmit={(values, formikBag) => handleFormSubmission(values, formikBag)}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <Field type="text" className="form-control" placeholder="Event Name" name="eventName" />
              <ErrorMessage component="div" className="form-text small text-danger" name="eventName" />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label><br/>
              <div className="form-check form-check-inline">
                <input type="radio" className="form-check-input" onChange={props.handleChange} onBlur={props.handleBlur} value="Range" id="dateTypeRange" name="dateType" checked={props.values.dateType == "Range" && "checked"} />
                <label className="form-check-label" htmlFor="dateTypeRange">Range</label>
              </div>
              <div className="form-check form-check-inline">
                <input type="radio" className="form-check-input" onChange={props.handleChange} onBlur={props.handleBlur} value="List" id="dateTypeList" name="dateType" checked={props.values.dateType == "List" && "checked"} />
                <label className="form-check-label" htmlFor="dateTypeList">List</label>
                <ErrorMessage component="div" className="form-text small text-danger" name="dateType" />
              </div>
              <div className="form-group">
                <FieldArray name="date" render={arrayHelpers => (
                  <div>
                    {props.values.date && props.values.date.length > 0 ? (
                      props.values.date.map((date, index) => (
                        <div key={`datelist${index}`}>
                          <div className="input-group mb-3">
                            <Field type="date" className="form-control" placeholder="Date" name={`date.${index}`} />
                            <div className="input-group-append">
                              <button type="button" className="btn btn-danger" onClick={() => arrayHelpers.remove(index)}>-</button>
                              <button type="button" className="btn btn-success" onClick={() => arrayHelpers.insert(index, '')} disabled={props.errors.date && "disabled"}>+</button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button type="button" className="btn btn-success" onClick={() => arrayHelpers.push('')}>Add a Date</button>
                    )}
                  </div>
                )} />
                <ErrorMessage component="div" className="form-text small text-danger" name="date" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="eventName">Website</label>
              <Field type="url" className="form-control" placeholder="Website" name="website" />
              <ErrorMessage component="div" className="form-text small text-danger" name="website" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Generate QR</button>
            </div>
          </form>
        )}
      />
    </div>
  )
};

export default QRInfoForm;