import { useCallback, useEffect, useRef, useState } from "react";
import { Todo, IData } from ".";
import fetcher from "../lib/fetcher";
import { useForm } from "react-hook-form";
import produce from "immer";
import useSWR from "swr";
import axios from "axios";
import todo from "./api/todo";

const SWRPage = () => {
  const {
    data: todoData,
    mutate,
    error,
  } = useSWR<Todo[]>("http://localhost:4444/todos", fetcher);

  const { handleSubmit, reset, register } = useForm<IData>();

  const onValid = (data) => console.log(data, "onvalid");
  const onInvalid = (data) => console.log(data, "onInvalid");

  // const editInputRef = useRef(null);

  const [edited, setEdited] = useState(false);

  const onSubmit = (data: IData) => {
    const { content } = data;
    // console.log(data);
    axios
      .post("http://localhost:4444/todos", { content })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.res);
        // console.log({ data });
      });
    reset({ content: "" });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const res = await axios.get("http://localhost:4444/todos");
  //   return res.data;
  // };

  const onDelete = async (id) => {
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

  // 수정 버튼을 클릭했을 때
  const onClickEditButton = (id) => (e) => {
    const check = todoData.find((todo) => todo.id === id);
    check.isEditing = true;

    console.log(check.isEditing);

    setEdited(true);
    check.editContent = check.content;
  };

  // 선택한 리스트 form에 focus
  // useEffect(() => {
  //   if (edited) {
  //     editInputRef.current.focus();
  //   }
  // }, [edited]);

  // 수정 내용 입력
  const onChangeEditContent = (id) => (e) => {
    mutate(
      todoData.map((todo) =>
        todo.id === id ? { ...todo, editContent: e.target.value } : todo
      ),
      false
    );

    // const check = todoData.find((todo) => todo.id === id);
    // check.editContent = e.target.value; // input창 안에는 입력자체가 안됨
    // console.log(check.editContent); // 한 글자만 입력됨
  };

  // 수정 값 보내기
  const onEdit = (id) => {
    const check = todoData.find((todo) => todo.id === id);
    check.isEditing = false;
    console.log(check.isEditing);
    setEdited(false);

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
        editContent: check.editContent,
        done: check.done,
      })
      .then((res) => {
        console.log(res);
        mutate(
          todoData.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }
            return {
              ...todo,
              isEditing: false,
              content: todo.editContent,
            };
          }),
          false
        );
        // test;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 값이 변경되면 안에 있는 내용이 실행됨
  // useEffect(() => {
  //   if (todoData) {
  //     mutate(
  //       (todos) => {
  //         return [
  //           ...todos,
  //           {
  //             content: "asdfasdf",
  //             disabled: false,
  //             done: false,
  //             editContent: "",
  //             id: 9919394,
  //             isEditing: false,
  //           },
  //         ];
  //       },
  //       {
  //         revalidate: false,
  //       }
  //     );
  //   }
  // }, []);

  return (
    <div>
      <ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("content")}
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn">Submit</button>
        </form>
        {todoData?.map((todo) =>
          todo.isEditing ? (
            <li key={todo.id}>
              {/* <form onSubmit={handleSubmit(onValid, onInvalid)}> */}'
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
                value={todo.editContent}
                onChange={onChangeEditContent(todo.id)}
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
              <button className="btn" onClick={onClickEditButton(todo.id)}>
                수정
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SWRPage;
