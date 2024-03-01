import { useState } from "react";
import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todoItem, setTodoItem] = useState("")
	const [listOfTodos, setTodoArr] = useState([])

	const createArrayTodo = (e) => {
		if (e.key == "Enter") {
			setTodoArr([...listOfTodos, todoItem]);
			setTodoItem("")
		}
	}
	function removeElementAt(index) {
		let arr = listOfTodos;
		let frontPart = arr.slice(0, index);
		let lastPart = arr.slice(index + 1); // index to end of array
		setTodoArr([...frontPart, ...lastPart]);
	}

	return (
		<div className="container-fluid">
			<div className="row p-3 mb-2">
				<div className="col m-5">
					<ul className="list-group">
						<input type="text" value={todoItem} className="form-control rounded-0" id="exampleInputPassword1" placeholder="What Needs To Be Done? Hit Enter to Add Item" onKeyUp={(e) => { createArrayTodo(e) }} onChange={(e) => { setTodoItem(e.target.value) }} />
						{listOfTodos.map((todo, index) => {
							return (
								<div className="row" key={index}>
									<div className="col-5"></div>
									<li className="list-group-item" >
										<i className="fas fa-trash me-2" onClick={(e) => removeElementAt(index)}></i>{todo}</li>

								</div>

							)
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
