import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useToast } from "./components/ui/use-toast";

function App() {
  const { toast } = useToast();
  const [response, setResponse] = useState("");
  const [palpite, setPalpite] = useState<string | number>(0);

  async function greet() {
    setResponse(await invoke("greet", { palpite }));
  }

  return (
    <div className="flex-col justify-center pt-8 bg-gray-950 text-white h-screen cursor-none select-none">
      <h1 className="text-center text-xl">Jogo de Advinhação!</h1>
      <div className="flex justify-center pt-5 gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <Input
            id="greet-input"
            type="number"
            onChange={(e) => setPalpite(e.target.value)}
            placeholder="Dê seu palpite de 0 a 100."
          />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                toast({
                  title: "Alex Say: ",
                  description: response,
                  variant: `${response == "Acertou!" ? "default" : "destructive"}`,
                });
              }}
              className="m-2"
              variant="secondary"
              type="submit"
            >
              Palpitar
            </Button>
          </div>
        </form>
      </div>

      {/* <p className="text-center text-white "> */}
      {/*   {response == "Acertou!" ? ( */}
      {/*     <span className="text-green-500 font-bold">{response}</span> */}
      {/*   ) : ( */}
      {/*     <p className="text-red-800">{response}</p> */}
      {/*   )} */}
      {/* </p> */}
    </div>
  );
}

export default App;
