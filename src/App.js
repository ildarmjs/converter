import { Block } from './components/Block'
import './App.scss'
import { useConverter } from './hooks/useConverter'


//api: https://cdn.cur.su/api/latest.json

function App() {
  
	const {
		fromPrice,
		fromCurrency,
		setFromCurrency,
		onChangeFromPrice,
		toPrice,
		toCurrency,
		onChangeToPrice,
    setToCurrency
	} = useConverter()



	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	)
}

export default App
