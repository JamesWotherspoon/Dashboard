import React from 'react';
import './todo.scss';


const Todo = () => {
    return (
        <section className="todo">
            <header>
                <h1>Tasks To Do</h1>
            </header>
            <main>
                <div className="todo-list-container">
                    <h2>
                        To Do
                    </h2>
                </div>
                <div className="todo-list-container">
                    <h2>
                        Doing
                    </h2>
                </div>
                <div className="todo-list-container">
                    <h2>
                        Done
                    </h2>
                </div>
            </main>
        </section>
    )
}
export default Todo;
