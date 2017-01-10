import React from  'react';
import ReactDOM from 'react-dom';

import AudioListContainer from './AudioListContainer.jsx';


window.ReactAudioList = function(domEl, audioList) {
    ReactDOM.render(
        <AudioListContainer audiolist={audioList} />,
        domEl
    );
};
