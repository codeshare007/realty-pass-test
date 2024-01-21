import React, { useEffect, useState } from 'react'; 
import ProgressBar from './utils/ProgressBar';
import './App.css';

function App() {  
  const [purchsePrice, setPurchasePrice] = useState(0);
  const [estimate, setEstimate] = useState(0);  

  const [fee, setFee] = useState(0);
  const [due, setDue] = useState(0);

  const [percentage, setPercentage] = useState(0);
  
  function calculate() {
    let estimatedPart = 0.5 / 100 * estimate;
    let fee = Math.floor(Number(purchsePrice) / 250000) > 0 ? ( 500 + 250 * Math.floor(Number(purchsePrice) / 250000) + estimatedPart ) : estimatedPart;
    let due = estimate - fee;
    setFee(fee);
    setDue(due);
    setPercentage(parseFloat(due / estimate) * 100);
  };
  
  useEffect(() => {
    const progress = document.querySelector('.progress-done');
    if(progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
  }, []);

  return (
    <div className="App">
      <div className='container'>
        <div className='left'>
          <div className='input-group'>
            <label>Purchase Price</label>
            <input type='number' step={0.01} value={parseFloat(purchsePrice)} onChange={(e) => {
              setPurchasePrice(parseFloat(e.target.value).toFixed(2))
            }} />
          </div>
          <div className='input-group'>
            <label>Estimated Commission</label>
            <input type='number' step={0.01} value={parseFloat(estimate)} onChange={(e) => {
              setEstimate(parseFloat(e.target.value).toFixed(2))
            }} />
          </div>
          <button onClick={calculate}>Calculate</button>
        </div>
        
        <div className='divider-vertical'></div>
        <div className='right'>
          <div className='d-flex'>
            <div className='right-group'>
              <label>Transaction Fee</label>
              <span>$ {Number(fee).toFixed(2)}</span>
            </div>
            <div className='right-group'>
              <label>Transaction Fee</label>
              <span>$ {Number(due).toFixed(2)}</span>
            </div>
          </div>
          <div className='divider-horizontal'></div>
          <div className='progress-container'>
            <label>You keep {Number(percentage).toFixed(2)}%</label>
            <div className="progress">
              <ProgressBar done={Number(percentage).toFixed(2)}/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
