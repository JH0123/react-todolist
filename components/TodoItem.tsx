import axios from "axios";
import produce from "immer";
import React, { FC, useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { TodoData } from "../pages/swr";

export interface TodoItemProps {
  todo: TodoData;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const {
    data: todoData,
    mutate,
    error,
  } = useSWR<TodoData[]>("http://localhost:4444/todos", fetcher);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);

  // 수정 내용 입력
  const onChangeEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // mutate(
    //   todoData.map((todoData) =>
    //     todoData.id === todo.id
    //       ? { ...todo, editContent: e.target.value }
    //       : todo
    //   ),
    //   false
    // );
    // const check = todoData.find((todo) => todo.id === id);
    // check.editContent = e.target.value; // input창 안에는 입력자체가 안됨
    // console.log(check.editContent); // 한 글자만 입력됨
    setEditContent(e.target.value);
  };

  // 수정 버튼을 클릭했을 때
  const onClickEditButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // const check = todoData.find((todo) => todo.id === id);
    setIsEditing(true);
    // check.isEditing = true;

    // console.log(check.isEditing);

    // check.editContent = check.content;
  };

  // 수정 값 보내기
  const onEdit = (id: number) => {
    const check = todoData.find((todo) => todo.id === id);
    // check.isEditing = false;
    // console.log(check.isEditing);

    // const { editContent } = data;
    // const { done } = data;
    // console.log(data);

    // const test = (id) => {
    //   const check = todoData.find((todo) => todo.id === id);
    //   check.isEditing = false;
    //   console.log(check.isEditing);
    //   setEdited(false);
    //   console.log(setEdited);
    // };

    axios
      .put(`http://localhost:4444/todos/${id}`, {
        content: editContent,
        done: check.done,
      })
      .then((res) => {
        console.log(res);
        mutate(
          produce((todos: TodoData[]) => {
            const index = todos.findIndex((todo: TodoData) => todo.id === id);
            todos[index] = res.data.payload;
          }),
          false
        );
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDelete = async (id: number) => {
    await axios
      .delete(`http://localhost:4444/todos/${id}`)
      .then((res) => {
        alert("삭제 완료");
        const update = todoData.filter((todo) => todo.id !== id);
        mutate(update, false); // 지워지기는 하는데 페이지를 클릭하면 다시 생김
        console.log(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (todo.deletedAt) {
    return null;
  }

  return isEditing ? (
    <li key={todo.id}>
      {/* <form onSubmit={handleSubmit(onValid, onInvalid)}> */}
      {/* <form onSubmit={handleSubmit(onEdit)}>
        <input
          type="text"
          // value={todo.editContent}
          {...register("editContent", {
            required: true,
            value: todo.editContent,
            onChange: onChangeEditContent(todo.id),
          })}
          className="input input-bordered w-full max-w-xs"
          // ref={editInputRef}
          // onChange={onChangeEditContent(todo.id)}
        />
        <button className="btn">수정완료</button>
      </form> */}
      <input
        type="text"
        value={editContent}
        onChange={onChangeEditContent}
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn" onClick={(e) => onEdit(todo.id)}>
        수정완료
      </button>
    </li>
  ) : (
    <li key={todo.id}>
      {todo.content}
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          onDelete(todo.id);
        }}
      >
        삭제
      </button>
      <button className="btn" onClick={onClickEditButton}>
        수정
      </button>
    </li>
  );
};

export default TodoItem;
