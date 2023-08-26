function Ticket({ ticket }) {
  return (
    <div class="w-8/12 print:w-11/12 rounded-2xl border-4 border-neutral-600 border-dashed p-4">
      <div class="flex flex-col gap-4">
        <div
          id="header"
          class="flex justify-between items-center bg-gradient-to-r from-pink-500 to-blue-500 p-4"
        >
          <div class="flex items-end gap-4">
            <p class="text-white font-bold tracking-widest text-3xl font-mono italic underline">
              Hack the Airlines
            </p>
            <span class="text-sm text-white tracking-widest">
              above clouds, beyond servers
            </span>
          </div>
          <img src="logo.png" class="w-16 aspect-square" />
        </div>
        <div id="detail" class="grid grid-cols-4 gap-8 gap-y-5">
          <div class="grid grid-cols-2 gap-y-10">
            <div class="font-bold">Carrier</div>
            <div class="uppercase font-serif">{ticket.carrier}</div>
            <div class="font-bold">Name</div>
            <div class="uppercase font-serif">{ticket.name}</div>
            <div class="font-bold">From</div>
            <div class="uppercase font-serif">{ticket.from}</div>
            <div class="font-bold">To</div>
            <div class="uppercase font-serif">{ticket.to}</div>
          </div>
          <div class="grid grid-cols-2 gap-y-10">
            <div class="font-bold">Flight</div>
            <div class="uppercase font-serif">{ticket.flightNo}</div>
            <div class="font-bold">Date</div>
            <div class="uppercase font-serif">{ticket.date}</div>
            <div class="font-bold">Seat</div>
            <div class="uppercase font-serif">{ticket.seat}</div>
            <div class="font-bold">Class</div>
            <div class="uppercase font-serif">{ticket.class}</div>
          </div>
          <div class="grid grid-cols-2 gap-y-10">
            <div class="font-bold">Ticket No.</div>
            <div class="uppercase font-serif">{ticket.ticketNo}</div>
            <div class="font-bold">Gate</div>
            <div class="uppercase font-serif">{ticket.gate}</div>
            <div class="font-bold">Departure</div>
            <div class="uppercase font-serif">{ticket.departure}</div>
            <div class="font-bold">Est. Arrival</div>
            <div class="uppercase font-serif">{ticket.arrival}</div>
          </div>

          <div id="barcode" class="flex justify-center aspect-square">
            {/* <img src="https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=https://hacktheairlines.app/{{ticketNo}}" /> */}
          </div>
        </div>
        <div class="text-xs text-center font-mono">
          www.hacktheairlines.app 0800-hack-the-airlines
        </div>
      </div>
    </div>
  )
}

export default Ticket
