import React from  'react';
import Radium, {Style} from 'radium';

import PlayButton from './PlayButton.jsx';
import TitleTextDisplay from './TitleTextDisplay.jsx';


class AudioListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);

        this.state = {
            actualPlaying: null,
            isPlaying: false,
            progress: 0
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

    play(element) {
        if (element !== this.state.actualPlaying) {
            this.setState({
                actualPlaying: element,
                isPlaying: true,
                progress: 0
            }, () => {
                this.refs.playerSource.src = element.url;
                this.refs.player.load();
                this.refs.player.play();
            });
        } else {
            this.setState({
                isPlaying: true
            },() => {this.refs.player.play(); });
        }
    }

    reset() {
        this.refs.player.load();
        this.pause();
    }

    pause() {
        this.setState({
            isPlaying: false
        },() => {this.refs.player.pause(); });
    }

    updateMeta(e) {
        if (e.target.duration) {
            if (this.state.actualPlaying) {
                let act = this.state.actualPlaying;
                act.duration = e.target.duration;
                this.setState({
                    actualPlaying: this.state.actualPlaying,
                    progress: 0
                });
            }
        }
    }

    updateProgress() {
        if (this.state.actualPlaying) {
            let progress = this.refs.player.currentTime / this.state.actualPlaying.duration;
            if (progress !== this.state.progress) {
                this.setState({progress});
            }
        }
    }

    renderDuration(duration) {
        if (!duration) { return ''; }
        const min = Math.floor(duration / 60);
        const sec = String("00"+Math.floor(duration % 60)).slice(-2);
        return `${min}:${sec}`;
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
                        },
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
                        '.time': {
                            borderRight: '1px dotted black'
                        }
                }} />
                <audio ref="player"><source ref="playerSource" /></audio>
                {audiolist.map(( el,i ) => (
                    <div key={i} className="row">
                        <PlayButton className="controls"
                            width={24}
                            progress={this.state.actualPlaying === el ? this.state.progress : 0}
                            onPlay={() => { this.play(el); }}
                            onPause={() => { this.pause(); }}
                            onReset={() => { this.reset(); }}
                            playing={this.state.isPlaying && this.state.actualPlaying === el} />
                        <TitleTextDisplay className="title" title={el.title} text={el.text} />
                        <div
                            className="time"
                            style={{
                            visibility: this.state.actualPlaying === el ? 'visible' : 'hidden'
                            }}>
                            {this.state.actualPlaying === el? this.renderDuration(this.refs.player.currentTime) : ''}</div>
                        <div className="duration">{this.renderDuration(el.duration)}</div>
                    </div>
                ))}
            </div>
        );
    }
}

AudioListContainer.propTypes = {
    audiolist: React.PropTypes.array.isRequired
};


export default Radium(AudioListContainer);
