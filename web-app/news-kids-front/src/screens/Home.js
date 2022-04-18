import axios from "axios"
function Home() {

    const TestApiCall = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/news')
            const data = response.data;
            console.log("response >>", data);
        } catch (err) {
            console.log("Error >>", err);
        }
    }

    console.log(TestApiCall());

    return (
        <div>News-Kids HomePage
        </div>
    )
}

export default Home;