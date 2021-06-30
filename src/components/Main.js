import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props){
    const [ people, setPeople ] = useState(null);

    const URL = 'https://peoplemern.herokuapp.com/people/';

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    };

    const createPeople = async (person) => {
        await fetch(URL, {
          // let's us know the method for creating
            method: "POST",
            // tells the server that we're sending json data
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(person),
        });
        // fetch data from the list of people from database
        getPeople();
    };
    const updatePeople = async (person, id) => {
      // make put request to create people
      await fetch(URL + id, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(person),
      });
      getPeople();
    }
    const deletePeople = async id => {
      // make delete request to create people
      await fetch(URL + id, {
        method: "DELETE",
      })
      getPeople();
    }
    // the second argument of '['empty dependacy array']'
    // helps to keep it from running more than once
    // if a user logs in, we would replace the '[]'
    // with the userState
    useEffect(() => getPeople(), []);

    return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople}/>
        </Route>
        <Route 
          path="/people/:id"
          render={(rp) => (
            // other functionaality to check if user is logged in
            // if not, programatically redirect somewhere else
            <Show
              people={people} 
              deletePeople={deletePeople}
              updatePeople={updatePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  )} 
  
  export default Main;