import React, { useState } from 'react'

function CreatePlaylist(props) {
    const [hasError, setError] = useState(false);
    const [playlistName, setPlaylistName] = useState('');

    const handleSave = (e) => {
        if(!playlistName) {
            setError(true);
            return;
        }
        props.handlePlaylistCreate(playlistName);
    }

    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    return (
        <>
        <div className="modal fade show" role="dialog" style={{display: "block"}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Playlist</h5>
                        <button type="button" onClick={props.closeModal} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="name" name="email" defaultValue={playlistName} onChange={handleChange} className={'form-control' + (hasError && !playlistName ? ' is-invalid' : '')} />
                        {hasError && !playlistName &&
                            <div className="invalid-feedback">Name is required</div>
                        }
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleSave} className="btn btn-primary">Save changes</button>
                        <button type="button" onClick={props.closeModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop"></div>
        </>
    );
}

export default CreatePlaylist;
