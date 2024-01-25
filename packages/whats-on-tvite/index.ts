import schedule from './schedule'
import * as lib from './lib.ts'

// Insert data into the schedule
insertDataIntoSchedule()

// Select element (dropdown)
const dropdown = document.getElementById('dropdown') as HTMLSelectElement

// Populate dropdown with schedule times
populateDropdown()

// Add event listener for dropdown change
dropdown.addEventListener('change', handleDropdownChange)

// Function to insert <div> elements for each show into a <div> with id "schedule"
function insertDataIntoSchedule(): void {
  const showTimes = lib.getShowTimes()
  const showNames = lib.getShowNames()

  // Get the <tr> element with id "schedule"
  const scheduleRow = document.getElementById('schedule')

  // For each show, create a <div> element and add it to the row <div>
  showNames.forEach((item, index) => {
    const column = document.createElement('div')
    column.className = 'schedule-cell'

    const tdElement = document.createElement('div')
    tdElement.textContent = item

    const tdHeaderElement = document.createElement('div')
    tdHeaderElement.textContent = showTimes[index]
    tdHeaderElement.className = 'cell-header'

    // Append the cells to the column
    column?.appendChild(tdHeaderElement)
    column?.appendChild(tdElement)

    // Append the column to the row
    scheduleRow?.appendChild(column)
  })
}

function populateDropdown(): void {
  // Create option elements for each timeslot and add them to the dropdown
  schedule.forEach((item) => {
    const option = document.createElement('option')
    option.value = item.time // Set the value of the option to the time
    option.text = `${item.time}` // Set the display text of the option
    dropdown.add(option)
  })
}

// Handle the dropdown change event here
function handleDropdownChange(event: Event): void {
  // Initialize schedule-related elements
  const selectedTime = (event.target as HTMLSelectElement).value
  const summaryCard = document.querySelector('.card') as HTMLDivElement
  const showTime = document.querySelector('.time') as HTMLParagraphElement
  const showName = document.querySelector('.show') as HTMLParagraphElement
  const upNext = document.querySelector('.followed-by') as HTMLParagraphElement
  const description = document.querySelector(
    '.description'
  ) as HTMLParagraphElement

  console.log(`Selected option: ${selectedTime}`)

  if (selectedTime) {
    const selectedShow = lib.getShowByTimeslot(selectedTime)

    summaryCard.hidden = false
    description.innerText = selectedShow?.description as string
    showName.innerText = selectedShow?.name as string
    showTime.innerText = selectedShow?.time as string
    upNext.innerText = lib.getNextShowByTimeslot(
      selectedShow?.time as string
    ) as string
  } else {
    summaryCard.hidden = true
  }
}
