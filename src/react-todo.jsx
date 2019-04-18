import ReactDOM from 'react-dom';
import React from 'react';

// eslint-disable-next-line no-unused-vars
class TaskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addTask() {
    this.props.addTask(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.addTask}>追加</button>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
class MyRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', tasks: [], visibleState: 'all' };
    this.onNameChange = this.onNameChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.setVisibleState = this.setVisibleState.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
  }

  onNameChange(value) {
    this.setState({ name: value });
  }

  addTask(content) {
    this.setState({
      tasks: this.state.tasks.concat({ content, isCompleted: false }),
    });
  }

  deleteTask(content) {
    this.setState({
      tasks: this.state.tasks.filter(t => t.content !== content),
    });
  }

  setComplete(content, isCompleted) {
    const task = this.state.tasks.find(t => t.content === content);
    if (task) {
      task.isCompleted = isCompleted;
    }
    this.setState({ tasks: this.state.tasks });
  }

  setVisibleState(event) {
    if (event.target.checked) {
      this.setState({ visibleState: event.target.value });
    }
  }

  visibleTasks() {
    if (this.state.visibleState === 'all') {
      return this.state.tasks;
    } else if (this.state.visibleState === 'active') {
      return this.state.tasks.filter(t => !t.isCompleted);
    } else if (this.state.visibleState === 'completed') {
      return this.state.tasks.filter(t => t.isCompleted);
    }
    return [];
  }

  clearCompletedTasks() {
    this.setState({ tasks: this.state.tasks.filter(t => !t.isCompleted) });
  }

  render() {
    return (
      <div>
        <div>
          <label>
            <input
              type="radio"
              name="task-state"
              value="all"
              checked={this.state.visibleState === 'all'}
              onChange={this.setVisibleState}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              name="task-state"
              value="active"
              checked={this.state.visibleState === 'active'}
              onChange={this.setVisibleState}
            />
            active
          </label>
          <label>
            <input
              type="radio"
              name="task-state"
              value="completed"
              checked={this.state.visibleState === 'completed'}
              onChange={this.setVisibleState}
            />
            completed
          </label>
        </div>
        <TaskInput addTask={this.addTask} />
        <ul>
          {this.visibleTasks().map(task => (
            <Task
              task={task}
              key={task.content}
              setComplete={b => this.setComplete(task.content, b)}
              deleteTask={this.deleteTask}
            />
          ))}
        </ul>
        <button onClick={this.clearCompletedTasks}>Clear completed</button>
      </div>
    );
  }
}

// eslint-disable-next-line no-unused-vars
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isCompleted: this.props.task.isCompleted };
    this.setComplete = this.setComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  setComplete(event) {
    this.props.setComplete(event.target.checked);
    this.setState({ isCompleted: event.target.checked });
  }
  deleteTask() {
    this.props.deleteTask(this.props.task.content);
  }

  render() {
    const content = this.state.isCompleted ? (
      <del>{this.props.task.content}</del>
    ) : (
      this.props.task.content
    );

    return (
      <li>
        <input
          type="checkbox"
          onChange={this.setComplete}
          checked={this.state.isCompleted}
        />
        {content}
        <button onClick={this.deleteTask}>Del</button>
      </li>
    );
  }
}

const rootElement = document.getElementById('react-root');

ReactDOM.render(<MyRoot />, rootElement);
