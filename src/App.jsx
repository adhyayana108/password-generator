import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
 
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  
  const passwordRef = useRef(null);

  
  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    
    if (score <= 1) return { label: "Weak", color: "bg-rose-400", width: "w-1/3" };
    if (score <= 3) return { label: "Medium", color: "bg-orange-300", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-400", width: "w-full" };
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const strengthData = checkStrength(password);

  return (
    
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100  font-sans p-4">
      
     
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-xl border border-white/50 rounded-4xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] p-10">
        
        <h1 className="text-3xl font-semibold text-slate-700 text-center mb-9 tracking-wide">
          Password Generator
        </h1>

      
        <div className="relative mb-7 group">
          <div className="relative flex items-center bg-sky/30 rounded-2xl p-2 border border-white/50 shadow-inner">
            <input
              type="text"
              value={password}
              className="outline-none w-full bg-transparent text-slate-700 text-xl font-mono tracking-wider px-4 placeholder-slate-400"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className={`shrink-0 px-5 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                copied 
                ? "bg-indigo-400 text-white" 
                : "bg-white text-indigo-500 hover:bg-indigo-50"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

       
        <div className="mb-10 px-1">
          <div className="flex justify-between text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">
            <span>Strength</span>
            <span>{strengthData.label}</span>
          </div>
          <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full ${strengthData.color} transition-all duration-500 ease-out`} style={{ width: strengthData.width }}></div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="space-y-6">
          
         
          <div className="w-full max-w-lg bg-white/30 p-5 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <label className="text-slate-600 font-bold">Length</label>
              <span className="text-indigo-500 font-bold text-xl">{length}</span>
            </div>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-400 hover:accent-indigo-500 transition-all"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            
           
            <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 shadow-sm ${numberAllowed ? 'bg-indigo-100/40 border-indigo-200' : 'bg-white/40 border-white/40 hover:bg-white/60'}`}>
              <span className={`font-semibold ${numberAllowed ? 'text-indigo-600' : 'text-slate-500'}`}>Numbers</span>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  className="sr-only"
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                
                <div className={`w-11 h-6 rounded-full transition-colors ${numberAllowed ? 'bg-indigo-400' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-md ${numberAllowed ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </label>

            
            <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-300 shadow-sm ${charAllowed ? 'bg-indigo-100/40 border-indigo-200' : 'bg-white/40 border-white/40 hover:bg-white/60'}`}>
              <span className={`font-semibold ${charAllowed ? 'text-indigo-600' : 'text-slate-500'}`}>Symbols</span>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  className="sr-only"
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                
                <div className={`w-11 h-6 rounded-full transition-colors ${charAllowed ? 'bg-indigo-400' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-md ${charAllowed ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </label>

          </div>
        </div>
 
        <button
          onClick={passwordGenerator}
          className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transform active:scale-[0.98] transition-all duration-200 tracking-wide text-lg"
        >
          Generare New Password
        </button>
        </div>
    </div>
  );
}

export default App;