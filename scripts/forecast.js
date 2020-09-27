const appKey = "3lGfnpnWC1PFrpgmaUr9u8Xf1xuAljeh"; 

const getCity = async(city) => {
  const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const queryParams = `?apikey=${appKey}&q=${city}`;

  const response = await fetch(baseUrl + queryParams);
  const data = await response.json();

  return data[0];
};


const getConditions = async(cityId) => {
  const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/`;
  const query = `${cityId}?apikey=${appKey}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();

  return data[0];
};

//getConditions("45449");


/*getCity("Rio de Janeiro")
  .then(data => {
    return getConditions(data.Key)
  }).then(data =>{
    console.log(data);
  })
  .catch(err => console.log(err));*/