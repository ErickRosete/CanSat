import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import Item from './Item/Item';
import Target from './Target/Target';
import Trash from './Target/Trash'
import './DragAndDrop.css';

class DragAndDrop extends Component {
    state = {
        items: [
            { id: 1, name: 'Encender Led' },
            { id: 2, name: 'Encender Motor' },
            { id: 3, name: 'Sensar GPS' },
            { id: 4, name: 'Sensar Acelerómetro' },
        ],
        targets: [
            { id: 1, name: 'Actuadores', items: [] },
            { id: 2, name: 'Sensores', items: [] },
            { id: 3, name: 'Actuadores', items: [] },
            { id: 4, name: 'Sensores', items: [] },
        ],
    }

    droppedHandler = (itemId, fromTargetId, toTargetId) => {
        const items = [...this.state.items];
        const targets = [...this.state.targets];

        //Delete from previous target
        if (fromTargetId !== 0) {
            const previousTarget = targets.find(target => target.id === fromTargetId);
            const itemIndex = previousTarget.items.findIndex(item => item.itemId === itemId);
            previousTarget.items.splice(itemIndex, 1);
        }

        if (toTargetId !== 0) {
            const targetSelected = targets.find(target => target.id === toTargetId);
            //Search max id in target items
            let maxId = 0;
            targetSelected.items.forEach(item => {
                if (maxId < item.id) {
                    maxId = item.id;
                }
            });
            //Add item to new target
            const draggedItem = items.find(item => item.id === itemId);
            const newItem = {
                ...draggedItem,
                id: maxId + 1,
                itemId: itemId,
            }
            targetSelected.items.push(newItem);
        }

        this.setState({
            targets: targets
        });
    }

    render() {
        return (
            <div className="dnd-container">
                <div className="target-container">

                    {this.state.targets.map((target) => {
                        return (
                            <Target target={target} key={target.id}>
                                {
                                    target.items.map((item) => {
                                        return (<Item key={item.id} targetId={target.id} item={item} handleDrop={this.droppedHandler} />);
                                    })
                                }
                            </Target>);
                    })}
                    <Trash />
                </div>

                <div className="options-container">
                    {
                        this.state.items.map((item) => {
                            return (<Item key={item.id} targetId={0} item={item} handleDrop={this.droppedHandler} />);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DragAndDrop)
