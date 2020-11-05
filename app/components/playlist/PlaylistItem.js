import React, { useState, useEffect } from 'react'
import formatDate from './../util/formatDate'

function PlaylistItem(props) {

    const handleClick = () => {
        props.handleSelection(props.pl)
    }

    return (
        <div className="border border-primary p-3 m-1" key={props.pl._id} style={{cursor: "pointer"}} onClick={handleClick}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{props.pl.title}</h5>
                <p>Created At: {formatDate(props.pl.created)}</p>
            </div>
        </div>
    );

}

export default PlaylistItem;
