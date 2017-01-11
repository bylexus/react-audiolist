import React from  'react';
import Radium, {Style} from 'radium';

import AudioListRow from './AudioListRow.jsx';


class AudioListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actualSong: null
        };
    }

    startPlaying(element) {
        this.setState({actualSong: element});
    }

    render() {
        const {audiolist} = this.props;
        return (
            <div className="react-audiolist container">
                <Style
                    scopeSelector = '.react-audiolist'
                    rules={{
                        '.container': {
                            display: 'flex',
                            flexDirection: 'column'
                        }
                }} />
                {audiolist.map(( el,i ) => (
                    <AudioListRow key={i}
                        entry={el}
                        active={this.state.actualSong === el}
                        onPlay={() => this.startPlaying(el)}
                    />
                ))}
            </div>
        );
    }
}

AudioListContainer.propTypes = {
    audiolist: React.PropTypes.array.isRequired
};

export default Radium(AudioListContainer);
