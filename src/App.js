import React, { Component } from 'react';
import './App.css';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			currentItem: {
				text: '',
				key: '',
			},
		};
		this.addItem = this.addItem.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.setUpdate = this.setUpdate.bind(this);
	}

	addItem(e) {
		// preventDefault-> to prevent refreshing page every time button is clicked.
		e.preventDefault();
		const newItem = this.state.currentItem;
		console.log(newItem);
		if (newItem.text !== '') {
			const items = [...this.state.items, newItem];
			this.setState({
				items: items,
				currentItem: {
					text: '',
					key: '',
				},
			});
		}
	}

	handleInput(e) {
		this.setState({
			currentItem: {
				text: e.target.value,
				key: Date.now(),
			},
		});
	}

	deleteItem(key) {
		const filteredItems = this.state.items.filter((item) => item.key !== key);
		this.setState({
			items: filteredItems,
		});
	}

	setUpdate(text, key) {
		const items = this.state.items;
		items.map((item) => {
			if (item.key === key) {
				// console.log(item.key + '    ' + key);
				item.text = text;
			}
		});
		this.setState({
			items: items,
		});
	}

	render() {
		return (
			<div className='App'>
				<header>
					<form id='to-do-form' onSubmit={this.addItem}>
						<input
							type='text'
							placeholder='Enter task'
							value={this.state.currentItem.text}
							onChange={this.handleInput}
						/>
						<button type='submit'>Add</button>
					</form>
				</header>
				<ListItems
					items={this.state.items} //props
					deleteItem={this.deleteItem}
					setUpdate={this.setUpdate}
				/>
			</div>
		);
	}
}

export default App;
