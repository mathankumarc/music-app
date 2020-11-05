import React, { useState, useEffect } from 'react'
import PlaylistService from './../../services/PlaylistService'
import CreatePlaylist from './CreatePlaylist'
import formatDate from './../util/formatDate'
import PlaylistList from './PlaylistList'
import EditPlaylist from './EditPlaylist'

function Playlist() {
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState({});

    const handleCreateClick = (e) => {
        setShowCreate(true);
    }

    const closeModal = (e) => {
        setShowCreate(false);
    }

    const handlePlaylistCreate = (playListName) => {
        console.log(playListName);
        PlaylistService.create({title: playListName})
        .then((response) => {
            console.log(response);
            closeModal();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSelection = (pl) => {
        setCurrentPlaylist({...pl});
        setShowEdit(true);
    }

    return (
        <>
            {!showEdit && <PlaylistList handleCreateClick={handleCreateClick} handleSelection={handleSelection} />}
            {showCreate && <CreatePlaylist handlePlaylistCreate={handlePlaylistCreate} closeModal={closeModal}/>}
            {showEdit && <EditPlaylist pl={currentPlaylist} handlePlaylistCreate={handlePlaylistCreate} closeModal={closeModal}/>}
        </>
    );
}

export default Playlist;
