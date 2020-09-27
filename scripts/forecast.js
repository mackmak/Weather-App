class Forecast {

  constructor() {
    this.appKey = "3lGfnpnWC1PFrpgmaUr9u8Xf1xuAljeh";
  }

  async getCity(city) {
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const queryParams = `?apikey=${this.appKey}&q=${city}`;

    const response = await fetch(baseUrl + queryParams);
    const data = await response.json();

    return data[0];
  };

  async getConditions(cityId) {
    const cityUrl = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${cityId}?apikey=${this.appKey}`;

    const response = await fetch(cityUrl + query);
    const data = await response.json();

    return data[0];
  };


  async updateCity(city){
    const cityDetails = await this.getCity(city);
    const conditions = await this.getConditions(cityDetails.Key);

    return {
      cityDetails: cityDetails,
      conditions: conditions
    };
  };
}
