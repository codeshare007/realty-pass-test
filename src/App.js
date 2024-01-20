import React, { useEffect, useState } from 'react'; 
import './App.css';

function App() {
  
  const [purchsePrice, setPurchasePrice] = useState(0);
  const [estimate, setEstimate] = useState(0);  

  const [fee, setFee] = useState(0);
  const [due, setDue] = useState(0);

  const [percentage, setPercentage] = useState(0);
  
  function calculate() {
    const decimalPart = 0.5 / 100 * estimate;
    setFee(Math.floor(Number(purchsePrice) / 250000) > 0 ? 500 + 250 * Math.floor(Number(purchsePrice) / 250000) + parseFloat(decimalPart.toPrecision(2)) : parseFloat(decimalPart.toPrecision(2)));
    setDue(estimate - fee);
    setPercentage(parseFloat(due / estimate) * 100);
  }
  
  useEffect(() => {
    const progress = document.querySelector('.progress-done');
    if(progress) {
      progress.style.width = progress.getAttribute('data-done') + '%';
      progress.style.opacity = 1;
    }
  });

  return (
    <div className="App">
      <div className='container'>
        <div className='left'>
          <div className='input-group'>
            <label>Purchase Prie</label>
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
              <span>$ {fee}</span>
            </div>
            <div className='right-group'>
              <label>Transaction Fee</label>
              <span>$ {due}</span>
            </div>
          </div>
          <div className='divider-horizontal'></div>
          <div className="progress">
            <div className="progress-done" data-done="{percentage}">
              {percentage}%
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
