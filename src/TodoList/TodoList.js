import React from 'react';
import Todo from "../Todo/Todo";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
        this.counter = 2;
    };

    //Initialise data
    componentDidMount() {

        axios.get(`http://localhost:8080/api/products`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log("mam liste");
                const todosList = res.data;
                this.setState({todosList: todosList});
            })
    }

    //PUT TODO
    // updateChild = (id) => {
    //
    //     let arrAfterUpdate = this.state.todosList.map(function (item) {
    //         if(item.id === id)
    //         return item;
    //     });
    //
    //     let object = this.state.todosList.find(function (item) {
    //         if (item.id === id)
    //             return item;
    //     });
    //
    //     console.log(object.name);
    //     console.log(object.price);
    //     axios.put(`http://localhost:8080/api/product`, object);
    // };

    updateChild = (id) => {
        let arrAfterUpdate = this.state.todosList.map(function (item) {
            return item;
        });

        let object = arrAfterUpdate.find(function (item) {
            if(item.id === id)
                return item;
        });

        this.setState({todosList: arrAfterUpdate});

        axios.put(`http://localhost:8080/api/product/${object.id}`, object);

        console.log(arrAfterUpdate);
    };

    //POST - DONE
    addTodo = () => {
        this.counter++;
        let newelement = {id: this.counter, name: this.state.newTodo};
        this.setState(prevState => ({
            todosList: [...prevState.todosList, newelement]
        }));
        axios.post(`http://localhost:8080/api/product`, newelement);
    };

    //DELETE - DONE
    handleRemove = id => {
        let object = this.state.todosList.find(function (item) {
            if (item.id === id) return item;
        });
        let arrAfterDel = this.state.todosList.filter(function (item) {
            return item.id !== id
        });
        this.setState({todosList: arrAfterDel});

        axios.delete(`http://localhost:8080/api/product/${object.id}`, object);
    }

    myChangeHandler = (event) => {
        this.setState({newTodo: event.target.name});
    }


    //RENDER
    render() {

        //server response
        if (this.state == null) {
            console.log("Render: null state");
            return ("Nic nie ma")
        }

        console.log("After render: state")
        console.log(this.state);

        const {todosList} = this.state;

        let todos = todosList.map(todo => {
            return (<tr key={todo.id}>
                <Todo name={todo.name}
                      price={todo.price}
                      id={todo.id}
                      update={(id) => this.updateChild(id)}/>
                <td>
                    <button type="button" onClick={() => this.handleRemove(todo.id)}>
                        Remove
                    </button>
                </td>
            </tr>);
        })

        return (
            <div className="TodoList">
                <h1>{this.props.name}</h1>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                            <th scope="col"></th>
                            {/*ostatnia jest na drugi przycisk*/}
                        </tr>
                    </thead>
                    <tbody>
                        {todos}
                    </tbody>
                </table>

                {/*Sekcja pod tabelą - DONE*/}
                <p> Add new product with name</p>
                <input
                    type='text'
                    onChange={this.myChangeHandler}
                />
                <button onClick={this.addTodo}>
                    AddProduct
                </button>
            </div>
        );
    }
}

export default TodoList;


