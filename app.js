const calculateBtn = document.getElementById('btn');
const container = document.querySelector('.container');

// ADD LISTENER TO BTN
calculateBtn.addEventListener('click', function(){
    const height = document.getElementById('height-number').value;
    const weight = document.getElementById('weight-number').value;

    flag = true;
    checkConditions(height,weight);

    if(flag == true){
        const BMIcount = getBMI(height,weight);

        result = interpretBMI(BMIcount);
        document.querySelector('.result').innerHTML = `Your result:
        <h2 style='color:${result[2]}'>${BMIcount}</h2>
        <img src="./image.png" alt="" />
        <h5>Your result suggests you are <span style='color:${result[2]}'>${result[0]}</span>.</h5>
        <p>${result[1]}</p>
        <a href=${result[3]} target="_blank">${result[4]}</a>
      </div>`
    
      showResultBox('show');
    }
    else{
        showResultBox('hide');
    }
})

//  CALCULATE BMI   
function getBMI(height,weight){
    return parseFloat(weight / Math.pow(height*0.01,2)).toFixed(1);
}

// INTERPRET BMI
function interpretBMI(BMI){
    if(BMI <= 18.0){
        //underweight
        result = [
            'underweight',
            'There may be an underlying medical cause for your weight, or your diet may not be providing you with enough calories. We suggest you discuss this with your doctor.',
            '#ffbf00',
            'https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/advice-for-underweight-adults/',
            'Find out more in underweight adults'
        ];
    }
    else if(BMI > 18.0 && BMI <= 24.9){
        //healthy weight
        result = [
            'a healthy weight',
            'You are in the healthy weight range, but at the higher end. Keep an eye on your weight and try to stay in the healthy range.',
            'green',
            'https://www.nhlbi.nih.gov/health/educational/lose_wt/index.htm',
            'How to maintain your healthy weight'
        ];
    }
    else if(BMI > 25.0 && BMI <= 29.9){
        //overweight
        result = [
            'overweight', 
            'Your health would really benefit from gradually losing just 5% of your current weight. The best way to lose weight is through a combination of diet and exercise.',
            'orange', 
            'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
            'Check overweight and obese resources'
        ];
    }
    else{
        //obesity
        result = [
            'obese', 
            `Excess weight can put you at increased risk of health issues such as type 2 diabetes, heart disease, stroke. Working towards a healthier weight and keeping the weight off can help reduce your risk of health problems in the longer term. Your health could benefit from losing 5% of your weight.`, 
            'red', 
            'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
            'Check overweight and obese resources'
        ];
    }
    return result;
}

// CHECK CONDITIONS
function checkConditions(height,weight){
    if(height <= 140 || height >= 210 || weight <= 40 || weight >= 130){
        Swal.fire({
            title: 'Error!',
            text: 'Please enter the right value.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        clearAndSetFlag();
    }
}

function showResultBox(display){
    if(display === 'show'){
        container.style.height = '100vw';
        document.querySelector('.result').style = 'display: block';
    }
    else if(display === 'hide'){
        container.style.height = '40vw';
        document.querySelector('.result').style = 'display: none';
    }
}

function clearAndSetFlag(){
    flag = false;
    document.getElementById('height-number').value = '';
    document.getElementById('weight-number').value = '';
}
