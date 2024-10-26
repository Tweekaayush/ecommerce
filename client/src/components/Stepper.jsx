import React from 'react'

const Stepper = ({checkoutSteps, currentStep, setCurrentStep}) => {

    const calcProgressBarWidth = () =>{
        const beg = checkoutSteps.length > currentStep - 1? currentStep-1: checkoutSteps.length-1
        return (beg / (checkoutSteps.length-1)) * 100
    }

  return (
    <div className="stepper-container">
        {
            checkoutSteps?.map((step, i)=>{
                return  <div 
                            className='step' 
                            onClick={()=>{
                                if(currentStep >= (i+1))
                                    setCurrentStep(i+1)
                                }}
                                key={i}
                        >
                            <div className={`step-number ${currentStep === i+1? 'active': currentStep > i+1?'complete': ''}`}>
                                {currentStep > i+1?<span>&#10004;</span>: <span>{step.icon}</span>}
                            </div>
                            <div>{step.name}</div>
                        </div>
            })
        }
        <div className="progress-bar">
            <div className="progress" style={{width: `${calcProgressBarWidth()}%`}}></div>
        </div>
    </div>
  )
}

export default Stepper