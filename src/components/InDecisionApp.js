import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';


export default class InDecisionApp extends React.Component{
    state={
        options: [],
        selectedOption :undefined
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
    handleDeleteOptions = () => {
        this.setState(() => ({options:[]}));
        }

    handleDeleteOption =(optionToRemove)=> {
        this.setState((prevState)=>({
            options: prevState.options.filter((option)=> optionToRemove !==option,
        )}));    
        }
    
    handlePick =()=>{
        const randomNum =Math.floor(Math.random()*this.state.options.length);
        const option=this.state.options[randomNum];
        this.setState(() => ({
        selectedOption:option
         })        
        );
        }
    handleAddOption = (option)=>{
        if(!option){
            return "enter valid values";
        }
        else if(this.state.options.indexOf(option)>-1){
            return "duplicate value";

        }
        this.setState((prevState) =>({options: prevState.options.concat(option)}));
    }
    handleSelectedOption =()=>{
            this.setState(()=>({selectedOption : undefined})
             ); }
    
    
    render(){
        const subtitle = 'Put your life in hands of your computer';
        
        return(
            <div>
            <Header subtitle ={subtitle}/>
            <div className='container'>
            <Action hasOptions={this.state.options.length>0}
                    handlePick={this.handlePick}
            />
            <div className='widget'>
            <Options 
                options ={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption}/>
            </div>
            </div>
            <OptionModal 
            selectedOption={this.state.selectedOption}
            handleSelectedOption={this.handleSelectedOption} />
            </div>
        );
    }
}

InDecisionApp.defaultProps = {
    options: []
}