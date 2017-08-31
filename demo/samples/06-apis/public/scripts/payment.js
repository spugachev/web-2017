const lnkSubscribe = document.getElementById('lnkSubscribe');
lnkSubscribe.addEventListener('click', doPayment);

async function doPayment(){
  const creditCardPaymentMethod = {  
    supportedMethods: ['basic-card'],  
    data: {  
      supportedNetworks: ['visa', 'mastercard', 'amex'],  
      supportedTypes: ['credit', 'debit'],  
    },  
  };

  const paymentDetails = {  
    total: {  
      label: '1-year Pro Subscription',  
      amount: {  
        currency: 'RUB',  
        value: '1999',  
      },  
    }, 
    displayItems: [  
    {  
      label: 'Subtotal',  
      amount: {  
        currency: 'RUB',  
        value: '4999',  
      },  
    }, {  
      label: 'Discount',  
      amount: {  
        currency: 'RUB',  
        value: '-3000',  
      },  
    } 
    ] 
  };

  let request = new PaymentRequest([creditCardPaymentMethod], paymentDetails, { 
    requestShipping: false, 
    requestPayerEmail: true, 
    requestPayerPhone: true 
  });

  try{
    const res = await request.show();
    console.log(res);
  }catch(err){
    console.log(err);
  }
}