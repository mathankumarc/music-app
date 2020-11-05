import React, { useState, useEffect } from 'react'
import PlaylistService from './../../services/PlaylistService'
import PlaylistItem from './PlaylistItem'

function PlaylistList(props) {
    const [playList, setPlayList] = useState([]);

    useEffect(() => {
        PlaylistService.getAll().then((response) => {
            setPlayList([...response]);
        })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    return (
        <>
            <div className="list-group overflow-auto">
                {playList.map((pl) => {
                    return (
                        <PlaylistItem pl={pl} key={pl._id} handleSelection={props.handleSelection} />
                    );
                })}
            </div>
            <div className="form-group d-flex justify-content-center">
                <button onClick={props.handleCreateClick} className="btn btn-primary">Create Playlist</button>
            </div>
        </>);
}

export default PlaylistList;
