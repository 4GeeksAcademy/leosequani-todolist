import { useEffect, useState } from "react";
import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//State Hooks
	const [todoItem, setTodoItem] = useState("")
	const [listOfTodos, setTodoArr] = useState([])
	const [bool, setbool] = useState(true)


	//Global Variable
	let arrTrsfr = []
	let arrDel = []





	useEffect(() => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/Leo')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as JSON
				return response.json();
			})
			.then(responseAsJson => {
				// Do stuff with the JSONified response
				setTodoArr(responseAsJson);
				console.log(responseAsJson);
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});

	}, [])











	const createArrayTodo = (e) => {
		if (e.key == "Enter") {
			arrTrsfr = [...listOfTodos, {
				"done": false,
				"label": todoItem,
			}];
			setTodoItem("")
			setTodoArr(arrTrsfr);
			fetch('https://playground.4geeks.com/apis/fake/todos/user/Leo', {
			method: 'PUT', // or 'POST'
			body: JSON.stringify(arrTrsfr), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error))
		}
		
	}

	function removeElementAt(index) {
		let arr = listOfTodos;
		let frontPart = arr.slice(0, index);
		let lastPart = arr.slice(index + 1); // index to end of array

		arrDel = [...frontPart, ...lastPart]
		setTodoArr([...frontPart, ...lastPart]);


		fetch('https://playground.4geeks.com/apis/fake/todos/user/Leo', {
			method: 'PUT', // or 'POST'
			body: JSON.stringify(arrDel), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error))
	}

	const checkBox = ((index) => {
		
		listOfTodos[index].done = !listOfTodos[index].done
		setbool(!bool)

		

		fetch('https://playground.4geeks.com/apis/fake/todos/user/Leo', {
			method: 'PUT', // or 'POST'
			body: JSON.stringify(listOfTodos), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error))

			;


	})
	//{listOfTodos[index].done == true ? <input className="form-check-input" type="checkbox" value={listOfTodos[index].done} id="flexCheckChecked" checked />
	//:<input className="form-check-input" type="checkbox" value={listOfTodos[index].done} id="flexCheckChecked" />}


	return (
		<div className="container-fluid">
			<div className="row p-3 mb-2">
				<div className="col m-5">
					<ul className="list-group">
						<input type="text" value={todoItem} className="form-control rounded-0" id="exampleInputPassword1" placeholder="What Needs To Be Done? Hit Enter to Add Item" onKeyUp={(e) => { createArrayTodo(e) }} onChange={(e) => { setTodoItem(e.target.value) }} />
						{listOfTodos.map((todo, index) => {
							return (
								<div className="row" key={index}>
									<li className="list-group-item d-flex justify-content-between " >
										<div className="div">
											<i className="fas fa-trash me-2" onClick={(e) => removeElementAt(index)}></i>
											<span>{listOfTodos[index].label}</span>
										</div>
										<div>
											<input className="form-check-input" type="checkbox" value={listOfTodos[index].done} id="flexCheckChecked" onChange={(e) => { checkBox(index) }} checked={todo.done == true ? true : false} />
										</div>

									</li>

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


const name =()=>{
	
}