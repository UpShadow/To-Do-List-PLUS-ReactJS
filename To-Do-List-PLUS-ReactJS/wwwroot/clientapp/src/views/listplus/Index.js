import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

export default class Index
    extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            item: {
                id: "",
                task: "",
            },
            tasks: [],
            indexEdicao: -1,
            filter: ""
        }

    }

    add = () => {
        let tasksAux = this.state.tasks;

        if(this.state.indexEdicao == -1)
            tasksAux.push(this.state.item);
        else
            tasksAux[this.state.indexEdicao] = this.state.item;

        this.setState ({
            indexEdicao: -1,
            item: {
                id: "",
                task: ""
            },
            tasks: tasksAux,
            filter: "",
        });
    }

    delete = (i) => {
        let tasksAux = this.state.tasks;
        let index = -1;
        
        for(let pos = 0;pos < tasksAux.length;pos++)
            if(tasksAux[pos].task == i.task)
                index = pos;
        if(index > -1) {
            tasksAux.splice(index, 1)
            this.setState ({
                tasks: tasksAux
            })
        }
    }

    edit = (i) => {
        let tasksAux = this.state.tasks;
        let index = tasksAux.findIndex(task => task == i)

        if(index > -1)
        {
            let taskAux = tasksAux[index];
            this.setState ({
                task: taskAux,
                indexEdicao: index
            }); 
        }
    }

    search = (i) => {

    }

    render = () => {
        let saida =
            <>
                <div class="main-box">
                    <h1>React - To-do list PLUS</h1>
                    <div class="form">                       
                        <input type="text" placeholder="ID here" value={this.state.item.id} onChange={(e) => this.setState({ item: { id: e.target.value, task: this.state.item.task} })}/>
                        <input type="text"  placeholder="Task here" value={this.state.item.task} onChange={(e) => this.setState({ item: { id: this.state.item.id, task: e.target.value} })}/>
                        <button class="button-add"type="button" onClick={() => this.add()}>Add</button>
                    </div>
                    <br />
                    <div>
                        <input class="search-input" placeholder="Type task here to search" type="text" value={this.state.filter} onChange={(e) => this.setState({ filter: e.target.value })}/>
                    </div>            
                    <button type="button" onClick={() => this.search()}>Search</button>

                    <br />
                    <br />
                </div>
                    <table class="list-search">
                    {         
                        this.state.tasks.map(i => { return (
                            <tr>
                                <td class="search-result">{i.id}</td> 
                                <td class="search-result">{i.task}</td>
                                <div class="search-buttons">
                                    <td>
                                        <button class="search-button-delete" type="button" onClick={() => this.delete(i)}>Delete</button>
                                    </td>
                                    <td>
                                        <button class="search-button-edit" type="button" onClick={() => this.edit(i)}>Edit</button>
                                    </td>
                                </div>
                            </tr>
                        )})
                    }
                    </table>
            </>
        return saida;
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));