import React from  'react';
import Radium from 'radium';

let styles = {
    link: {
        textDecoration: 'none',
    }
};

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.clickResolved = false;
        this.longTouchDuration=500;
    }

    componentDidMount() {
        this.drawCanvas();
    }

    componentDidUpdate() {
        this.drawCanvas();
    }

    drawCanvas() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        let width = canvas.width, height = canvas.height;
        let progress = this.props.progress || 0;
        let centerX = width/2, centerY = height/2;
        let padding = width * 0.3;

        // transparent back:
        ctx.clearRect(0,0,width,height);

        // dotted circle
        ctx.setLineDash([1,2]);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#aaa';
        ctx.arc(centerX,centerY,centerX-1,0,Math.PI*2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Progress circle
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#55f';
        ctx.arc(centerX,centerY,centerX-1,-Math.PI/2,progress*Math.PI*2-Math.PI/2);
        ctx.stroke();

        if (this.props.playing) {
            // pause sign:
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.rect(centerX-width*0.05,padding,width*0.05,height-2*padding);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.rect(centerX+width*0.05,padding,width*0.05,height-2*padding);
            ctx.fill();

        } else {
            // play sign:
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.moveTo(width - padding,centerY);
            ctx.lineTo(padding*1.3,padding);
            ctx.lineTo(padding*1.3,height-padding);
            ctx.fill();
        }
    }

    onClick(e) {
        e.preventDefault();
        if (this.props.playing) {
            this.props.onPause();
        } else {
            this.props.onPlay();
        }
    }

    touchStart(e) {
        e.preventDefault();
        this.clickResolved = false;
        setTimeout(() => {
            if (!this.clickResolved) {
                this.props.onReset();
            }
            this.reset = true;
            this.clickResolved = true;
        },this.longTouchDuration);
    }

    touchEnd(e) {
        e.preventDefault();
        if (!this.clickResolved) {
            this.clickResolved = true;
            this.onClick(e);
        }
    }

    render() {
        let {width, className: cname} = Object.assign({
            width: 30
        },this.props);
        return (
            <a className={cname||''} href="#" style={styles.link}
                onMouseDown={this.touchStart} onMouseUp={this.touchEnd}
                onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <canvas ref="canvas" width={width} height={width}></canvas>
            </a>
        );
    }
}

PlayButton.propTypes = {
    width: React.PropTypes.number,
    playing: React.PropTypes.bool,
    progress: React.PropTypes.number,
    onPlay: React.PropTypes.func.isReqiured,
    onReset: React.PropTypes.func.isReqiured,
    onPause: React.PropTypes.func.isReqiured
};


export default Radium(PlayButton);
