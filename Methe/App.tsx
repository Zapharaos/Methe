import tw from './lib/tailwind';
import { useDeviceContext } from 'twrnc';
import Navigation from "./src/navigation/navigation";

export default function App() {
  useDeviceContext(tw);
  return (
      <Navigation/>
  );
}
