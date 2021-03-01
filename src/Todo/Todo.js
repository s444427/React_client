import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        console.log("starting props: " + props);

        this.state = {name: props.name, price: props.price};
    }

    static getDerivedStateFromProps(props, state) {
        if (state.done === null)
            return {done: props.done};
        else return {};
    }

    setData = () => {
        this.props.update(this.props.id)
    }

    nameChanged(event) {
        this.setState({newName: event.target.name});
    }

    render() {

        const name = this.props.name;
        const price = this.props.price;

        return (
            <React.Fragment>
                    <td >
                        <textarea rows="4" cols="100"
                                  value={name}
                                  onChange={this.nameChanged}
                        />
                    </td>
                    <td>
                        <textarea rows="4" cols="100"
                                  value={price}
                                  onChange={this.setData}
                        />
                    </td>
                <td>
                    <button onClick={this.setData}>
                        Save changes
                    </button>
                </td>
            </React.Fragment>
        )

    }
}

export default Todo;