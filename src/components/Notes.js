import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/NoteContext';
import { NoteItem } from './NoteItem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router';

export const Notes = (props) => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
           getNotes();
        }else {
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refclose = useRef(null);

    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle : currentNote.title, edescription : currentNote.description});
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription);
        refclose.current.click();
        props.showAlert("Updated successfully", "success");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showAlert = {props.showAlert} />
            <div className="container ">
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal Button
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body m-2">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label display-6">Title:</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" placeholder="title of note"  value = {note.etitle} onChange={onchange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label display-6">Description:</label>
                                    <textarea className="form-control" id="edescription" rows="8" name="edescription" value = {note.edescription} onChange={onchange}  minLength={1} required ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 1 || note.edescription.length< 1} type="button" className="btn btn-primary" onClick = {handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3 ms-1">
                {notes.length === 0 && "No notes to display! Add one."}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert}/>
                })}
            </div>
        </>
    )
}
