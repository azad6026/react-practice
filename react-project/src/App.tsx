// import { useState } from "react";
import "./App.css";
import "./styles/globals.css";
import "./styles/main.css";
// import Posts from "./projects/blog-posts/BlogPosts";
import AppRouter from "./Router";
// import Layout from "./projects/game-station/Layout";
// import { Genres } from "./projects/game-station/hooks/useGenres";

function App() {
  // const [selectedGenre, setSelectedGenre] = useState<Genres | null>(null);
  // const [todos, setTodos] = useState<TodoItem[]>(() => {
  // try {
  //   const savedTodos = localStorage.getItem("savedTodos");
  //   return savedTodos ? JSON.parse(savedTodos) : [];
  // } catch (error) {
  //   return [];
  // }
  // });
  // useEffect(() => {
  //   localStorage.setItem("savedTodos", JSON.stringify(todos));
  // }, [todos]);
  // const addTodo = (text: string) => {
  //   const newTodo: TodoItem = {
  //     id: Date.now(),
  //     text,
  //     completed: false,
  //   };
  // };
  // setTodos([...todos, newTodo]);
  // const toggleComplete = (id: number) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };
  // const removeTodo = (id: number) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  return (
    <>
      <p className="font-primary">test</p>
      {/* <div className="main"> */}
      {/* <CurrentLocationWether /> */}
      {/* <Weather city="tehran" /> */}
      {/* <CitiesWeather /> */}

      {/* <div className="todo-app">
        <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
        />
        <TodoInput addTodo={addTodo} />
        </div> */}
      {/* <Layout
        onSelectGenre={(genre) => setSelectedGenre(genre)}
        /> */}
      {/* </div> */}
      {/* <MovieProvider>
        <div className="App">
          <header className="App-header">
            <h1>Type the movie name to select from the movie list</h1>{" "}
            <AddMovie /> <MovieList />
          </header>
        </div>
      </MovieProvider> */}
      <AppRouter />
    </>
  );
}

export default App;
