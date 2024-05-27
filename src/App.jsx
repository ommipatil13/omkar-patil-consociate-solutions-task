import { useState } from 'react'
import './App.css'
import Load from './Load';

function App() {

  const [username, setUsername] = useState('');
  const [githubData, setGithubData] = useState(null);
  const [load, setLoad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username === '') {
        alert('Enter Github Username')
      }
      else {
        setLoad(true)

        const res = await fetch(`https://api.github.com/users/${username}`);
        const resData = await res.json();
        setGithubData(resData);

        setTimeout(() => {
          setLoad(false)
        }, 500)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-zinc-950 min-h-screen pt-1'>


      <form onSubmit={handleSubmit}  >
        <div className='bg-zinc-900 shadow-md shadow-zinc-600 mx-auto w-80 px-10 py-6 rounded-2xl mt-2 space-y-6'>

          <div className='text-white space-y-2  '>
            <label htmlFor="username">Github Username: </label>
            <input type="text" placeholder='Enter your Github Username' name='username' id='username'
              value={username} onChange={(e) => setUsername(e.target.value)}
              className='px-2 py-2 rounded-xl outline-none w-full  bg-zinc-600 ' />
          </div>

          <button type='submit' className='px-4 py-2 bg-blue-700 outline-none hover:bg-blue-600
          hover:scale-105 transition-all text-white rounded-3xl w-full'>Submit</button>

        </div>
      </form>


      {load ? <Load /> :
        githubData && (
          <div className='bg-zinc-900 w-[400px] rounded-2xl shadow-zinc-600 shadow-lg mx-auto mt-6 text-white p-4 space-y-2 '>
            <img src={githubData.avatar_url} alt="githubuserprofileimage" className='rounded-full h-60 mx-auto' />
            <div className=' w-fit mx-auto grid grid-cols-[auto_1fr] gap-x-4'>
              <p >Username:  </p>
              <p>{githubData.login}</p>
              <p>Name:</p>
              <p>{githubData.name}</p>
              <p>No. of public repos:</p>
              <p>{githubData.public_repos}</p>
              <p>No. of public gists:</p>
              <p>{githubData.public_gists}</p>
              <p>Profile Created:</p>
              <p>{new Date(githubData.created_at).toISOString().slice(0, 10)}</p>
            </div>
          </div>
        )
      }

    </div>

  )
}

export default App
