export const formatPrice = (paise:number) => {
  return (
    new Intl.NumberFormat('en-IN',{ style: "currency", currency: "INR" }).format(
    paise / 100)
  )
}
