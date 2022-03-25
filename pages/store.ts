import produce from "immer";
import create from "zustand";
import { useForm } from "react-hook-form";
import { Todo } from "./index";

interface TodoState {
  todos: Todo[];
  addTodo: (content: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

// const useStore = create<TodoState>((set) => ({
//   addTodo :
// }));
