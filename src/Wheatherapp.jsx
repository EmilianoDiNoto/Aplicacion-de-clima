import { useState } from "react"
export const Wheatherapp = () => {


    const urlBase = `https://api.openweathermap.org/data/2.5/weather`
    const API_KEY = `242af8d2fa9988eb226feb914c81856b`
    const difkelvin = 273.15;

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setdataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) fetchClima();

    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json();
            setdataClima(data);
        } catch (error) {
            console.error("Ocurrió un error")
        }


    }



    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={ciudad} onChange={handleCambioCiudad} />
                <button type="submit">Buscar Clima </button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name} </h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difkelvin)}°C</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>                    
                        </div>
                            
                )
            }
        </div>
    )
}
