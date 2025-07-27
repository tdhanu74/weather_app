type Content = {
    unit: string,
    weather: {
        sunrise: number,
        sunset: number,
        pressure: number,
        humidity: number
        wind: {
            speed: number,
            deg: number,
            gust: number
        }
    }
    weekdays: {
        day: string,
        icon: string,
        temp_min: number,
        temp_max: number
    }[]
}

export default Content;