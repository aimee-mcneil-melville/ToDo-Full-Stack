import Change from './Change'
import Products from './Products'
import DepositSlot from './DepositSlot'
import Door from './Door'
import Screen from './Screen'

const App = () => {
  return (
    <main className="w-full bg-slate-50 h-screen">
      <section className="flex flex-col justify-center pt-20">
        <DepositSlot />
        <Screen />
        <Products />
        <Change />
        <Door />
      </section>
    </main>
  )
}

export default App
