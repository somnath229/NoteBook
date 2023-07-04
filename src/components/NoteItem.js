import React, {useContext} from 'react'
import noteContext from '../context/NoteContext';

export const NoteItem = (props) => {

  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const {deleteNote} = context;

  return (
    <div className = "col-md-3">
      <div className="card text-bg-success mb-3" >
          
        <div className="card-header"><h5 className="card-title mt-2">{note.title}</h5></div>
        <div className="card-body">
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-pen-to-square mx-2" onClick = {() => {updateNote(note)}}></i> <i className="fa-solid fa-trash mx-1" onClick = {() => {deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>  
        </div>
      </div>
    </div>
  )
}
