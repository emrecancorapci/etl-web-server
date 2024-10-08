import { useTokenStore } from './token-store';
import Login from './components/app/login/login';
import Home from './home';

export default function App() {
  const token = useTokenStore((s) => s.token);

  return (
    <div className="dark m-0 flex min-h-screen min-w-full flex-col items-center justify-center bg-zinc-950 p-0">
      <div className="flex w-full flex-col bg-card">
        <div className="flex items-center justify-center p-2">
          <div className="flex flex-row items-end">
            <h1 className="text-5xl font-thin text-primary">Tetra</h1>
            <p className="ps-4 text-lg font-extralight text-muted-foreground">
              Bettair ETL Application
            </p>
          </div>
        </div>
      </div>

      <div className="grid w-full max-w-screen-lg flex-1 p-4">{token ? <Home /> : <Login />}</div>
    </div>
  );
}
