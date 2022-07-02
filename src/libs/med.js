export const calculateIMC = (peso, estatura) => {
  if (!peso || !estatura) return "";
  return (peso / Math.pow(estatura / 100, 2)).toFixed(2);
};
