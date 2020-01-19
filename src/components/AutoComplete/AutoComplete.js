import React, { Component } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';
import PropTypes from 'prop-types';
import './ListByTags.css';


export class AutoComplete extends Component {
    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired;
    };

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOption: false,
        userInput: ''
    };

    onChange = (e) => {
        const { options } = this.props;
        const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
        (option) =>
    option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

    this.this.setState({
        activeOption: 0,
        filteredOptions,
        showOptions: true,
        userInput
        });    
    };

    onClick = (e) => {
        this.this.setState({
            activeOption: 0,
            filteredOption: [],
            showOptions: false,
            userInput: e.currentTarget.innerText
        });
    };

//Handles keyDown events, which are the same as the click event.  
    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;
//Return is the 13th key, select the value and it enters into the input field 
    if(e.keyCode === 13) {
        this.setState({
            activeOption: 0,
            showSuggestions: false,
            userInput: filteredOptions [activeOption]
        });
//The up arrow is key number 38, which will select the upper option. Won't go above first.        
      } else if (e.keyCode === 38) {
          if(activeOption === 0) {
              return;
          }
//The down arrow is key number 40, which will select the lower option. Won't go above last.    
    this.setState({ activeOptin: activeOption -1 });
      } else if(e.keyCode === 40) {
          if (activeOption - 1 === filteredOptions.length) {
              return;
          }

    this.setState({ activeOption: activeOption + 1 });      
      }      
    }

    render(){
        const {
            onChange,
            onChange,
            onKeyDown,
            userInput,
            state: { activeOption, filteredOptons, showOptions, userInput }
        }
    } = this;

    let optionList;
        if(showOptions && userInput) {
            if(filteredOptions.length) {
                optionList = (
                    <ul className='options'>
                        { filteredOptions.map((optionName, index) => {
                            let className;
                            if(index === activeOption) {
                                className = 'option-active';
                            }
                            return (
                                <li className={className} key={optionName} onClick={onClick}>
                                    {optionName}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        }
    return (
         <React.Fragment>
            <div className='filterByTag'>
                <input 
                    type='text' 
                    className='filterBox' 
                    onChange = { onChange }
                    onKeyDown = { onKeyDown }
                    value = { userInput } 
                />
                <input type='submit' value='' className='filter-btn' />
                { optionLists}
            </div>
        </React.Fragment>
        );
    }

}
