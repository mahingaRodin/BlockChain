import { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import Calculator from '../../build/contracts/Calculator.json'; // Adjust the import if necessary

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false); // For showing loading indicator

  // Initialize web3, contract, and account
  useEffect(() => {
    const initWeb3 = async () => {
      const web3Instance = new Web3(Web3.givenProvider || "http://localhost:8545");
      setWeb3(web3Instance);

      // Load accounts
      const accounts = await web3Instance.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        alert("Please connect your wallet.");
      }

      // Get contract instance
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = Calculator.networks[networkId];
      if (deployedNetwork) {
        const contractInstance = new web3Instance.eth.Contract(
          Calculator.abi,
          deployedNetwork.address
        );
        setContract(contractInstance);
      } else {
        alert("Contract not deployed on the detected network.");
      }
    };
    initWeb3();
  }, []);

  const handleCalculation = async (operation) => {
    if (!contract) {
      console.error("Contract not loaded.");
      alert("Contract not loaded. Please try again.");
      return;
    }
    if (!num1 || !num2) {
      alert("Please enter both numbers.");
      return;
    }
    if (!account) {
      alert("Please connect a wallet.");
      return;
    }

    try {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);

      // Validation for numeric inputs
      if (isNaN(n1) || isNaN(n2)) {
        alert("Please enter valid numbers.");
        return;
      }

      setLoading(true); // Show loading spinner
      let res;

      switch (operation) {
        case 'add':
          res = await contract.methods.add(n1, n2).send({ from: account });
          break;
        case 'subtract':
          res = await contract.methods.subtract(n1, n2).send({ from: account });
          break;
        case 'multiply':
          res = await contract.methods.multiply(n1, n2).send({ from: account });
          break;
        case 'divide':
          res = await contract.methods.divide(n1, n2).send({ from: account });
          break;
        default:
          alert("Invalid operation.");
          setLoading(false); // Hide loading spinner
          return;
      }

      const result = res.events.Result.returnValues.result;
      setResult(result);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during the transaction: " + error.message);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="App">
      <h1>Calculator DApp</h1>
      <div className="calculator">
        <input
          type="number"
          placeholder="Enter first number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => handleCalculation('add')}>Add</button>
          <button onClick={() => handleCalculation('subtract')}>Subtract</button>
          <button onClick={() => handleCalculation('multiply')}>Multiply</button>
          <button onClick={() => handleCalculation('divide')}>Divide</button>
        </div>

        {/* Loading Spinner */}
        {loading && <div className="loading">Processing...</div>}

        {result && (
          <div className="result">
            <h2 className="answer">Result: {result}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
