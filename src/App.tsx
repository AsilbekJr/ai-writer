import './App.css';
import { Button } from './components/ui/button';

function App() {
  return (
    <>
      <h1 className="text-3xl underline">Hello</h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button variant="destructive">Click me</Button>
      </div>
    </>
  );
}

export default App;
