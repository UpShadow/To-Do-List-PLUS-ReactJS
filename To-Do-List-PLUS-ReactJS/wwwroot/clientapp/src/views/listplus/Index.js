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
            tasks: [{id: "1", task: "wash the dishes"}, {id: "2", task: "clean the room"}, {id: "3", task: "wash the bathroom"}],
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
            ...this.state,
            indexEdicao: -1,
            item: {
                id: "",
                task: ""
            },
            tasks: tasksAux,
        });
    }

    delete = (i) => {
        if (!confirm(`Do you really want to delete the task: ${i.task}?`))
            return;   

        let tasksAux = this.state.tasks;
        let index = -1;
        
        for(let pos = 0;pos < tasksAux.length;pos++)
            if(tasksAux[pos].id == i.id)
                index = pos;
        if(index > -1) {
            tasksAux.splice(index, 1)
            this.setState ({
                ...this.state,
                tasks: tasksAux
            })
        }
    }

    edit = (i) => {
        let tasksAux = this.state.tasks;
        let index = tasksAux.findIndex(item => item.id == i.id)

        if(index > -1)
        {
            let taskAux = tasksAux[index];
            this.setState ({
                ...this.state,
                item: taskAux,
                indexEdicao: index
            }); 
        }
    }

    search = () => {
        let filter = this.state.filter;
        let tasksAux = this.state.tasks;

        tasksAux.forEach(i => {
            if(i.task.indexOf(filter) > -1)
                i.filtered = true;
            else i.filtered = false;
        });

        this.setState({
            ...this.state,
            tasks: tasksAux
        })    
    }

    render = () => {
        let saida =
            <>
                <div class="main-box">
                    <h1>React - To-do list PLUS</h1>
                    <div class="form">                       
                        <input type="text" placeholder="ID here" value={this.state.item.id} onChange={(e) => this.setState({ ...this.state, item: { ...this.state.item, id: e.target.value } })}/>
                        <input type="text"  placeholder="Task here" value={this.state.item.task} onChange={(e) => this.setState({ ...this.state, item: { ...this.state.item, task: e.target.value } })}/>
                        <button class="button-add" type="button" onClick={() => this.add()}>Add</button>
                    </div>
                    <div>
                        <input class="search-input" placeholder="Type task here to search" type="search" value={this.state.filter} onChange={(e) => this.setState({ ...this.state, filter: e.target.value }, () => { this.search() } )}/>
                    </div>            
                    <br />
                </div>
                    <table class="list-search">
                    {         
                        this.state.tasks.map(i => { 
                            if (i.filtered == undefined || i.filtered)
                            {
                                return (    
                                    <tr>
                                        <td>{i.id + " - " + i.task}</td>
                                            <td>
                                                <button class="search-button-delete" type="button" onClick={() => this.delete(i)}>Delete</button>
                                            </td>
                                            <td>
                                                <button class="search-button-edit" type="button" onClick={() => this.edit(i)}>Edit</button>
                                            </td>
                                    </tr>
                                )
                            }                           
                        })
                    }
                    </table>
            </>
        return saida;
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));