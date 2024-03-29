import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Home() {
  var header = {
    'Access-Control-Allow-Origin': '*'
  };
  const [notes, setNotes] = useState([{ title: '', content: '' }]);
  const { username } = useParams();
  useEffect(() => {
    async function fetchNotes() {
      try {
        let response = await axios.get(`https://google-keep-kappa-gray.vercel.app/getNotes`, {
          headers: header,
          params: { username: username }
        })
        if (response.status === 200) {
          setNotes(response.data);
        }
        else {
          console.log('error');
        }
      }
      catch (error) {
        console.log("Error", error)
      }
    }
    fetchNotes();
  }, [username, notes])

  async function addNote(newNote) {
    try {
      console.log(username);
      let response = await axios.post(`https://google-keep-kappa-gray.vercel.app/addNote`, { newNote, username }, {
        headers: header
      });
      if (response.status === 200) {
        console.log("note uploaded successfully")
      }
    }
    catch (error) {
      console.log("Error during uploading note", error)
    }
  }

  async function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    try {
      let response = await axios.delete(`https://google-keep-kappa-gray.vercel.app/deleteNote`, {
        headers:header,
        params: { username: username, id: id }
      })
      if (response.status === 200) {
        console.log("Deleted Successfully");
      }
    }
    catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={(e) => { deleteNote(e) }}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Home;
