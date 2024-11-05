import TodoList from "./component/todo-list";
const Home = () => {
  return (
    <div style={{backgroundImage: 'bg-gradient-to-r from-purple-500 to-pink-500'}}>
      <TodoList />
    </div>
  );
};

export default Home;