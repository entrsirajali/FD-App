export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  export const calculateMaturityAmount = (principal, roi, bookedDate) => {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(bookedDate));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const maturityAmount = principal * Math.pow((1 + roi / 100 / 365), diffDays);
    return maturityAmount.toFixed(2);
  };
  
  export const calculateFinalMaturityAmount = (principal, roi, duration) => {
    const maturityAmount = principal * Math.pow((1 + roi / 100 / 365), duration);
    return maturityAmount.toFixed(2);
  };