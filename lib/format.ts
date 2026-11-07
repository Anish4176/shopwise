const format = (paise:number) => {
  return (
    new Intl.NumberFormat('en-IN',{ style: "currency", currency: "INR" }).format(
    paise / 100)
  )
}

export default format