import React, {useContext, useState} from 'react'
import noteContext from '../context/NoteContext';

export const AddNote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title:"" , description:"", tag:"default"})
  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"" , description:""});
    props.showAlert("Note Added successfully", "success")
  }
  const onchange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-between align-items-center">
            <h1 className = "mb-4">
                Add
                <small className="text-muted"> a Note :</small>
            </h1>
            <p> TextUtil : <a href="https://somnathtextutils.netlify.app/" rel= "noreferrer" target="_blank"><i className="fa-solid fa-link"></i></a></p>
            </div>
            <div className="container">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label display-6">Title:</label>
                    <input type="text" className="form-control" id="title" name = "title" placeholder="Title of note" value = {note.title} onChange = {onchange}  minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label display-6">Description:</label>
                    <textarea className="form-control" id="description" rows="13" name = "description" value = {note.description} placeholder="Description of note" onChange = {onchange}  minLength={1} required ></textarea>
                </div>
                <div className="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
                    <button disabled={note.title.length < 1 || note.description.length< 1} type="button" className="btn btn-primary " onClick = {handleClick}>Add Note</button>
                </div>
                <h1 className = "mb-4">
                    Your
                    <small className="text-muted"> Note's :</small>
                </h1>
                {/* <Notes/> */}
            </div>
    </div>
  )
}
