import React from  'react';
import Radium, {Style} from 'radium';
import marked from 'marked';

let styles = {
    link: {
        textDecoration: 'none',
    }
};

class TitleTextDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            opened: false
        };
    }

    onClick(e) {
        e.preventDefault();
        this.setState({opened: !this.state.opened});
    }

    render() {
        let {title,text,className} = this.props;
        let opened = this.state.opened || false;
        return (
            <div className={className||''}>
                <Style
                    rules={{
                        '.title-text-display': {
                            transformOrigin: 'top',
                            transition: 'opacity 0.2s, transform 0.2s'
                        }
                }} />
                <a href="#" style={styles.link} onClick={this.onClick}>{title} </a>
                <div className="title-text-display" style={{transform: opened ? 'scaleY(1)':'scaleY(0)',opacity: opened? '1':'0',height: opened ? 'auto':'0'}} dangerouslySetInnerHTML={{__html: marked(text || '')}}></div>
            </div>
        );
    }
}

TitleTextDisplay.propTypes = {
    title: React.PropTypes.string,
    text: React.PropTypes.string,
    className: React.PropTypes.string
};


export default Radium(TitleTextDisplay);
