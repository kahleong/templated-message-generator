(this["webpackJsonptemplated-message-generator"]=this["webpackJsonptemplated-message-generator"]||[]).push([[0],{59:function(e,a,t){"use strict";t.r(a);var c=t(0),s=(t(1),t(54)),r=t.n(s),o=t(2),n=t(57),l=t(9),i=(t(67),["REC","PTE","LCP","CPL","CFC","3SG","ME1","ME2","ME3"]),m=["RSI","RSO","MA"],d=l.d().shape({rank:l.e().required("Rank is required").uppercase().oneOf(i),name:l.e().required("Name is required"),nric:l.e().required("Masked NRIC is required").length(9,"Masked NRIC must be exactly 9 characters").uppercase().matches(/([ST])XXXX([0-9]{3})([A-Z])/,"Ensure that your NRIC is masked (Example: TXXXX123A)"),contact:l.c("Only numerical digits are allowed").required("Contact Number is required").min(8e7,"Invalid Contact Number").max(99999999,"Invalid Contact Number"),platform:l.e().required("Platform is required"),incident:l.e().required("Please select the type of incident").oneOf(m),location:l.e().required("Location is required"),date:l.b().required("Date is required"),time:l.e().length(4,"Please provide time in 24hr format").required("Time is required").matches(/([01][0-9]|2[0-3])([0-5][0-9])/,"Please provide time in 24hr format"),reason:l.e().required("Reason is required"),status:l.e().required("Status is required"),swabbed:l.a().required("Reason is required")}),b={rank:"",name:"",nric:"",contact:"",platform:"",incident:"",location:"",date:"",time:"",reason:"",medication:"",status:"",certNo:"",swabbed:""};function j(e){var a=e.nric.toUpperCase(),t=e.rank,c=e.name.toUpperCase(),s=e.contact,r=e.platform.toUpperCase(),o=e.incident,n=e.location.toUpperCase(),l=function(e){var a=e.split("-");return(a=a.reverse()).join("")}(e.date),i=e.time,m=e.reason.toUpperCase(),d="*<< ".concat(a," / ").concat(t," ").concat(c," / ").concat(s," >>* from << *").concat(r,"* >> is ").concat(o," at << *").concat(n,"* >> ");return d+="on << *".concat(l," ").concat(i,"* >> for << *").concat(m,"* >>. \n\n")}function u(e){var a="Dear Sirs/Ma'am,\n\n";return a+=j(e),a+="For your update and information.\n"}function x(e){var a="Dear Sirs/Ma'am,\n\n";return a+=j(e),a+=function(e){var a=e.rank,t=e.name.toUpperCase(),c=e.medication,s=e.status,r=e.certNo.toUpperCase(),o=e.swabbed,n="*".concat(a," ").concat(t,"* has been prescribed with << *").concat(c,"* >> and given << *").concat(s,"* >>. \n");return n+="MC Number: ".concat(r," \n"),n+"Swab Test: *".concat(o,"*\n\n")}(e),a+="For your update and information.\n"}function f(){return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)("h1",{className:"text-center mt-2",children:"RSI/RSO/MA Format Generator"}),Object(c.jsx)(o.d,{initialValues:b,validationSchema:d,onSubmit:function(e){console.log(e)},render:function(e){var a=e.errors,t=e.touched,s=e.values;return Object(c.jsxs)(o.c,{children:[Object(c.jsx)(n.a,{name:"form"}),Object(c.jsx)("h3",{className:"mb-0",children:"Personal Particulars"}),Object(c.jsx)("hr",{className:"mt-1"}),Object(c.jsxs)("div",{className:"form-row",children:[Object(c.jsxs)("div",{className:"form-group col-12 col-md-3 col-lg-2",children:[Object(c.jsx)("label",{htmlFor:"rank",children:"Rank"}),Object(c.jsxs)(o.b,{name:"rank",as:"select",className:"form-control",children:[Object(c.jsx)("option",{value:""}),i.map((function(e){return Object(c.jsx)("option",{value:e,children:e})}))]}),Object(c.jsx)(o.a,{name:"rank",component:"div",className:"field-error"})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-9 col-lg-6",children:[Object(c.jsx)("label",{htmlFor:"name",children:"Name"}),Object(c.jsx)(o.b,{name:"name",type:"text",className:"form-control ".concat(a.name&&t.name?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"name",component:"div",className:"field-error"})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-6 col-lg-4",children:[Object(c.jsx)("label",{htmlFor:"nric",children:"Masked NRIC"}),Object(c.jsx)(o.b,{name:"nric",type:"text",className:"form-control ".concat(a.nric&&t.nric?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"nric",component:"div",className:"field-error"})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-6",children:[Object(c.jsx)("label",{htmlFor:"contact",children:"Contact Number"}),Object(c.jsx)(o.b,{name:"contact",type:"number",className:"form-control ".concat(a.contact&&t.contact?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"contact",component:"div",className:"field-error"})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-6",children:[Object(c.jsx)("label",{htmlFor:"platform",children:"Platform"}),Object(c.jsx)(o.b,{name:"platform",type:"text",className:"form-control ".concat(a.platform&&t.platform?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"platform",component:"div",className:"field-error"})]})]}),Object(c.jsx)("h3",{className:"mt-3 mb-0",children:"Incident Details"}),Object(c.jsx)("hr",{className:"mt-1"}),Object(c.jsxs)("div",{className:"form-row",children:[Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("p",{className:"mb-0",children:"You are going to:"}),m.map((function(e){return Object(c.jsx)("div",{className:"",children:Object(c.jsxs)("label",{htmlFor:"incident_".concat(e),className:"mb-0",children:[Object(c.jsx)(o.b,{type:"radio",name:"incident",id:e,value:e,className:"mr-3"}),e]})})})),Object(c.jsx)(o.a,{name:"incident",component:"div",className:"field-error"})]}),Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("label",{htmlFor:"location",children:"Location"}),Object(c.jsx)(o.b,{name:"location",type:"text",className:"form-control ".concat(a.location&&t.location?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"location",component:"div",className:"field-error mb-0"}),Object(c.jsx)("small",{className:"form-text text-muted mt-0",children:'Put location as "KMC" if you are going to RSI.'})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-6",children:[Object(c.jsx)("label",{htmlFor:"date",children:"Date"}),Object(c.jsx)(o.b,{name:"date",type:"date",className:"form-control ".concat(a.date&&t.date?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"date",component:"div",className:"field-error mb-0"})]}),Object(c.jsxs)("div",{className:"form-group col-12 col-md-6",children:[Object(c.jsx)("label",{htmlFor:"time",children:"Time"}),Object(c.jsx)(o.b,{name:"time",type:"text",className:"form-control ".concat(a.time&&t.time?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"time",component:"div",className:"field-error mb-0"}),Object(c.jsx)("small",{className:"form-text text-muted mt-0",children:"Enter time in 24-hour format (Example: 2330 or 0800)"})]}),Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("label",{htmlFor:"reason",children:"Reason"}),Object(c.jsx)(o.b,{name:"reason",type:"text",className:"form-control ".concat(a.reason&&t.reason?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"reason",component:"div",className:"field-error mb-0"}),Object(c.jsxs)("small",{className:"form-text text-muted mt-0",children:["If you are reporting sick for fever, include the temperature as well (Example: Fever of 38.2)",Object(c.jsx)("br",{}),"Note that flu is not a symptom."]})]})]}),Object(c.jsxs)("div",{className:"form-row",children:[Object(c.jsx)("p",{className:"mb-0",children:"Your 1st Message:"}),Object(c.jsx)(o.b,{id:"first-message",as:"textarea",readOnly:!0,className:"form-control mb-2",value:u(s)}),Object(c.jsx)("button",{onClick:function(){document.getElementById("first-message").select(),document.execCommand("copy")},className:"btn btn-dark",children:"Copy Message"})]}),Object(c.jsx)("h3",{className:"mt-3 mb-0",children:"Outcome"}),Object(c.jsx)("small",{className:"form-text text-muted mt-0",children:"Fill up this section after you have seen the doctor."}),Object(c.jsx)("hr",{className:"mt-1"}),Object(c.jsx)("div",{className:"form-row",children:Object(c.jsxs)("div",{className:"col-12",children:[Object(c.jsx)("p",{className:"mb-0",children:"Did you obtain any medications from the doctor?"}),Object(c.jsxs)("label",{htmlFor:"medication-yes",className:"mb-0",children:[Object(c.jsx)(o.b,{type:"radio",name:"medication",id:"medication-yes",value:"Medication",className:"mr-1"}),"Yes"]}),Object(c.jsxs)("label",{htmlFor:"medication-no",className:"mb-0 ml-3",children:[Object(c.jsx)(o.b,{type:"radio",name:"medication",id:"medication-no",value:"NIL",className:"mr-1"}),"No"]})]})}),Object(c.jsxs)("div",{className:"form-row mt-3",children:[Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("label",{htmlFor:"status",children:"Status"}),Object(c.jsx)(o.b,{name:"status",type:"text",className:"form-control ".concat(a.status&&t.status?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"status",component:"div",className:"field-error mb-0"}),Object(c.jsxs)("small",{className:"form-text text-muted mt-0",children:["Format for status: MC for X days from DDMMYYYY to DDMMYYYY",Object(c.jsx)("br",{}),'If you did not get any status, put "NIL".']})]}),Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("label",{htmlFor:"certNo",children:"MC Number"}),Object(c.jsx)(o.b,{name:"certNo",type:"text",className:"form-control ".concat(a.certNo&&t.certNo?"invalid-field":"valid-field")}),Object(c.jsx)(o.a,{name:"certNo",component:"div",className:"field-error mb-0"}),Object(c.jsx)("small",{className:"form-text text-muted mt-0",children:'If you did not get any MC, put "NIL".'})]}),Object(c.jsxs)("div",{className:"form-group col-12",children:[Object(c.jsx)("p",{className:"mb-0",children:"Did you go through a swab test?"}),Object(c.jsxs)("label",{htmlFor:"swabbed-yes",className:"mb-0",children:[Object(c.jsx)(o.b,{type:"radio",name:"swabbed",id:"swabbed-yes",value:"Yes",className:"mr-1"}),"Yes"]}),Object(c.jsxs)("label",{htmlFor:"swabbed-no",className:"mb-0 ml-3",children:[Object(c.jsx)(o.b,{type:"radio",name:"swabbed",id:"swabbed-no",value:"No",className:"mr-1"}),"No"]})]})]}),Object(c.jsxs)("div",{className:"form-row",children:[Object(c.jsx)("p",{className:"mb-0",children:"Your 2nd Message:"}),Object(c.jsx)(o.b,{id:"second-message",as:"textarea",readOnly:!0,className:"form-control mb-2",value:x(s)}),Object(c.jsx)("button",{onClick:function(){document.getElementById("second-message").select(),document.execCommand("copy")},className:"btn btn-dark",children:"Copy Message"})]})]})}})]})}r.a.render(Object(c.jsx)(f,{}),document.getElementById("root"))},67:function(e,a,t){}},[[59,1,2]]]);
//# sourceMappingURL=main.651d7281.chunk.js.map