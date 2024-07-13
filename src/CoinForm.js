import React, {useState} from 'react'
import $ from 'jquery'

export default function CoinForm() { 

    const [showResult, setShowResult] = useState(false);
    const [qResult, setQResult] = useState([]);
    var selectedDenominators = [];

    function toggle(e) { 
        const val = e.target.value;
        if (selectedDenominators.includes(val)) {
            var i = selectedDenominators.indexOf(val);
            selectedDenominators.splice(i, 1);
        } else { 
            selectedDenominators.push(val);
        }
    }

    function localStringify(url, params) { 
        let result = '';
        for (const k of Object.keys(params)) {
            const v = params[k];
            const p = encodeURIComponent(k) + '='
            if (v !== null && v !== '' && typeof (v) !== 'undefined') {
                if (typeof(v) === 'object') {
                    for (const key of Object.keys(v)) {
                        if (v[key] !== null && v[key] !== '' && typeof (v[key]) !== 'undefined') {
                            const sp = k + '[' + key + ']'
                            const subPart = encodeURIComponent(sp) + '='
                            result += subPart + encodeURIComponent(v[key]) + '&'
                        }
                    }
                } else {
                    result += p + encodeURIComponent(v) + '&'
                }
            }
        }
        return url + '?' + result;
    }
    

    function callApi() {         
        const target = document.getElementById("target-amount").value;
                
		const coinData = {
            "targetAmount": Number(target),
            "coinDenominators": selectedDenominators
        };        
		

        $.ajax({
				url: localStringify("http://localhost:8080/api/findMinimumCoins", coinData),
				type: "POST",
				contentType: "application/json",
				// data: dataStr,
				success: (result, status) => {
                    setQResult((qResult) => result.coins);
                    setShowResult((showResult) => true);
                    document.getElementById("target-amount").value = null;
                    const toUnclick = [...selectedDenominators];
                    for (var v of toUnclick) { 
                        document.getElementById(v).click();
                    }
                    console.log(selectedDenominators);
				}
		});
        
    }

    return <div>
        <form className="form container col-5" method="POST" action="http://localhost:8080/api/findMinimumCoin" id="coin-form">
        <div className="form-group d-flex flex-row  mb-4">
            <label className="col-3 align-items-center d-flex">Target amount: </label>
            <input type="number" min="0.0" max="10000.0" className="form-control" step="0.01" name="targetAmount" id="target-amount"/>
        </div>
        
        <p><b>Coin Denominations:</b></p>
            
        <div className="row">
            <div className="form-group col">
                    <input type="checkbox" value="0.01" name="coinDenominators" onClick={ toggle} id="0.01" /> <label className="ms-2">0.01</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="0.05" name="coinDenominators" onClick={ toggle }  id="0.05"/> <label className="ms-2">0.05</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="0.1" name="coinDenominators" onClick={ toggle }  id="0.1" /> <label className="ms-2">0.1</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="0.2" name="coinDenominators" onClick={ toggle}  id="0.2"/> <label className="ms-2">0.2</label>
            </div>
        </div>
        
        <div className="row">
            <div className="form-group col">
                <input type="checkbox" value="0.5" name="coinDenominators" onClick={ toggle}  id="0.5"/> <label className="ms-2">0.5</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="1.0" name="coinDenominators" onClick={ toggle}  id="1.0"/> <label className="ms-2">1</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="2.0" name="coinDenominators" onClick={ toggle}  id="2.0"/> <label className="ms-2">2</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="5.0" name="coinDenominators" onClick={ toggle}  id="5.0"/> <label className="ms-2">5</label>
            </div>
        </div>

        <div className="row">
            <div className="form-group col">
                <input type="checkbox" value="10.0" name="coinDenominators" onClick={ toggle}  id="10.0"/> <label className="ms-2">10</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="50.0" name="coinDenominators" onClick={ toggle}  id="50.0"/> <label className="ms-2">50</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="100.0" name="coinDenominators" onClick={ toggle}  id="100.0"/> <label className="ms-2">100</label>
            </div>
            <div className="form-group col">
                <input type="checkbox" value="1000.0" name="coinDenominators" onClick={ toggle}  id="1000.0"/> <label className="ms-2">1000</label>
            </div>
        </div>
            <button type="button" onClick={callApi} className="btn bg-primary text-white mt-2">Submit</button>
    </form>
        <div className="container mt-3 col-5">
            <p><b>Result:</b></p>
            <ul className="list-group d-flex flex-row text-center overflow-auto">
                
                {showResult && qResult.map((coin) => <li  className="list-group-item ms-2 max" value={coin.val} key={coin.key}>{ coin.val }</li>)}
            </ul>
        </div>    
        
    </div>
}