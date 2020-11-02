import React, { useState, useEffect } from 'react'
import SongsService from './../../services/SongsService'

function Songs() {
    const [songsList, setSongsList] = useState([]);
    const [songsDisplayList, setSongsDispalyList] = useState([]);
    const [searchText, setSearchtext] = useState('');

    useEffect(() => {
        SongsService.getAll().then((response) => {
            setSongsList([...response]);
            setSongsDispalyList([...response]);
        })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const handleChange = (e) => {
        if (!e.target.value) {
            setSongsDispalyList([...songsList]);
            return;
        }
        const matches = songsList.filter((song) => song.title.toLowerCase().includes(e.target.value))
        setSongsDispalyList(matches);
    }

    return (
        <>
            <div className="form-group">
                <input type="text" onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Search for Songs" />
            </div>
            <div className="list-group">
                {songsDisplayList.map((song) => {
                    return (
                        <div className="border border-primary p-3 m-1" key={song._id}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{song.title}</h5>
                                <small>{song.duration}</small>
                            </div>
                            <p className="mb-1">Singers: {song.singers}</p>
                            <p className="mb-1">Album: {song.album}</p>
                        </div>);
                })}
            </div>
        </>
    );
}

export default Songs;
