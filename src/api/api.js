const baseURL = "https://api.edamam.com/search"
// provides url
const getUrl = (payload)=>{
  let url = baseURL + "?app_id="+process.env.REACT_APP_API_ID+"&app_key="+process.env.REACT_APP_API_KEY
  Object.keys(payload).forEach(f=>{
    url = `${url}&${f}=${payload[f]}`
  })
  console.log(url)
  return url
}

export const getSearchResult = async(payload)=>{
  try{
    let res =  await fetch(getUrl(payload), {
      method: 'GET',
      headers: {},
    });
    let data = await res.json()
    console.log(data,res)
    if(!res.ok){
      let message = "Error occured while fetching the results"
      throw new Error(data || message );
    }
    return data;
  }catch(err){
    console.log(err.message)
    throw err; // rethrow other unexpected errors
  }
}
