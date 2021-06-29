import React from 'react';
import Field from '@material-ui/core/TextField';

class textFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
        <div className="text">
        <Field
            ref={this.props.ref}
          id="outlined-helperText"
          label={this.props.labelName}
          value={this.props.value}
          variant="outlined"
          className="textfield"
        />
        </div>
        );
    }
}

export default textFields;

