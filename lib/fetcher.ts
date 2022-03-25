import axios from "axios";

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   return res.json();
// };

const fetcher = (url: string) => axios.get(url).then((res) => res.data.payload);

export default fetcher;
