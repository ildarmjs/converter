import { useEffect, useRef, useState } from 'react'

export const useConverter = () => {
	const [fromCurrency, setFromCurrency] = useState('RUB')
	const [toCurrency, setToCurrency] = useState('USD')
	const [fromPrice, setFromPrice] = useState(0)
	const [toPrice, setToPrice] = useState(1)

	const ratesRef = useRef({})

	useEffect(() => {
		try {
			fetch('https://cdn.cur.su/api/latest.json')
				.then(res => res.json())
				.then(json => {
					ratesRef.current = json.rates
					onChangeToPrice(1)
				})
		} catch (error) {
			console.warn(error)
		}
	}, [])

	const onChangeFromPrice = value => {
		const price = value / ratesRef.current[fromCurrency]
		const result = price * ratesRef.current[toCurrency]
		setFromPrice(value)
		setToPrice(result.toFixed(2))
	}
	const onChangeToPrice = value => {
		const result =
			(ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
		setFromPrice(result.toFixed(2))
		setToPrice(value)
	}
	useEffect(() => {
		onChangeFromPrice(fromPrice)
	}, [fromCurrency])

	useEffect(() => {
		onChangeToPrice(toPrice)
	}, [toCurrency])

	return {
		fromPrice,
		fromCurrency,
		setFromCurrency,
		onChangeFromPrice,
		toPrice,
		toCurrency,
		onChangeToPrice,
		setToCurrency,
	}
}
