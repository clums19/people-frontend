// import { Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react'
function Show({ match, history, people, updatePeople, deletePeople }) {
  // if(!user) return <Redirect to="/login" />
  const [editForm, setEditForm] = useState({
    name:'',
    title:'',
    image:''
  });
  const [person, setPerson] = useState(null)
  useEffect(() => {
    if(people) {
      const id = match.params.id;
      const person = people.find(p => p._id === id);
      setPerson(person)
      setEditForm(person)
    }
  }, [people,match])
  const loading = () => {
      return <h1>Loading ...</h1>
  }
  const loaded = () => {
      const id = match.params.id;
      // const people = match.people;
      const person = people.find(p => p._id === id);
      return (
          <div className="person">
              <h1>{person.name}</h1>
              <h2>{person.title}</h2>
              <img src={person.image} alt={person.name} />
              <button onClick={() => handleDelete(person._id)}>Delete Person</button>
          </div>
      )
  }
  const handleChange = (event) => {
    setEditForm({...editForm, [event.target.name]: event.target.value});
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {_id, name, title, image} = editForm;
    updatePeople({name, title, image}, _id);
  }
  const handleDelete = (id) => {
    deletePeople(id);
    history.push('/');
  }
  return (
    <div>
      {person ? loaded() : loading()}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={editForm.name} onChange={handleChange} />
        <input type="text" name="title" value={editForm.title} onChange={handleChange} />
        <input type="text" name="image" value={editForm.image} onChange={handleChange} />
        <input type="submit" value="Edit Person" />
      </form>
      
    </div>
  );
}
export default Show;