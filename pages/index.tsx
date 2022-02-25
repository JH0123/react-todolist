import Link from "next/link";
import { useState } from "react";
import produce from "immer";
import { classnames } from "tailwindcss-classnames";
import create from "zustand";
import { useForm } from "react-hook-form";

interface Todo {
  id: number;
  content: string;
  done: boolean;
  isEditing: boolean;
  editContent: string;
  disabled: boolean;
}
interface IData {
  content: string;
}

export default function IndexPage() {
  const cn = classnames.bind(classnames); // bind를 하지 않으면 classnames 계속 붙여야 함, cn()로 감싸주고 string 표시와 쉼표로 이름을 구분하면 된다
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IData>();
  // const [userInput, setUserInput] = useState("");

  // const list = useStore((state) => state);

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

  // const handleChange = (e) => {
  //   e.preventDefault(); // 어떤 이벤트를 명시적으로 처리하지 않는 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 한다
  //   // 기본 동작 방지?
  //   // setUserInput(e.target.value); // 객체에 담겨있는 값을 읽어온다
  // };

  // content를 생성 후 그 생성한 content는 수정이 안됨
  const onSubmit = (data: IData) => {
    const { content } = data;
    setTodoList(
      produce((draft) => {
        draft.unshift({
          content,
          id: Date.now(),
          disabled: false,
          done: false,
          editContent: "",
          isEditing: false,
        });
      })
    );
    reset({ content: "" });
  };

  const handleDelete = (id) => {
    const updateArr = todoList.filter((todo) => todo.id !== id);
    setTodoList(updateArr);
  };

  // const onChangeEditContent = (id) => (e) => {
  //   setTodoList(
  //     todoList.map((todo) =>
  //       todo.id === id ? { ...todo, editContent: e.target.value } : todo
  //     )
  //   );
  // };

  const onChangeEditContent = (id) => (e) => {
    setTodoList(
      produce((draft) => {
        const check = draft.find((todo) => todo.id === id);
        check.editContent = e.target.value;
      })
    );
  };

  // const onClickEditButton = (id) => (e) => {
  //   setTodoList(
  //     todoList.map((todo) => {
  //       if (todo.id !== id) {
  //         return todo;
  //       }
  //       return {
  //         ...todo,
  //         isEditing: true,
  //         editContent: todo.content,
  //       };
  //     })
  //   );
  // };

  const onClickEditButton = (id) => (e) => {
    setTodoList(
      produce((draft) => {
        const check = draft.find((todo) => todo.id === id);
        check.isEditing = true;
        check.editContent = check.content;
      })
    );
  };

  // const onSubmitEdit = (id) => (e) => {
  //   e.preventDefault();
  //   setTodoList(
  //     todoList.map((todo) => {
  //       if (todo.id !== id) {
  //         return todo;
  //       }
  //       return {
  //         ...todo,
  //         isEditing: false,
  //         content: todo.editContent,
  //       };
  //     })
  //   );
  // };

  const onSubmitEdit = (id) => (e) => {
    setTodoList(
      produce((draft) => {
        const check = draft.find((todo) => todo.id === id);
        check.isEditing = false;
        check.content = check.editContent;
      })
    );
  };

  return (
    <div>
      <div className="navbar bg-base-100 mb-40 shadow-xl rounded-box">
        <div className="navbar-start">
          <div className="dropdown">
            <label className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            {/* <ul
              // tabindex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul> */}
            <nav className="flex sm:justify-center space-x-4">
              <Link href="/imgupload">
                <button className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900">
                  Image Upload
                </button>
              </Link>
            </nav>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Todo List</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input input-bordered input-primary w-full max-w-x bg-gray-200 mb-3 focus:bg-white"
          type="text"
          // value={userInput}
          // onChange={handleChange}
          {...register("content", {
            required: true,
            pattern: /^[a-zA-Z0-9가-힣]{1,20}$/,
          })}
          placeholder="Enter a todo item"
        />
        {errors.content && errors.content.type === "required" && (
          <span>content를 입력해주세요!</span>
        )}
        {errors.content && errors.content.type === "pattern" && (
          <span>content는 20자 이내로 입력해주세요!</span>
        )}
        <button className="btn btn-accent float-right">Submit</button>
      </form>
      <ul className="my-20 border transition-all duration-500 relative rounded p-2">
        {todoList.length >= 1
          ? todoList.map((todo) =>
              todo.isEditing ? (
                <li key={todo.id} className="flex">
                  <input
                    className="input input-bordered input-success w-full max-w-xs"
                    type="text"
                    value={todo.editContent}
                    onChange={onChangeEditContent(todo.id)}
                  />
                  <button
                    // className="rounded text-gray-100 px-3 py-1 bg-green-500 hover:shadow-inner hover:bg-green-700 transition-all duration-300 float-right"
                    className="rounded-full btn btn-accent float-right"
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
                    <div
                      className={cn(
                        "border-2 rounded-lg border-gray-200 w-full py-2 px-4 text-gray-700 leading-tight",
                        {
                          "line-through": todo.disabled,
                        }
                      )}
                    >
                      {todo.content}
                    </div>
                    <div className="flex justify-between">
                      <button
                        // className="rounded-full text-gray-100 px-3 py-1 bg-red-500 hover:shadow-inner hover:bg-red-700 transition-all duration-300"
                        className="rounded-full btn btn-error px-3 py-1"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(todo.id);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        // className="rounded-full text-gray-100 px-3 py-1 bg-yellow-500 hover:shadow-inner hover:bg-yellow-700 transition-all duration-300"
                        className="rounded-full btn btn-warning px-3 py-1"
                        type="submit"
                        onClick={onClickEditButton(todo.id)}
                      >
                        Edit
                      </button>

                      <button
                        // className="rounded-full text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300
                        // disabled:text-white disabled:bg-gray-500"
                        className="rounded-full btn btn-info"
                        // 위의 className안에 있는 것들은 조건에 상관없이 나타나는 것
                        // disabled가 true이면 글씨가 연해지거나 취소선 생기게 만들기
                        onClick={(e) => {
                          e.preventDefault;
                          alert("미션 완료!!");
                          // handleComplete(todo.id);
                          setTodoList(
                            todoList.map((todo2) =>
                              todo2.id === todo.id
                                ? { ...todo2, done: true, disabled: true }
                                : todo2
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
