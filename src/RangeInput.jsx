import React from  'react';

class RangeInput extends React.Component {
    constructor(props) {
        super(props);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onMoveStart = this.onMoveStart.bind(this);
        this.onMoveEnd = this.onMoveEnd.bind(this);
        this.state = {
            value: 0
        };

        this.enableExternalValueSet = true;
    }

    onSliderChange(e) {
        this.setState({value: e.target.value},() => {
            if (this.props.onChange instanceof Function) {
                this.props.onChange(this.state.value);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value !== prevProps.value) {
            if (this.enableExternalValueSet) {
                this.setState({
                    value: this.props.value
                });
            }
        }
    }

    onMoveStart() {
        this.enableExternalValueSet = false;
    }

    onMoveEnd() {
        this.enableExternalValueSet = true;
    }

    render() {
        let {min = 0, max = 100,step = 1} = this.props;
        return (
            <input type="range" value={this.state.value} min={min} max={max} step={step} onChange={this.onSliderChange}
                onTouchStart={this.onMoveStart}
                onTouchEnd={this.onMoveEnd}
                onMouseDown={this.onMoveStart}
                onMouseUp={this.onMoveEnd}
            />
        );
    }
}

RangeInput.propTypes = {
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func
};


export default RangeInput;
