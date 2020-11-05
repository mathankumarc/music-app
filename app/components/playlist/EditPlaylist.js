import React, { useEffect, useState } from 'react'
import SecondsToMinutes from './../util/SecondsToMinutes'
import PlaylistService from './../../services/PlaylistService'
import Songs from './../songs/Songs'
import shuffleArray from '../util/shuffleArray'

function EditPlaylist(props) {
    const [songsList, setSongsList] = useState([]);
    const [songsDisplayList, setSongsDispalyList] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({});
    const [showAddSong, setShowAddSong] = useState(false);

    useEffect(() => {
        PlaylistService.get(props.pl).then((response) => {
            if (response.songs.length) {
                setPlaylistInfo({...response});
                let songs = response.songs;
                songs.sort((a, b) => {
                    return new Date(b.added).getTime() - new Date(a.added).getTime()
                });
                setSongsList([...songs]);
                setSongsDispalyList([...songs]);
            }
        })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const handleAddSongClick = () => {
        setShowAddSong(true);
    }

    const addToPlaylist = (song) => {
        PlaylistService.update({...props.pl, songs: [...songsList, {title: song.title, album: song.album, duration: song.duration, singers: [...song.singers]}]})
        .then((response) => {
            setShowAddSong(false);
            setPlaylistInfo({...response});
            setSongsList([...response.songs]);
            setSongsDispalyList([...response.songs]);
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleShuffle = () => {
        shuffleArray(songsDisplayList);
        setSongsDispalyList([...songsDisplayList]);
    }

    return (
        <>
        {!showAddSong && <div className="list-group">
            <div className="form-group d-flex justify-content-end">
                <button onClick={handleShuffle} className="btn btn-primary m-2">Shuffle</button>
                <button onClick={handleAddSongClick} className="btn btn-primary m-2">Add Song</button>
            </div>
            <div className="h-50">
            {songsDisplayList.map((song, index) => {
                return (
                    <div className="border border-primary p-3 m-1" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{song.title}</h5>
                            <small>Play Time: {SecondsToMinutes(song.duration)}</small>
                        </div>
                        <p className="mb-1">Singers: {song.singers}</p>
                        <p className="mb-1">Album: {song.album}</p>
                    </div>);
            })}
            </div>
        </div>}
        {showAddSong && <Songs songs={songsDisplayList} playlistMode={true} addToPlaylist={addToPlaylist} />}
    </>);
}

export default EditPlaylist;
