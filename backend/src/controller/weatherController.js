const {fetchWeather, fetchWeatherByCoords}  = require('../services/weatherServices');

async function getWeatherData(req,res){
    try{
        const {city, lat, lon} = req.query;

        if(!city && (lat === undefined || lon === undefined)){
            return res.status(404).json({
                success: false,
                message: "Must have city & lat & lon ",
            });
        };
      let data ;
      if(city){
        data = await fetchWeather(city)
      }else{
        const latNum = Number(lat);
        const lonNum = Number (lon);
        if(Number.isNaN(latNum) || Number.isNaN(lonNum)){
            return res.status(400).json({
                success: false ,
                message: 'Lat and lon must be Numbers'
            });
        }
        data = await fetchWeatherByCoords(latNum, lonNum);
      }
      return res.status(200).json({
        success: true,
        data
      })
    }catch(error){
       if (error.message === 'City not found') {
      return res.status(404).json({
        success: false,
        message: `City not found: ${req.query.city}`,
      });
    }
    res.status(500).json({
        error: 'Something went wrong, try again later.'
    });
}
}

module.exports = {getWeatherData}