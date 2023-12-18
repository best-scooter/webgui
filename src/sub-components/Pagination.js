import React from 'react'

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  maxButtonsToShow,
}) => {
  //console.log('info')
  //console.log(currentPage)
  //console.log(totalPages)
  //console.log(handlePageChange)
  //console.log(maxButtonsToShow)
  const buttons = []
  const totalButtonGroups = Math.ceil(totalPages / maxButtonsToShow)
  let currentButtonGroup = Math.ceil(currentPage / maxButtonsToShow)
  //console.log(currentPage)3
  //console.log(currentButtonGroup)
  //console.log((currentButtonGroup - 1) * maxButtonsToShow + 1)

  if (totalButtonGroups > 1) {
    for (
      //anal pain
      let i = (currentButtonGroup - 1) * maxButtonsToShow + 1;
      i <= currentButtonGroup * maxButtonsToShow;
      i++
    ) {
      if (i > totalPages) break //break if im going outofbounds
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>,
      )
    }

    if (currentButtonGroup < totalButtonGroups) {
      buttons.push(
        <button
          key="next"
          onClick={() =>
            handlePageChange(currentButtonGroup * maxButtonsToShow + 1)
          }
        >
          Next
        </button>,
      )
    }

    if (currentButtonGroup > 1) {
      buttons.unshift(
        <button
          key="prev"
          onClick={() =>
            handlePageChange((currentButtonGroup - 1) * maxButtonsToShow)
          }
        >
          Prev
        </button>,
      )
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>,
      )
    }
  }
  return <div className="margin-center">{buttons}</div>
}

export default Pagination
