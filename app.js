const parent =React.createElement("div",
    {id : "parent"},
    [React.createElement("h1",{},"iam an h1 tag inside an div"),
    React.createElement("h2",{},"iam an h2 tag inside an div")]//nested siblings 

)//how to create nested elements




//const heading = React.createElement("h1",{},"helloworld");//this is an object
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);//render tag will convert this object into h1 tag

