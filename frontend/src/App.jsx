import Login from './components/Login';
import Game from './components/Game';
import WalletDetails from './components/WalletDetails';
import create from 'zustand';

const useStore = create((set) => ({
  loggedIn: false,
  wonGame: false,
  api: {
    setLoginState: (loggedIn) => set(() => ({ loggedIn })),
    setGameState: (wonGame) => set(() => ({ wonGame })),
  },
}));

export default function () {
  const loggedIn = useStore((state) => state.loggedIn);
  const wonGame = useStore((state) => state.wonGame);
  const { setLoginState, setGameState } = useStore((state) => state.api);
  if (loggedIn) {
    if (wonGame) {
      return <WalletDetails />;
    } else {
      return <Game wonGame={setGameState} />;
    }
  } else {
    return <Login loggedIn={setLoginState} />;
  }
}
