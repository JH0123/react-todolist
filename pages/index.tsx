import Link from "next/link";
import { useState } from "react";
import produce from "immer";

interface Todo {
  id: number;
  content: string;
  done: boolean;
  isEditing: boolean;
  editContent: string;
  disabled: boolean;
}

export default function index() {
  // const [isDisabled, setIsDisabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([
    {
      id: 0,
      content: "첫번째 할일",
      done: false,
      isEditing: false,
      editContent: "",
      disabled: false,
    },
    {
      id: 1,
      content: "두번째 할일",
      done: false,
      isEditing: false,
      editContent: "",
      disabled: false,
    },
  ]);

  const [isChecked, setIsChecked] = useState(false); // 체크 여부

  // const [disable, setDisable] = useState(false); // complete 클릭 여부

  const handleChange = (e) => {
    e.preventDefault(); // 어떤 이벤트를 명시적으로 처리하지 않는 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 한다
    // 기본 동작 방지?
    setUserInput(e.target.value); // 객체에 담겨있는 값을 읽어온다
    // console.log(userInput)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodoList([
      {
        content: userInput,
        id: Date.now(),
        disabled: false,
        done: false,
        editContent: "",
        isEditing: false,
      },
      ...todoList,
    ]);
    setUserInput("");
  };

  const handleDelete = (id) => {
    const updateArr = todoList.filter((todo) => todo.id !== id);
    // filter는 주어진 함수 값이 통과하는 새로운 배열을 만든다
    // indexOf() 메서드는 호출한 string 객체에서 주어진 값과 일치하는 첫 번째 인덱스를 반환한다
    // console.log(updateArr);

    setTodoList(updateArr);
  };

  const onChangeEditContent = (id) => (e) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, editContent: e.target.value } : todo
      )
    );
  };

  // map()은 실행한 결과를 가지고 새로운 배열을 만든다
  // const handleChangeEdit = (e) => {

  // Edit 버튼을 누르면 todo.isEditing을 true로 만들어 주면서 div 대신 input이 나오게 변경

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

  // const handleComplete = (id) => (e) => {
  //   e.preventDefault();
  //   setIsDisabled(!isDisabled);
  // };

  // complete라는 버튼을 클릭하면 done이 true로 바뀌고 글자색을 회색으로 바꾸기
  // edit 버튼 비활성화 or 없애기

  return (
    <div>
      <h1 className="bg-red-900 text-center text-white text-2xl py-4">
        Todo List
      </h1>
      <nav className="bg-gray-500 flex sm:justify-center space-x-4">
        <Link href="/imgupload">
          <button className="rounded-lg px-3 py-2 text-white font-medium hover:bg-slate-100 hover:text-slate-900">
            Image Upload
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
      <ul className="my-8 border transition-all duration-500 relative rounded p-2">
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
                <li key={todo.id} className="pt-4">
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
                        className="rounded-full text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300
                        disabled:text-white disabled:bg-gray-500"
                        disabled="" // 이거 여기 왜 있는지 모르겠음
                        onClick={(e) => {
                          e.preventDefault;
                          alert("미션 완료!!");
                          // handleComplete(todo.id);
                          e.currentTarget.disabled = true; // edit도 비활성화 시켜야함
                          setTodoList(
                            todoList.map((todo2) =>
                              todo.id === todo2.id
                                ? { ...todo, disabled: true }
                                : todo
                            )
                          );
                        }}
                        disabled={todo.disabled}
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
