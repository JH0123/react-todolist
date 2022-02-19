import Link from "next/link";
import { useState } from "react";

export default function index() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: 0,
      content: "첫번째 할일",
      done: false,
      isEditing: false,
      editContent: "",
    },
    {
      id: 1,
      content: "두번째 할일",
      done: false,
      isEditing: false,
      editContent: "",
    },
  ]);
  const [isChecked, setIsChecked] = useState(false); // 체크 여부

  const handleChange = (e) => {
    e.preventDefault(); // 어떤 이벤트를 명시적으로 처리하지 않는 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 한다
    // 기본 동작 방지?
    setUserInput(e.target.value); // 객체에 담겨있는 값을 읽어온다
    // console.log(userInput)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([{ content: userInput, id: Date.now() }, ...todoList]);
    setUserInput("");
  };
  const handleDelete = (id) => {
    const updateArr = todoList.filter((todo) => todo.id !== id);
    // indexOf() 메서드는 호출한 string 객체에서 주어진 값과 일치하는 첫 번째 인덱스를 반환한다
    console.log(updateArr);

    setTodoList(updateArr);
  };

  const onChangeEditContent = (id) => (e) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, editContent: e.target.value } : todo
      )
    );
  };

  // const handleChangeEdit = (e) => {

  // edit 버튼을 누르면 input박스로 바꾸고 옆에 submit버튼이 생기고 그 버튼을 누를 시 submit버튼은 사라지고 변경된 값으로 배열에 저장되게 만들기

  // 그냥 저 list를 클릭하면 input으로 바뀌게 하고 edit을 누르면 수정이 되는 걸로

  const onClickEditButton = (id) => (e) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = true;
          todo.editContent = todo.content;
        }

        return todo;
      })
    );
  };

  const onSubmitEdit = (id) => (e) => {
    e.preventDefault();
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = false;
          todo.content = todo.editContent;
        }
        return todo;
      })
    );
  };

  //   const handleEdit = (idx) => {

  //     const update = todoList.map((todo) => {

  //       // idx == idxs ? idx  : todo
  //      todo.idx == idx ? { ...idx, [todo.idx]: editValue } : todo
  //     })

  //     console.log(update)
  // }

  return (
    <div>
      <h1 className="bg-red-900 text-center text-white text-2xl py-4">
        Todo List
      </h1>
      <nav className="bg-gray-500 flex sm:justify-center space-x-4">
        <Link href="/home">
          <button className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">
            Home
          </button>
        </Link>
      </nav>
      <br />
      <form>
        <input
          className="bg-gray-200 appearance-none border-2 rounded-lg border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Enter a todo item"
        />
        <button
          className="rounded text-gray-100 px-3 py-1 bg-green-500 hover:shadow-inner hover:bg-green-700 transition-all duration-300 float-right"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <ul className="my-8 border transition-all duration-500 relative rounded p-1">
        {todoList.length >= 1
          ? todoList.map((todo) =>
              todo.isEditing ? (
                <li key={todo.id} className="flex">
                  <input
                    className="border-2 rounded-lg border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    value={todo.editContent}
                    onChange={onChangeEditContent(todo.id)}
                  />
                  <button
                    className="rounded text-gray-100 px-3 py-1 bg-green-500 hover:shadow-inner hover:bg-green-700 transition-all duration-300 float-right"
                    onClick={onSubmitEdit(todo.id)}
                  >
                    수정하기
                  </button>
                </li>
              ) : (
                <li key={todo.id}>
                  <div className="form-check flex items-center justify-between">
                    <input type="checkbox" className="form-checkbox" />
                    {/* onChange input text값이 바뀔 때마다 발생하는 이벤트*/}

                    {/* <div className="border-2 rounded-lg px-4 leading-tight">   {todo}
                 </div> */}

                    <div className="border-2 rounded-lg border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight">
                      {todo.content}
                    </div>
                    <div className="flex justify-between">
                      <button
                        className="rounded-full text-gray-100 px-3 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(todo.id);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        className="rounded-full text-gray-100 px-3 py-1 bg-yellow-500 hover:shadow-inner hover:bg-yellow-700 transition-all duration-300"
                        type="submit"
                        onClick={onClickEditButton(todo.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="rounded-full text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
                        onClick={(e) => {
                          e.preventDefault;
                          alert("미션 완료!!");
                          handleDelete(todo.id);
                        }}
                      >
                        Complete
                      </button>
                    </div>
                    <br />
                  </div>
                </li>
              )
            )
          : `Enter a todo item`}
      </ul>
    </div>
  );
}
