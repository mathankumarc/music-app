import React from 'react'
import SecondsToMinutes from './../util/SecondsToMinutes'

function SongItem(props) {

    const handleClick = () => {
        props.handleAddToPlaylist(props.song);
    }

    return (
        <div className="border container border-primary p-3 m-1" key={props.key}>
            <div className="d-flex w-100 row">
                <h5 className="mb-1 col">{props.song.title}</h5>
                <small className="col d-flex justify-content-end">Play Time: {SecondsToMinutes(props.song.duration)}</small>
                {props.playlistMode && <a href="#" onClick={handleClick}><small>Add to List</small></a>}
            </div>
            <p className="mb-1">Singers: {props.song.singers}</p>
            <p className="mb-1">Album: {props.song.album}</p>
        </div>
    );

}

export default SongItem;
