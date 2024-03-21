import { useEffect, useState } from 'react'
import DisplayName from './DisplayName'
import "./App.css"
import "./index.css"

function Assessment1(){

// DISPLAY NAMES PORTION
    const [submittedNames, setSubmitted] = useState([]) //Stores submitted value
    const [apiData,setApiData] = useState([])

    const pressSubmit = () =>{
        var inputField = document.getElementsByName('author name')[0] //get DOM
        var inputName = formatNames(inputField.value)
        console.log('inputName',inputName)
        setSubmitted((oldNames)=>[inputName,...oldNames]) //append names to the top
        inputField.value = '' //clear entry field
    }

// Format Names - Function to capitalise starting characters
    function formatNames(input){
        return input.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    }

// NAMES FROM API  PORTION
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users ")
        .then(promise=>promise.json())
        .then((data)=>{setApiData(data)
        console.log(data)})
        .catch((e)=>{console.log("error:",e)})
    },[])

//

    return(
        <>
        <h3>Display names</h3>
        <ol>
            <li>Create a single-page application (SPA) named assessment1-app with framework such as React JS, Angular and so on.  </li>
            <li>Create a form which contains a text field called “author name” and a “submit” button.  It allows user to submit author name. </li>
            <li>Display submitted author names on the page (Preferably to use components).</li>
        </ol>

            <form>
            Author name:<input type='text' name='author name'placeholder='author name'></input>
            <button type="button" onClick={pressSubmit}>Submit!</button>
            </form>
            {submittedNames.map((name,key)=>(
                <DisplayName name={name} key={key}/>  
            ))
            }

        <h3>Names from API</h3>
        <ol>
            <li>Retrieve a list of users from https://jsonplaceholder.typicode.com/users (Dummy API website) via API calls.</li>
            <li>Display the retrieved list of users in Step 4.</li>
        </ol>

            {apiData.map((item)=>(
                <DisplayName name={item.name} key={item.id}></DisplayName>
            ))
            }


        </>
    )
}

export default Assessment1