import React, { useState } from "react";
import { ethers, providers } from "ethers"; // Corrected import
import "./App.css";

const CONTRACT_ADDRESS = "0x8DcA81D87C261BcD5dd81a17371855e84f4a1715"; // Replace with your contract address
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "int256", "name": "a", "type": "int256" },
    { "internalType": "int256", "name": "b", "type": "int256" }],
    "name": "add",
    "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "int256", "name": "a", "type": "int256" },
    { "internalType": "int256", "name": "b", "type": "int256" }],
    "name": "subtract",
    "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "int256", "name": "a", "type": "int256" },
    { "internalType": "int256", "name": "b", "type": "int256" }],
    "name": "multiply",
    "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "int256", "name": "a", "type": "int256" },
    { "internalType": "int256", "name": "b", "type": "int256" }],
    "name": "divide",
    "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not installed!");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function calculate(operation) {
    if (!window.ethereum) {
      alert("Connect MetaMask first!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum); // Updated to use Web3Provider correctly
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
      setLoading(true);

      // Call the function directly for state-changing operations
      const tx = await contract[operation](parseInt(a), parseInt(b)); // This sends the transaction
      await tx.wait(); // Wait for the transaction to be mined

      // Fetch the result from the transaction receipt
      const result = await contract[operation](parseInt(a), parseInt(b));
      setResult(`Result: ${result.toString()}`);
    } catch (error) {
      console.error(error);
      setResult("Error occurred! Check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Blockchain Calculator</h1>
      <button onClick={connectWallet}>Connect MetaMask</button>
      <br />
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="Enter A" />
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="Enter B" />
      <br />
      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("subtract")}>Subtract</button>
      <button onClick={() => calculate("multiply")}>Multiply</button>
      <button onClick={() => calculate("divide")}>Divide</button>
      <br />
      {loading ? <p>Calculating...</p> : <h2>{result}</h2>}
    </div>
  );
}

export default App;
