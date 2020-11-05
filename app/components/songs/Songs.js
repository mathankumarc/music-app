import React, { useState, useEffect } from 'react'
import SongsService from './../../services/SongsService'
import SongItem from './SongItem'

function Songs(props) {
    const [songsList, setSongsList] = useState([]);
    const [songsDisplayList, setSongsDispalyList] = useState([]);
    const [searchText, setSearchtext] = useState('');

    useEffect(async () => {       
        SongsService.getAll().then((response) => {

            let songs = response;

            if (props.playlistMode && props.songs.length) {
                songs = songs.filter((song) => {

                    return props.songs.find(plSong => plSong.title === song.title) ? false : true;

                });
            }

            setSongsList([...songs]);
            setSongsDispalyList([...songs]);

        })
            .catch((err) => {
                console.log(err);
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

    const handleAddToPlaylist = (song) => {
        props.addToPlaylist(song);
    }

    return (
        <>
            <div className="form-group">
                <input type="text" onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Search for Songs" />
            </div>
            <div className="list-group">
                {songsDisplayList.map((song, index) => {
                    return (
                        <div key={index}><SongItem playlistMode={props.playlistMode} song={song} handleAddToPlaylist={handleAddToPlaylist} /></div>);
                })}
            </div>
        </>
    );
}

export default Songs;
