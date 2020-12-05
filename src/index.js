import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Persist } from 'formik-persist'
import * as yup from 'yup';
import parseISO from 'date-fns/parseISO';
import addDays from 'date-fns/addDays';
import lightFormat from 'date-fns/lightFormat';

import './index.css';


const ranks = ['REC', 'PTE', 'LCP', 'CPL', 'CFC', '3SG', 'ME1', 'ME2', 'ME3'];
const incidents = ['RSI', 'RSO', 'MA'];

const validationSchema = yup.object().shape({
    rank: yup
        .string()
        .required('Rank is required')
        .uppercase()
        .oneOf(ranks),
    name: yup
        .string()
        .required('Name is required'),
    nric: yup
        .string()
        .required('Masked NRIC is required')
        .length(9, 'Masked NRIC must be exactly 9 characters')
        .uppercase()
        .matches(/([ST])XXXX([0-9]{3})([A-Z])/, 'Ensure that your NRIC is masked (Example: TXXXX123A)'),
    contact: yup
        .number('Only numerical digits are allowed')
        .required('Contact Number is required')
        .min(80000000, 'Invalid Contact Number')
        .max(99999999, 'Invalid Contact Number'),
    platform: yup
        .string()
        .required('Platform is required'),
    incident: yup
        .string()
        .required('Please select the type of incident')
        .oneOf(incidents),
    location: yup.string().required('Location is required'),
    date: yup.date().required('Date is required'),
    time: yup
        .string()
        .length(4, 'Please provide time in 24hr format')
        .required('Time is required')
        .matches(/([01][0-9]|2[0-3])([0-5][0-9])/, 'Please provide time in 24hr format'),
    reason: yup.string().required('Reason is required'),
    hasStatus: yup.string().required('Please state if the doctor has given you any statuses').oneOf(['Yes', 'No']),
    statuses: yup
        .array()
        .of(
            yup.object().shape({
                excuse: yup.string().required('Excuse is required'),
                duration: yup.number('Only numerical digits are allowed').required('Duration in days is required').min(1, 'Duration should be 1 day or more'),
                startDate: yup.date().required('Status starting date is required'),
            })
        ),
    swabbed: yup.string().required('Please state if you have done a swab test').oneOf(['Yes', 'No']),
    certNo: yup.string().required('MC No. or NIL is required'),
    medication: yup.string().required('Please state if the doctor has given you any medications').oneOf(['Yes', 'No']),
});

const initialValues = {
    rank: "",
    name: "",
    nric: "",
    contact: "",
    platform: "",
    incident: "",
    location: "",
    date: "",
    time: "",
    reason: "",
    medication: "",
    hasStatus: "",
    statuses: [
        {
            excuse: "",
            duration: "",
            startDate: "",
        },  // if changes to this variable is made, remember to edit below
    ],
    certNo: "",
    swabbed: "",
};

function formatStatusContents(values) {
    // This function generates the message body for all the statuses that is provided.
    const statuses = values.statuses;
    let messageStr = [];

    statuses.forEach(function (item, index) {
        const status = item.excuse.toUpperCase();
        const duration = item.duration;
        const startDate = parseISO(item.startDate);

        try {
            const endDate = addDays(startDate, duration - 1);
            messageStr.push(`${status} for ${duration} ${duration > 1 ? "days" : "day"} from ${lightFormat(startDate, "ddMMyyyy")} to ${lightFormat(endDate, "ddMMyyyy")}`);
        } catch (err) {
            // RangeError occurs when date field is not filled, since date would be invalid
            // temporarily set as empty string first
        }
    })

    return messageStr.join(', ');
}

function formatFirstMessageContents(values) {
    // This function generates the contents of the first message without the greeting and the "for your update and information"
    const nric = values.nric.toUpperCase();
    const rank = values.rank;
    const name = values.name.toUpperCase();
    const contact = values.contact;
    const platform = values.platform.toUpperCase();
    const incident = values.incident;
    const location = values.location.toUpperCase();
    const date = parseISO(values.date);
    let dateStr = "";
    try {
        dateStr = lightFormat(date, "ddMMyyyy");
    } catch (err) {
        // RangeError occurs when date field is not filled, since date would be invalid
        // temporarily set as empty string first
        dateStr = "";
    }

    const time = values.time;
    const reason = values.reason.toUpperCase();

    let MessageStr = `*<< ${nric} / ${rank} ${name} / ${contact} >>* from << *${platform}* >> is ${incident} at << *${location}* >> `;
    MessageStr += `on << *${dateStr} ${time}* >> for << *${reason}* >>. \n\n`;

    return MessageStr;
}

function formatSecondMessageContents(values) {
    // This function generates the contents for the outcome paragraph.
    const rank = values.rank;
    const name = values.name.toUpperCase();
    const hasMedication = values.medication;
    const hasStatus = values.hasStatus;
    const status = hasStatus === "Yes" ? formatStatusContents(values) : "NIL";
    const certNo = values.certNo.toUpperCase();
    const swabbed = values.swabbed;

    let MessageStr = `*${rank} ${name}* has been prescribed with << *${hasMedication}* >> and given << *${status}* >>. \n`;
    MessageStr += `MC Number: ${certNo} \n`;
    MessageStr += `Swab Test: *${swabbed}*\n\n`;

    return MessageStr;
}

function formatFirstMessage(values) {
    let MessageStr = "Dear Sirs/Ma'am,\n\n";
    MessageStr += formatFirstMessageContents(values);
    MessageStr += `For your update and information.`;

    return MessageStr;
}

function formatSecondMessage(values) {
    let MessageStr = "Dear Sirs/Ma'am,\n\n";
    MessageStr += formatFirstMessageContents(values);
    MessageStr += formatSecondMessageContents(values);
    MessageStr += `For your update and information.`;

    return MessageStr;
}

function FormPage() {
    return (
        <div className="container">
            <h1 className="text-center mt-2">RSI/RSO/MA Format Generator</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {console.log(values)}}
                render={({ errors, touched, values, isValid, dirty}) => (
                    <Form>
                        <Persist name="form" />
                        <h3 className="mb-0">Personal Particulars</h3>
                        <hr className="mt-1" />

                        <div className="form-row">
                            <div className="form-group col-12 col-md-3 col-lg-2">
                                <label htmlFor="rank">Rank</label>
                                <Field name="rank" as="select" className="form-control">
                                    <option value=""></option>
                                    {ranks.map(rank => {
                                        return <option value={rank}>{rank}</option>
                                    })}
                                </Field>
                                <ErrorMessage name="rank" component="div" className="field-error" />
                            </div>

                            <div className="form-group col-12 col-md-9 col-lg-6">
                                <label htmlFor="name">Name</label>
                                <Field name="name" type="text" className={`form-control ${errors.name && touched.name ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="name" component="div" className="field-error" />
                            </div>

                            <div className="form-group col-12 col-md-6 col-lg-4">
                                <label htmlFor="nric">Masked NRIC</label>
                                <Field name="nric" type="text"
                                       className={`form-control ${errors.nric && touched.nric ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="nric" component="div" className="field-error" />
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="contact">Contact Number</label>
                                <Field name="contact" type="number" className={`form-control ${errors.contact && touched.contact ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="contact" component="div" className="field-error" />
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="platform">Platform</label>
                                <Field name="platform" type="text" className={`form-control ${errors.platform && touched.platform ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="platform" component="div" className="field-error" />
                            </div>
                        </div>

                        <h3 className="mt-3 mb-0">Incident Details</h3>
                        <hr className="mt-1" />

                        <div className="form-row">
                            <div className="form-group col-12">
                                <p className="mb-0">You are going to:</p>
                                {incidents.map(incident => {
                                    return (
                                        <div className="">
                                            <label htmlFor={`incident_${incident}`} className="mb-0">
                                                <Field type="radio" name="incident" id={incident} value={incident} className="mr-3"/>
                                                {incident}
                                            </label>
                                        </div>

                                    )
                                })}
                                <ErrorMessage name="incident" component="div" className="field-error" />
                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="location">Location</label>
                                <Field name="location" type="text" className={`form-control ${errors.location && touched.location ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="location" component="div" className="field-error mb-0" />
                                <small className="form-text text-muted mt-0">Put location as "KMC" if you are going to RSI.</small>
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="date">Date</label>
                                <Field name="date" type="date" className={`form-control ${errors.date && touched.date ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="date" component="div" className="field-error mb-0" />
                            </div>

                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="time">Time</label>
                                <Field name="time" type="text" className={`form-control ${errors.time && touched.time ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="time" component="div" className="field-error mb-0" />
                                <small className="form-text text-muted mt-0">Enter time in 24-hour format (Example: 2330 or 0800)</small>
                            </div>

                            <div className="form-group col-12">
                                <label htmlFor="reason">Reason</label>
                                <Field name="reason" type="text" className={`form-control ${errors.reason && touched.reason ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="reason" component="div" className="field-error mb-0" />
                                <small className="form-text text-muted mt-0">
                                    If you are reporting sick for fever, include the temperature as well (Example: Fever of 38.2)
                                    <br />Note that flu is not a symptom.
                                </small>
                            </div>
                        </div>

                        <div className="form-row">
                            <p className="mb-0">Your 1st Message:</p>
                            <Field id="first-message" as="textarea" readOnly className="form-control mb-2" value={formatFirstMessage(values)} />
                            <button onClick={() => {
                                const element = document.getElementById("first-message");
                                element.select();
                                document.execCommand("copy");
                            }} className="btn btn-dark">
                                Copy Message
                            </button>
                        </div>

                        <h3 className="mt-3 mb-0">Outcome</h3>
                        <small className="form-text text-muted mt-0">Fill up this section after you have seen the doctor.</small>
                        <hr className="mt-1" />

                        <div className="form-row">
                            <div className="col-12">
                                <p className="mb-0">Did you obtain any medications from the doctor?</p>
                                <label htmlFor='medication-yes' className="mb-0">
                                    <Field type="radio" name="medication" id="medication-yes" value="Medication" className="mr-1"/>
                                    Yes
                                </label>
                                <label htmlFor="medication-no" className="mb-0 ml-3">
                                    <Field type="radio" name="medication" id="medication-no" value="NIL" className="mr-1"/>
                                    No
                                </label>
                                <ErrorMessage name="medication" component="div" className="field-error mb-0" />
                            </div>
                        </div>

                        <div className="form-row mt-3">
                            <div className="col-12">
                                <p className="mb-0">Did you obtain any statuses from the doctor?</p>
                                <label htmlFor='hasStatus-yes' className="mb-0">
                                    <Field type="radio" name="hasStatus" id="hasStatus-yes" value="Yes" className="mr-1"/>
                                    Yes
                                </label>
                                <label htmlFor="hasStatus-no" className="mb-0 ml-3">
                                    <Field type="radio" name="hasStatus" id="hasStatus-no" value="No" className="mr-1"/>
                                    No
                                </label>
                                <ErrorMessage name="hasStatus" component="div" className="field-error" />
                            </div>

                            { values.hasStatus === "Yes" && (
                                <div className="col-12 mt-3">
                                    <label htmlFor="status">Statuses</label>
                                    <FieldArray name="statuses">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                { values.statuses.length > 0  &&
                                                values.statuses.map((status, index) => (
                                                    <div className="form-row mb-3" key={index}>
                                                        <div className="col-12 col-md-4 col-lg-5">
                                                            <label htmlFor={`statuses.${index}.excuse`}>Status</label>
                                                            <Field name={`statuses.${index}.excuse`} type="text"
                                                                   className={`form-control ${(errors.statuses && errors.statuses[index] && errors.statuses[index].excuse) ? 'invalid-field' : 'valid-field'}`}
                                                            />
                                                            <ErrorMessage name={`statuses.${index}.excuse`} component="div" className="field-error mb-0" />
                                                        </div>

                                                        <div className="col-12 mt-2 mt-md-0 col-md-2">
                                                            <label htmlFor={`statuses.${index}.duration`}>No. of days</label>
                                                            <Field name={`statuses.${index}.duration`} type="number"
                                                                   className={`form-control ${(errors.statuses && errors.statuses[index] && errors.statuses[index].duration) ? 'invalid-field' : 'valid-field'}`}
                                                            />
                                                            <ErrorMessage name={`statuses.${index}.duration`} component="div" className="field-error mb-0" />
                                                        </div>

                                                        <div className="col-12 mt-2 mt-md-0 col-md-3 col-lg-2">
                                                            <label htmlFor={`statuses.${index}.startDate`}>Starting Date</label>
                                                            <Field name={`statuses.${index}.startDate`} type="date"
                                                                   className={`form-control ${(errors.statuses && errors.statuses[index] && errors.statuses[index].startDate) ? 'invalid-field' : 'valid-field'}`}
                                                            />
                                                            <ErrorMessage name={`statuses.${index}.startDate`} component="div" className="field-error mb-0" />
                                                        </div>

                                                        <div className="col-12 mt-2 mt-md-auto col-md-3 col-lg-2 d-flex">
                                                            <button type="button" className="btn btn-outline-danger" onClick={() => remove(index)}>
                                                                Remove Status
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="mt-2">
                                                    <button type="button" className="btn btn-outline-dark"
                                                            onClick={ () => push({excuse: "", duration: "", startDate: "",}) }
                                                    >
                                                        Add Additional Status
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            )}
                        </div>
                        
                        <div className="form-row mt-3">
                            <div className="form-group col-12">
                                <label htmlFor="certNo">MC Number</label>
                                <Field name="certNo" type="text" className={`form-control ${errors.certNo && touched.certNo ? 'invalid-field' : 'valid-field'}`} />
                                <ErrorMessage name="certNo" component="div" className="field-error mb-0" />
                                <small className="form-text text-muted mt-0">
                                    If you did not get any MC, put "NIL".
                                </small>
                            </div>

                            <div className="form-group col-12">
                                <p className="mb-0">Did you go through a swab test?</p>
                                <label htmlFor='swabbed-yes' className="mb-0">
                                    <Field type="radio" name="swabbed" id="swabbed-yes" value="Yes" className="mr-1"/>
                                    Yes
                                </label>
                                <label htmlFor="swabbed-no" className="mb-0 ml-3">
                                    <Field type="radio" name="swabbed" id="swabbed-no" value="No" className="mr-1"/>
                                    No
                                </label>
                                <ErrorMessage name="swabbed" component="div" className="field-error mb-0" />
                            </div>
                        </div>

                        <div className="form-row">
                            <p className="mb-0">Your 2nd Message:</p>
                            <Field id="second-message" as="textarea" readOnly className="form-control mb-2" value={formatSecondMessage(values)} />
                            <button onClick={() => {
                                const element = document.getElementById("second-message");
                                element.select();
                                document.execCommand("copy");
                            }} className="btn btn-dark">
                                Copy Message
                            </button>
                        </div>

                    </Form>
                )}
            />
        </div>
    )
}

ReactDOM.render(
    <FormPage />,
    document.getElementById('root')
);

