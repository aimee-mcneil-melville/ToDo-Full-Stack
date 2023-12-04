import logoSrc from '../images/logo.png'

interface Props {
  carrier: string
  name: string
  from: string
  to: string
  flightNo: string
  date: string
  seat: string
  class: string
  ticketNo: string
  gate: string
  departure: string
  arrival: string
}

export default function TicketView(props: Props) {
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
          <img src={logoSrc} className="w-16 aspect-square" />
        </div>
        <div id="detail" className="grid grid-cols-4 gap-8 gap-y-5">
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Carrier</div>
            <div className="uppercase font-serif">{props.carrier}</div>
            <div className="font-bold">Name</div>
            <div className="uppercase font-serif">{props.name}</div>
            <div className="font-bold">From</div>
            <div className="uppercase font-serif">{props.from}</div>
            <div className="font-bold">To</div>
            <div className="uppercase font-serif">{props.to}</div>
          </div>
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Flight</div>
            <div className="uppercase font-serif">{props.flightNo}</div>
            <div className="font-bold">Date</div>
            <div className="uppercase font-serif">{props.date}</div>
            <div className="font-bold">Seat</div>
            <div className="uppercase font-serif">{props.seat}</div>
            <div className="font-bold">Class</div>
            <div className="uppercase font-serif">{props.class}</div>
          </div>
          <div className="grid grid-cols-2 gap-y-10">
            <div className="font-bold">Ticket No.</div>
            <div className="uppercase font-serif">{props.ticketNo}</div>
            <div className="font-bold">Gate</div>
            <div className="uppercase font-serif">{props.gate}</div>
            <div className="font-bold">Departure</div>
            <div className="uppercase font-serif">{props.departure}</div>
            <div className="font-bold">Est. Arrival</div>
            <div className="uppercase font-serif">{props.arrival}</div>
          </div>

          <div id="barcode" className="flex justify-center aspect-square">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=https://hacktheairlines.app/${props.ticketNo}`}
            />
          </div>
        </div>
        <div className="text-xs text-center font-mono">
          www.hacktheairlines.app 0800-hack-the-airlines
        </div>
      </div>
    </div>
  )
}
