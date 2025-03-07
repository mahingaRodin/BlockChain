import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import Web3Modal from "web3modal";
import HelloWorldABI from "../../backend/artifacts/contracts/HelloWorld.sol/HelloWorld.json"; // Replace with your ABI

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address

function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getMessage();
  }, []);

  async function getMessage() {
    if (!window.ethereum) return alert("MetaMask is required!");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, HelloWorldABI, provider);
    setMessage(await contract.message());
  }

  async function updateMessage() {
    if (!window.ethereum) return alert("MetaMask is required!");

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, HelloWorldABI, signer);

    const tx = await contract.setMessage(newMessage);
    await tx.wait();
    getMessage();
  }

  return (
    <div>
      <h1>Web3 Hello World</h1>
      <p>Current Message: {message}</p>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
}

export default App;
