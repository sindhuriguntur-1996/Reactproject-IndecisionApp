class InDecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state={
           options: props.options  
        };
    }
    componentDidMount(){
        try{
        const json = localStorage.getItem("options");
        const options = JSON.parse(json);

 if(options){
        this.setState(() => ({options}));//set saved data on screen
    }}catch(e){

    }}
    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
        }   
    }
    handleDeleteOptions() {
        this.setState(() => ({options:[]}));
        }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState)=>({
            options: prevState.options.filter((option)=> optionToRemove !==option,
        )}));    
        }
    
    handlePick(){
        const randomNum =Math.floor(Math.random()*this.state.options.length);
        const option=this.state.options[randomNum];
        alert(option);            
        };

    handleAddOption(option){
        if(!option){
            return "enter valid values";
        }
        else if(this.state.options.indexOf(option)>-1){
            return "duplicate value";

        }
        this.setState((prevState) =>({options: prevState.options.concat(option)}));
    }

    
    render(){
        const subtitle = 'Put your life in hands of your computer';
        
        return(
            <div>
            <Header subtitle ={subtitle}/>
            <Action hasOptions={this.state.options.length>0}
                    handlePick={this.handlePick}
            />
            <Options 
                options ={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

InDecisionApp.defaultProps = {
    options: []
}

const Header = (props) =>{
    return (
        <div>
        <h1>{props.title}</h1>
        {props.subtitle &&<h2>{props.subtitle}</h2>}
        </div>
        );

}

Header.defaultProps ={
    title: 'InDecision App'
}

const Action = (props) =>{
    return(
        <div>
        <button onClick={props.handlePick} disabled={!props.hasOptions}>What Should I do</button>
        </div>
    );

}

const Options =(props) =>{
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length ===0 && <p>Please add options to proceed</p>}
            {
                props.options.map((option) =>( <Option 
                key={option} 
                optiontext={option} 
                handleDeleteOption={props.handleDeleteOption}

                /> ))
            }
            
        </div>

    );

}

const Option = (props) =>{
    return(
        <div>
            {props.optiontext}
            <button 
             onClick ={(e) => {
                 props.handleDeleteOption(props.optiontext);
                 }}
                 > 
            Remove</button>
            </div>
    );

}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this)
        this.state={
            error:undefined
        }
    }
    handleAddOption(e){
        e.preventDefault(); //prevents default foem submission i.e refreshes
        const option =e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
         this.setState(()=>({error}));

         if(!error){
            e.target.elements.option.value = '';
         }
        }
        
    
    render(){
        return(
        <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
                <input type = "text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
        );
    }
}


ReactDOM.render(<InDecisionApp />,document.getElementById('app'));