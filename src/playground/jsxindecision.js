console.log('started')

let user ={
    title:"indecision-app",
    subtitle:"put your life in hands of computer",
    options:[]
}

const onFormSubmit =(e) =>{
    e.preventDefault();
    const option = e.target.elements.option.value;

    if (option){
        user.options.push(option);
        e.target.elements.option.value = '';
        renderOptions();
    }
    
};
    
const onRemoveAll =() =>{
        user.options=[ ];
        renderOptions();

    };
function getTitle(subtitle){
    if(subtitle){
    return <p>{subtitle} </p>;
}};

const onMakeDecision =() =>{
    const randomNum = Math.random();
}


const approot=document.getElementById('app');

const renderOptions = () =>{
    const template = (
        <div>
        <h1>{user.title}</h1>
        {user.subtitle && getTitle(user.subtitle)}
        <p>{user.options.length > 0 ?"Here are your options:": "no options added"}</p>
        <button disabled = {user.options.length === 0} onClick ={onMakeDecision}>What should I do?</button>
        <button disabled = {user.options.length === 0} onClick ={onRemoveAll}>Remove All Options </button>
        <ol>
            {
            user.options.map((option) =>{
                return <li key={option}>{option}</li>;   
            })
            }
        </ol>
        <form onSubmit = {onFormSubmit}>
            <input type="text" name="option"/>
            <button> Add Option </button>

        </form>
       
        </div>
        );

        ReactDOM.render(template,approot);
}

renderOptions();