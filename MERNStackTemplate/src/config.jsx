const CURRENT = (new Date())

const CURRENT_YEAR = (CURRENT).getFullYear()
const CURRENT_MONTH = (CURRENT).getMonth()
const CURRENT_DATE = (CURRENT).getDate()

const EighteenLim = (`${CURRENT_YEAR - 18}-${CURRENT_MONTH+1}-${CURRENT_DATE}`).toString()

export {CURRENT_YEAR, CURRENT_MONTH, CURRENT_DATE, EighteenLim}
// console.log(EighteenLim)