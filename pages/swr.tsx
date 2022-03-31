import { useCallback, useEffect, useRef, useState } from "react";
import { Todo, IData } from ".";
import fetcher from "../lib/fetcher";
import { useForm } from "react-hook-form";
import produce from "immer";
import useSWR from "swr";
import axios from "axios";
import todo from "./api/todo";
import TodoItem from "../components/TodoItem";

export interface TodoData {
  id: 1;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const SWRPage = () => {
  const {
    data: todoData,
    mutate,
    error,
  } = useSWR<TodoData[]>("http://localhost:4444/todos", fetcher);

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
        mutate(
          produce((todo) => {
            todo.push(res.data.payload);
          }),
          false
        );
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

  // 선택한 리스트 form에 focus
  // useEffect(() => {
  //   if (edited) {
  //     editInputRef.current.focus();
  //   }
  // }, [edited]);

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
        {todoData?.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default SWRPage;
