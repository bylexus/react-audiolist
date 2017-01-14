import React from  'react';
import Radium, {Style} from 'radium';

import PlayButton from './PlayButton.jsx';
import TitleTextDisplay from './TitleTextDisplay.jsx';
import RangeInput from './RangeInput.jsx';


class AudioListRow extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);

        this.state = {
            playing: false,
            currentTime: 0
        };
    }

    componentDidMount() {
        this.refs.player.addEventListener('loadedmetadata',this.updateMeta.bind(this));
        this.refs.player.addEventListener('timeupdate',this.updateProgress.bind(this));
        this.refs.player.addEventListener('ended',this.pause.bind(this));
    }

    componentWillUnmount() {
        this.refs.player.removeEventListener('loadedmetadata');
        this.refs.player.removeEventListener('timeupdate');
        this.refs.player.removeEventListener('ended');
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.active === true && this.props.active !== true) {
            // changed from active to inactive: make sure the player stops
            this.pause();
        }
    }

    play(element) {
        this.setState({
            playing: true
        },() => {this.refs.player.play(); });
        this.props.onPlay();
    }

    reset() {
        this.refs.player.currentTime = 0;
        this.refs.player.load();
        this.updateProgress();
        this.pause();
    }

    pause() {
        this.setState({
            playing: false
        },() => {this.refs.player.pause(); });
    }

    updateMeta(e) {
        if (e.target.duration) {
           this.props.entry.duration = e.target.duration;
           this.forceUpdate();
        }
    }

    updateProgress() {
        if (Math.floor(this.state.currentTime) !== Math.floor(this.refs.player.currentTime)) {
            this.setState({currentTime: this.refs.player.currentTime});
        }
    }

    renderDuration(duration) {
        duration = duration || 0;
        const min = Math.floor(duration / 60);
        const sec = String("00"+Math.floor(duration % 60)).slice(-2);
        return `${min}:${sec}`;
    }

    seekTo(seconds) {
        this.refs.player.currentTime = seconds;
        this.updateProgress();
    }

    render() {
        const {entry} = this.props;
        return (
            <div className="row">
                <Style
                    rules={{
                        '.row': {
                            display: 'flex',
                            padding: 3,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            borderBottom: '1px dotted black'
                        },
                        '.row:hover': {
                            backgroundColor: '#eee'
                        },
                        '.row:last-child': {
                            borderBottom: 'none'
                        },
                        '.controls': {
                            marginRight: '3px'
                        },
                        '.title': {
                            flexGrow: 1,
                            paddingTop: '3px'
                        },
                        '.progress-slider': {
                            maxWidth: '100px'
                        },
                        '.time': {
                            borderRight: '1px dotted black'
                        }
                }} />
                <audio ref="player"><source ref="playerSource" src={entry.url} /></audio>
                <PlayButton className="controls"
                    width={24}
                    progress={this.refs.player && this.refs.player.duration?this.state.currentTime / this.refs.player.duration : 0}
                    onPlay={() => { this.play(entry); }}
                    onPause={() => { this.pause(); }}
                    onReset={() => { this.reset(); }}
                    playing={this.state.playing} />
                <TitleTextDisplay className="title" title={entry.title} text={entry.text} />
                <RangeInput className="progress-slider" value={this.state.currentTime} min={0} max={entry.duration} onChange={(value) => this.seekTo(value)}/>
                <div className="time"> {this.renderDuration(this.state.currentTime)}</div>
                <div className="duration">{this.renderDuration(entry.duration)}</div>
            </div>
        );
    }
}

AudioListRow.propTypes = {
    entry: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool,
    onPlay: React.PropTypes.func.isRequired
};


export default Radium(AudioListRow);
