function Ticket({ ticket }) {
  return (
    <div className="w-8/12 print:w-11/12 rounded-2xl border-4 border-neutral-600 border-dashed p-4">
      <div className="flex flex-col gap-4">
        <div
          id="header"
          className="flex justify-between items-center bg-gradient-to-r from-pink-500 to-blue-500 p-4"
        >
          <div className="flex items-end gap-4">
            <p className="text-white font-bold tracking-widest text-3xl font-mono italic underline">
              Hack the Airlines
            </p>
            <span className="text-sm text-white tracking-widest">
              above clouds, beyond servers
            </span>
          </div>
          <img src="logo.png" className="w-16 aspect-square" />
        </div>
        <div id="detail" className="grid grid-cols-4 gap-8 gap-y-5">
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Carrier</div>
            <div className="uppercase font-serif">{ticket.carrier}</div>
            <div className="font-bold">Name</div>
            <div className="uppercase font-serif">{ticket.name}</div>
            <div className="font-bold">From</div>
            <div className="uppercase font-serif">{ticket.from}</div>
            <div className="font-bold">To</div>
            <div className="uppercase font-serif">{ticket.to}</div>
          </div>
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Flight</div>
            <div className="uppercase font-serif">{ticket.flightNo}</div>
            <div className="font-bold">Date</div>
            <div className="uppercase font-serif">{ticket.date}</div>
            <div className="font-bold">Seat</div>
            <div className="uppercase font-serif">{ticket.seat}</div>
            <div className="font-bold">Class</div>
            <div className="uppercase font-serif">{ticket.class}</div>
          </div>
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Ticket No.</div>
            <div className="uppercase font-serif">{ticket.ticketNo}</div>
            <div className="font-bold">Gate</div>
            <div className="uppercase font-serif">{ticket.gate}</div>
            <div className="font-bold">Departure</div>
            <div className="uppercase font-serif">{ticket.departure}</div>
            <div className="font-bold">Est. Arrival</div>
            <div className="uppercase font-serif">{ticket.arrival}</div>
          </div>

          <div id="barcode" className="flex justify-center aspect-square">
            {/* <img src="https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=https://hacktheairlines.app/{{ticketNo}}" /> */}
          </div>
        </div>
        <div className="text-xs text-center font-mono">
          www.hacktheairlines.app 0800-hack-the-airlines
        </div>
      </div>
    </div>
  )
}

export default Ticket
