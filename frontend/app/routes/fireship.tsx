import type { MetaFunction } from "@remix-run/node";

import {SideBar} from "~/components/MySideBar";
import { Button } from "~/components/ui/button";

import { Theme, useTheme } from "~/lib/theme-provider";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Fireship() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="ml-16 p-4">
        <pre>theme: {theme}</pre>
        <Button onClick={toggleTheme}>Toggle theme</Button>
      </div>
    </div>  
  ); 
}
 